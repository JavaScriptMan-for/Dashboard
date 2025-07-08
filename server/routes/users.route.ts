import { Router } from "express";
import { register, verify, login, changeUserData } from "@controllers/auth.controller";
import { auth_token } from "@middlewares/auth_token.mid";

const router: Router = Router();

router.post('/register', register);
router.post('/verify', verify);
router.post('/login', login);
router.put('/change-user-data', auth_token, changeUserData)

export default router;