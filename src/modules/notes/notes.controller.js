import { Router } from "express";
import * as noteservices from "./services/notes.services.js";
import { authentication } from "../../middleware/auth.middleware.js";
const router = Router()





router.post("",authentication,noteservices.createnote)
router.patch("/:noteId",authentication,noteservices.updateNotes)
router.put("/replace/:noteId",authentication,noteservices.replaceNote)
router.patch("/all",authentication,noteservices.updateTitle)
router.delete("/:noteId", authentication , noteservices.deleteNote)
router.get("/paginate-sort",authentication,noteservices.paginateNote)
router.get("/:noteId",authentication,noteservices.getNoteById)
router.get("/note-by-content",authentication,noteservices.getNoteByContent)
router.get("/note-by-user", authentication, noteservices.getNoteWithUser)
router.get("/aggregate",authentication,noteservices.aggregateNote)
router.delete("/replace/:noteId", authentication, noteservices.deleteAllNotes);









export default router