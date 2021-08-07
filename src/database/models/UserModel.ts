import { model } from "mongoose";
import UserType from "src/types/UserType";
import UserSchema from "../schemas/UserSchema";

const UserModel = model<UserType>("users", UserSchema)
export default UserModel;