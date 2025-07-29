import {Router} from 'express'
import * as registrationServices from './services/registration.services.js'
import * as loginServices from "./services/login.services.js";
const router = Router()





router.post("/signup",registrationServices.signup)
router.post("/login",loginServices.login)




export default router