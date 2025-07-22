import express, { Express } from "express"
import cookieParser from "cookie-parser";
import mongoose from "mongoose"
import dotenv from "dotenv"; dotenv.config();
import users_route from "@routes/users.route"

const app: Express = express();

//Переменные окружения
const PORT = process.env.PORT || 80;
const BASE_URL = process.env.BASE_URL || '';

//Middlewares
app.use(express.json());
app.use(cookieParser())

//Routes
app.use('/api', users_route)

const startServer = async (): Promise<void> => {
    try {
        console.log("Подключение к базе данных...");
        await mongoose.connect(BASE_URL)
            .then(() => console.log("Успешное подключение к базе данных!"))
            .catch((err: Error) => console.error("Ошибка при подключении к базе данных", err))
        app.listen(PORT, () => {
            console.log("Сервер запущен по порту", PORT)
        })
    } catch (error) {
        console.error("Ошибка при запуске сервера", error)
    }
}

startServer();