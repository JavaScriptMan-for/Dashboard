import { Schema, model } from "mongoose";
import { RegisterData } from "@types-my/auth.types";

export type UserType = Omit<RegisterData, 'confirm_password'>

const User: Schema<UserType> = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
})

export default model('User', User)