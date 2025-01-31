import { Router } from "express";
import { UserControler } from "../controllers/user.controller";
import { isAuthenticate } from "../middlewares/auth.middleware"
import { isAdmin } from "../middlewares/isAdmin.middleware"

const router = Router()

router.get('/profile', isAuthenticate, UserControler.profile)
router.get('/', isAuthenticate, isAdmin, UserControler.getAll)

export default router