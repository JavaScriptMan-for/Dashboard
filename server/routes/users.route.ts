import { Router } from "express";
import { register, verify, login, changeUserData, changeEmail, verifyEmail, changePassword, verifyChangePassword } from "@controllers/auth.controller";
import { auth_token } from "@middlewares/auth_token.mid";

const router: Router = Router();

router.post('/register', register);
router.post('/verify', verify);
router.post('/login', login);


router.put('/change-user-data', auth_token, changeUserData);

router.put('/change-email', auth_token, changeEmail);
router.put('/verify-email', auth_token, verifyEmail);

router.put('/change-password', auth_token, changePassword)
router.put('/verify-change-password', auth_token, verifyChangePassword)

export default router;