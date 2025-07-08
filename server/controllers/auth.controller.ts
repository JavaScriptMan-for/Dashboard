import { Request, Response } from "express";
import { LoginData, RegisterData, VerifyCodeType } from "@types-my/auth.types";

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { HydratedDocument } from "mongoose";

import UserModel, { UserType } from "@models/User.model";
import MailOptions from "@services/mailOptions.service";
import transporter from "@services/transporter.service";

class AuthController {
    private readonly MY_EMAIL: string = process.env.MY_EMAIL || '';
    private readonly JWT_KEY: string = process.env.JWT_KEY || '';

    private newUser: HydratedDocument<UserType> | null = null;
    private token: string | null = null;

    private createVerifyCode(): number {
        const code = Math.floor(Math.random() * 999999 + 111111)
        return code;
    }

    private saveVerifyCode: number | null = null;

    public async register(req: Request<{}, {}, RegisterData>, res: Response): Promise<any> {
        try {
            const { first_name, last_name, username, email, password, confirm_password } = req.body;

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
        } catch(error) {
            console.error("Ошибка сервера при подтверждении аккаунта")
            res.status(500).json({message: "Ошибка сервера при подтверждении аккаунта"})
        }
    }
    public async login (req: Request<{}, {}, LoginData>, res: Response): Promise<any> {
        try {
        const { username, password, isRemember } = req.body;

        const candidate = await UserModel.findOne({ username });
        if(!candidate) return res.status(409).json({message: "Неверный логин или пароль"})

        const isMatch = await bcrypt.compare(password, candidate.password);
        if(!isMatch) return res.status(400).json({message: "Неверный логин или пароль"});

        this.token = jwt.sign(
            {
                userId: candidate._id,
                first_name: candidate.first_name,
                last_name: candidate.last_name,
                username: candidate.username,
                email: candidate.email
            },
            this.JWT_KEY,
            {expiresIn: '12h'}
        );

        res.status(200).json({message: "Вы успешно авторизованы", data: { jwt: this.token }})

        } catch(error) {
            console.error("Ошибка при авторизации", error);
            res.status(500).json({message: "Ошибка сервера при авторизации"})
        }
    }
}

const authContr = new AuthController();
export const register = authContr.register.bind(authContr)
export const verify = authContr.verify.bind(authContr)
export const login = authContr.login.bind(authContr)