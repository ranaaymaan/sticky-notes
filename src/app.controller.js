import connectDB from "./DB/DBconeection.js";
import  authcontroller from "./modules/auth/auth.controller.js"
import usercontroller from "./modules/user/user.controller.js"
import notescontroller from "./modules/notes/notes.controller.js"


const bootstrap = (app,express) =>{
app.use(express.json())
app.get('/', (req, res) => { res.send('Hello world!')});

app.use("/notes", notescontroller);
app.use("/users",authcontroller,usercontroller)

app.all("*" ,(req,res,next)=>{
    return res.status(404).json("in-valid routing")
})
connectDB()
}


export default bootstrap