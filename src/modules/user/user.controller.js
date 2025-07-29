import { Router } from "express"
import * as userservices from './services/user.services.js'
import { authentication } from "../../middleware/auth.middleware.js"
const router = Router()




router.patch("",authentication(),userservices.updateduser)
router.delete("", authentication(), userservices.deleteuser);
router.get("", authentication(), userservices.getuser);



export default router
