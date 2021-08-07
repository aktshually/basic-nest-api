import { Schema } from "mongoose";
import UserType from "src/types/UserType";
import { v4 as uuid } from "uuid";

const UserSchema = new Schema<UserType>({
    userId: {
        unique: true,
        required: true,
        default: uuid(),
        type: String
    },
    todo: {
        required: true,
        default: [],
        type: Array
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    lastLogin: {
        required: true,
        default: Date.now(),
        type: Number
    },
    lastUpdated: {
        required: true,
        default: Date.now(),
        type: Number
    },
    createdAt: {
        required: true,
        default: Date.now(),
        type: Number
    }
});

export default UserSchema;