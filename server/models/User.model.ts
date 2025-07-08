import { Schema, model } from "mongoose";
import { UserType } from "@types-my/auth.types";


const User: Schema<UserType> = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
})

export default model('User', User)