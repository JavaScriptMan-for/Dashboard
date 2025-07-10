import { Request, Response } from "express";
import { LoginData, RegisterData, VerifyCodeType, UserType, NewUserData, NewEmail, NewPassword } from "@types-my/auth.types";

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { HydratedDocument } from "mongoose";
import { JwtUserType } from "@middlewares/auth_token.mid";
import { validationResult } from "express-validator"

import UserModel from "@models/User.model";
import MailOptions from "@services/mailOptions.service";
import transporter from "@services/transporter.service";

class AuthController {
    private readonly MY_EMAIL: string = process.env.MY_EMAIL || '';
    private readonly JWT_KEY: string = process.env.JWT_KEY || '';

    private newUser: HydratedDocument<UserType> | null = null;
    private token: string | null = null;

    private count: number = 0;

    private createVerifyCode(): number {
        const code = Math.floor(Math.random() * 999999 + 111111)
        return code;
    }

    private saveVerifyCode: number | null = null;

    public async register(req: Request<{}, {}, RegisterData>, res: Response): Promise<any> {
        try {
            const { first_name, last_name, username, email, password, confirm_password } = req.body;

            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                const errorMessages = errors.array().map(error => error.msg); 
                return res.status(400).json({ message: "Некорректные данные", errors: errorMessages }); 
            }

            const isHasUsername = await UserModel.findOne({ username });
            if (isHasUsername) return res.status(409).json({ message: "Пользователь с таким username уже существует" });

            const isHasEmail = await UserModel.findOne({ email });
            if (isHasEmail) return res.status(409).json({ message: "Пользователь с таким email уже существует" });

            const isConfirmPassword = password === confirm_password;
            if (!isConfirmPassword) return res.status(400).json({ message: "Пароль не подтверждён" })

            const hashed_password = await bcrypt.hash(password, 8);
            this.newUser = new UserModel({ first_name, last_name, username, email, password: hashed_password });

            this.saveVerifyCode = this.createVerifyCode()

            const main_options = new MailOptions(
                `${this.MY_EMAIL} Dashboard`,
                email,
                "Подтверждение аккаунта",
                `
                 <h1>Код для подтверждения аккаунта:</h1>
                 <code>${this.saveVerifyCode}</code>
                `
            );

            await transporter.sendMail(main_options)
                .then(() => {
                    console.log(`Код успешно отправлен на ${email}`);
                    res.status(200).json({ message: `Данные приняты. Вы получили письмо на почту ${email}` })
                })
                .catch((err: Error) => {
                    console.error(`Ошибка при отправке кода на почту ${email}`, err);
                    res.status(400).json({ message: "Ошибка при отправке письма" })
                })
        } catch (error) {
            console.error("Ошибка сервера при регистрации", error)
            res.status(500).json({ message: "Ошибка сервера при регистрации" })
        }
    }
    public async verify(req: Request<{}, {}, VerifyCodeType>, res: Response): Promise<any> {
        try {
            const { code } = req.body;

            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                const errorMessages = errors.array().map(error => error.msg); 
                return res.status(400).json({ message: "Некорректные данные", errors: errorMessages }); 
            }

            if (code.toString().length !== 6) return res.status(400).json({ message: "Некорректная длина кода" });

            const to_num_code = Number(code);
            if (isNaN(to_num_code)) return res.status(400).json({ message: "Некорректный код" })

            const isVerified = to_num_code === this.saveVerifyCode;
            if (!isVerified) return res.status(400).json({ message: "Неверный код" });

            if (!this.newUser) return res.status(400).json({ message: "Непредвиденная ошибка" })
            this.token = jwt.sign(
                {
                    userId: this.newUser._id,
                    first_name: this.newUser.first_name,
                    last_name: this.newUser.last_name,
                    username: this.newUser.username,
                    email: this.newUser.email
                },
                this.JWT_KEY,
                { expiresIn: '12h' }
            )

            await this.newUser.save();

            res.status(200).json({ message: "Код верный", data: { jwt: this.token } })
        } catch (error) {
            console.error("Ошибка сервера при подтверждении аккаунта")
            res.status(500).json({ message: "Ошибка сервера при подтверждении аккаунта" })
        }
    }
    public async login(req: Request<{}, {}, LoginData>, res: Response): Promise<any> {
        try {
            const { username, password, isRemember } = req.body;

            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                const errorMessages = errors.array().map(error => error.msg); 
                return res.status(400).json({ message: "Некорректные данные", errors: errorMessages }); 
            }

            const candidate = await UserModel.findOne({ username });
            if (!candidate) return res.status(409).json({ message: "Неверный логин или пароль" })

            const isMatch = await bcrypt.compare(password, candidate.password);
            if (!isMatch) return res.status(400).json({ message: "Неверный логин или пароль" });

            this.token = jwt.sign(
                {
                    userId: candidate._id,
                    first_name: candidate.first_name,
                    last_name: candidate.last_name,
                    username: candidate.username,
                    email: candidate.email
                },
                this.JWT_KEY,
                { expiresIn: '12h' }
            );

            res.status(200).json({ message: "Вы успешно авторизованы", data: { jwt: this.token } })

        } catch (error) {
            console.error("Ошибка при авторизации", error);
            res.status(500).json({ message: "Ошибка сервера при авторизации" })
        }
    }
    public async changeUserData(req: Request<{}, {}, NewUserData>, res: Response): Promise<any> {
        try {
            const { last_name, first_name, username } = req.body;

            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                const errorMessages = errors.array().map(error => error.msg); 
                return res.status(400).json({ message: "Некорректные данные", errors: errorMessages }); 
            }

            const user = res.locals.user as JwtUserType;

            if (first_name !== "" || first_name !== user.first_name) {
                const change_first_name = await UserModel.updateOne({ username: user.username }, { first_name })
                if (!change_first_name) { this.count += 1; return res.status(400).json({ message: "Не удалось изменить first_name" }) }
            }
            if (last_name !== "" || last_name !== user.last_name) {
                const change_first_name = await UserModel.updateOne({ username: user.username }, { last_name })
                if (!change_first_name) { this.count += 1; return res.status(400).json({ message: "Не удалось изменить last_name" }) }
            }
            if (username !== "" || username !== user.username) {
                const change_first_name = await UserModel.updateOne({ username: user.username }, { username })
                if (!change_first_name) { this.count += 1; return res.status(400).json({ message: "Не удалось изменить username" }) }
            }

            if (this.count === 0) return res.status(400).json({ message: "Вы ничего не изменили" })
            res.status(200).json({ message: "Вы успешно изменили данные" })
        } catch (error) {
            res.status(500).json({ message: "Ошибка сервера при изменении данных пользователя" });
            console.error("Ошибка сервера при изменении данных пользователя", error)
        }
    }

    private new_email: string | null = null;
    private save_confirm_email_code: number | null = null;

    public async changeEmail(req: Request<{}, {}, NewEmail>, res: Response): Promise<any> {
        try {
            const { email } = req.body;
            const user = res.locals.user as JwtUserType;

            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                const errorMessages = errors.array().map(error => error.msg); 
                return res.status(400).json({ message: "Некорректные данные", errors: errorMessages }); 
            }

            if (email === "" || email === user.email) return res.status(400).json({ message: "Вы не изменили email" });

            this.new_email = email;
            this.save_confirm_email_code = this.createVerifyCode();

            const mail_options = new MailOptions(
                `${this.MY_EMAIL} Dashboard`,
                email,
                "Изменение email",
                `
                <h1>Изменение email</h1>
                <code>${this.save_confirm_email_code}</code>
                `
            )

            await transporter.sendMail(mail_options)
                .catch((err: Error) => {
                    console.error(`Ошибка прим отправке письма на ${user.email}`, err)
                    res.status(400).json({ message: `Ошибка прим отправке письма на ${user.email}` })
                })

            res.status(200).json({ message: `Код на ваш email: ${email} отправлен` })

        } catch (error) {
            console.error("Ошибка при изменении email", error);
            res.status(500).json({ message: "Ошибка при изменении email" })
        }
    }

    public async verifyNewEmail(req: Request<{}, {}, VerifyCodeType>, res: Response): Promise<any> {
        try {
            const { code } = req.body;
            const user = res.locals.user as JwtUserType;

            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                const errorMessages = errors.array().map(error => error.msg); 
                return res.status(400).json({ message: "Некорректные данные", errors: errorMessages }); 
            }

            if (!this.new_email) return res.status(400).json({ message: "Сервер не получил новый email" })
            if (!this.save_confirm_email_code) return res.status(400).json({ message: "Сервер не получил код" })

            if (code.toString().length !== 6) return res.status(400).json({ message: "Некорректная длина кода" })

            const confirm_email = Number(code) === this.save_confirm_email_code;
            if (!confirm_email) return res.status(400).json({ message: "Неверный код" });

            const change_email = await UserModel.updateOne({ username: user.username }, { email: this.new_email })
            if (!change_email) return res.status(400).json({ message: "Ошибка при изменении email" });

            res.status(200).json({ message: "Email успешно изменен" })

        } catch (error) {
            console.error("Ошибка сервера при изменении email", error);
            res.status(500).json({ message: "Ошибка сервера при изменении email" })
        }
    }

    private changed_password: string | null = null;
    private save_verify_password_code: number | null = null;

    public async changePassword(req: Request<{}, {}, NewPassword>, res: Response): Promise<any> {
        try {
            const { new_password, new_confirm_password } = req.body;
            const auth = res.locals.user as JwtUserType;

            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                const errorMessages = errors.array().map(error => error.msg); 
                return res.status(400).json({ message: "Некорректные данные", errors: errorMessages }); 
            }

            const confirm_passwords = new_password === new_confirm_password;
            if (!confirm_passwords) return res.status(400).json({ message: "Пароли не совпадают" });

            const user = await UserModel.findOne({ username: auth.username });
            if (!user) return res.status(401).json({ message: "Вы не зарегистрированы" });

            const isMatch = await bcrypt.compare(new_password, user.password)
            if (isMatch) return res.status(400).json({ message: "Ваш старый и новый пароли совпадают" });

            this.changed_password = new_password;
            this.save_verify_password_code = this.createVerifyCode();

            const mail_options = new MailOptions(
                `${this.MY_EMAIL} Dashboard`,
                auth.email,
                "Изменение пароля",
                `
                <h1>Изменение пароля</h1>
                <code>${this.save_verify_password_code}</code>
                `
            )

            await transporter.sendMail(mail_options)
                .catch((err: Error) => {
                    console.error(`Ошибка прим отправке письма на ${user.email}`, err)
                    res.status(400).json({ message: `Ошибка прим отправке письма на ${user.email}` })
                })

            res.status(200).json({ message: `На вашу почту: ${auth.email} отправлен код` })

        } catch (error) {
            console.error("Ошибка сервера при изменении пароля", error);
            res.status(500).json({ message: "Ошибка сервера при изменении пароля" })
        }
    }
    public async verifyChangePassword(req: Request<{}, {}, VerifyCodeType>, res: Response): Promise<any> {
        try {
            const { code } = req.body;
            const user = res.locals.user as JwtUserType;

            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                const errorMessages = errors.array().map(error => error.msg); 
                return res.status(400).json({ message: "Некорректные данные", errors: errorMessages }); 
            }

            if (code.toString().length !== 6) return res.status(400).json({ message: "Неверная длина кода" })

            const confirm_code = Number(code) === this.save_verify_password_code
            if (!confirm_code) return res.status(400).json({ message: "Неверный код" })

            if (!this.changed_password) return res.status(400).json({ message: "Сервер не получил новый пароль" })
            const new_hashed_password = await bcrypt.hash(this.changed_password, 8)

            const change_password = await UserModel.updateOne({ username: user.username }, { password: new_hashed_password })
            if (!change_password) return res.status(400).json({ message: "Ошибка при изменении пароля" });

            res.status(200).json({ message: "Вы успешно изменили свой пароль" })

        } catch (error) {
            console.error("Ошибка сервера при изменении пароля", error);
            res.status(500).json({ message: "Ошибка сервера при изменении пароля" })
        }
    }
}

const authContr = new AuthController();
export const register = authContr.register.bind(authContr)
export const verify = authContr.verify.bind(authContr)
export const login = authContr.login.bind(authContr)
export const changeUserData = authContr.changeUserData.bind(authContr)
export const changeEmail = authContr.changeEmail.bind(authContr)
export const verifyEmail = authContr.verifyNewEmail.bind(authContr)
export const changePassword = authContr.changePassword.bind(authContr)
export const verifyChangePassword = authContr.verifyChangePassword.bind(authContr)