import { Router } from "express";
import { register, verify, login, resetCode, changeUserData, changeEmail, verifyEmail, changePassword, verifyChangePassword } from "@controllers/auth.controller";
import { auth_token } from "@middlewares/auth_token.mid";
import { check } from "express-validator";


const router: Router = Router();



router.post('/register', [
    check('first_name', "Некорректное имя").isLength({max: 35, min: 1}),
    check('last_name', "Некорректная фамилия").isLength({max: 35, min: 1}),
    check('username', "Некорректный username").isLength({min: 3, max: 30}),
    check('email', "Некорректный email").isEmail().isLength({max: 254, min: 3}),
    check('password', "Не надёжный пароль").isStrongPassword().isLength({min: 6}),
    check('password', 'Слишком длинный пароль').isLength({max: 15}),
], register);
router.post('/verify', [
    check('code', 'Некорректный код').isLength({max: 6, min: 6}).isNumeric()
], verify);
router.post('/login', [
    check('username', "Некорректный username").isLength({min: 3, max: 30}),
], login);
router.post('/reset-code', [
    check('title').isString(),
    check('email').isEmail(),
    check('header').isString()
], resetCode)

router.put('/change-user-data', auth_token, [
    check('first_name', "Некорректное имя").isLength({max: 35, min: 1}),
    check('last_name', "Некорректная фамилия").isLength({max: 35, min: 1}),
    check('username', "Некорректный username").isLength({min: 3, max: 30}),
], changeUserData);

router.put('/change-email', auth_token, [
    check('email', "Некорректный email").isEmail().isLength({max: 254, min: 3}),    
], changeEmail);
router.put('/verify-email', auth_token, [
    check('code', 'Некорректный код').isLength({max: 6, min: 6}).isNumeric()
], verifyEmail);

router.put('/change-password', auth_token, [
    check('password', "Не надёжный пароль").isStrongPassword().isLength({min: 6}),
    check('new_password', 'Слишком длинный пароль').isLength({max: 15}),   
], changePassword)
router.put('/verify-change-password', auth_token, [
    check('code', 'Некорректный код').isLength({max: 6, min: 6}).isNumeric()
], verifyChangePassword)

export default router;