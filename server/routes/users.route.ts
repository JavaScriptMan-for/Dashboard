import { Router } from "express";
import { register, verify, login, changeUserData, changeEmail, verifyEmail } from "@controllers/auth.controller";
import { auth_token } from "@middlewares/auth_token.mid";

const router: Router = Router();

router.post('/register', register);
router.post('/verify', verify);
router.post('/login', login);

router.put('/change-user-data', auth_token, changeUserData);
router.put('/change-email', auth_token, changeEmail);
router.post('/verify-email', auth_token, verifyEmail)


export default router;