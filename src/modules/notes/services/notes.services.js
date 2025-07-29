import noteModel from "../../../DB/models/notes.model.js";

export const createnote = async (req, res, next) => {
     const { title, content } = req.body; 

  try {
    const note = new noteModel({ title, content,  userId: req.userId.userId }); 
    await note.save();
    res.status(201).json({ message: 'Note created', note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateNotes = async(req,res,next)=>{
const { noteId } = req.params;
  const { title, content } = req.body;
  try {
    const note = await noteModel.findOneAndUpdate(
      { _id: noteId, userId: req.userId },
      { title, content, updatedAt: Date.now() },
      { new: true }
    );

    if (!note) return res.status(404).json({ message: 'Note not found or you are not the owner' });
    res.status(200).json({ message: 'Note updated', note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const replaceNote = async(req,res,next)=>{
    const { noteId } = req.params;
  const { title, content } = req.body;
  try {
    const note = await noteModel.findOneAndReplace(
      { _id: noteId, userId: req.userId },
      { title, content, userId: req.userId, createdAt: Date.now(), updatedAt: Date.now() },
      { new: true }
    );

    if (!note) return res.status(404).json({ message: 'Note not found or you are not the owner' });
    res.status(200).json({ message: 'Note replaced', note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateTitle = async(req,res,next)=>{
    const { title } = req.body;
  try {
    const result = await noteModel.updateMany(
      { userId: req.userId },
      { title, updatedAt: Date.now() }
    );

    if (result.matchedCount === 0) return res.status(404).json({ message: 'No notes found' });
    res.status(200).json({ message: 'All notes updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const deleteNote = async(req,res,next)=>{
    const { title } = req.body;
  try {
    const result = await noteModel.updateMany(
      { userId: req.userId },
      { title, updatedAt: Date.now() }
    );

    if (result.matchedCount === 0) return res.status(404).json({ message: 'No notes found' });
    res.status(200).json({ message: 'All notes updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const paginateNote = async(req,res,next)=>{
    const { page = 1, limit = 10 } = req.query;
  try {
    const notes = await noteModel.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export const getNoteById= async (req, res,next) => {
  try {
    const { noteId } = req.params;
    const userId = req.user._id;

    const note = await noteModel.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (note.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'You are not the owner' });
    }

    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
export const getNoteByContent=async (req, res,next) => {
  try {
    const { content } = req.query;
    const userId = req.user._id;

    const note = await noteModel.findOne({ content, userId });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
export const getNoteWithUser =async (req, res,next) => {
  try {
    const userId = req.user._id;

    const notes = await noteModel.find({ userId })
      .select('title createdAt')
      .populate('userId', 'email'); 

    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
export const aggregateNote =  async (req, res,next) => {
  try {
    const userId = req.user._id;
    const { title } = req.query;

    const aggregationPipeline = [
      { $match: { userId } },
      { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      { $project: { title: 1, createdAt: 1, 'user.name': 1, 'user.email': 1 } },
    ];

    if (title) {
      aggregationPipeline.unshift({ $match: { title: { $regex: title, $options: 'i' } } });
    }

    const notes = await noteModel.aggregate(aggregationPipeline);

    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const deleteAllNotes = async (req, res,next) => {
  try {
    const userId = req.userId; 


    const result = await noteModel.deleteMany({ userId }); 

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No notes found for the user' });
    }

    res.json({ message: 'deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};