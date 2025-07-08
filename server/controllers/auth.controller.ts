import { Request, Response } from "express";
import { RegisterData } from "@types-my/auth.types";

import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { HydratedDocument } from "mongoose";

import UserModel, { UserType } from "@models/User.model";
import MailOptions from "@services/mailOptions.service";
import transporter from "@services/transporter.service";

class AuthController {
    private readonly MY_EMAIL: string = process.env.MY_EMAIL || '';
    private newUser?: HydratedDocument<UserType>;

    private createVerifyCode(): string {
        const length = 6;
        const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
        const code = parseInt(randomBytes.toString('hex'), 16).toString().slice(0, length);
        return code;
    }

    private readonly saveVerifyCode: string = this.createVerifyCode();

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
            return res.status(500).json({ message: "Ошибка сервера" })
        }
    }
    public async verify () {
        
    }
}

const authContr = new AuthController();
export const register = authContr.register.bind(authContr)