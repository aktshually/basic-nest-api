import { TodoListType } from "./TodoListType";

type UserType = {
    user_id: string,
    todo: Array<TodoListType>,
    username: string,
    password: string,
    email: string,
    lastLogin: number,
    lastUpdated: number,
    createdAt: number,
};

export default UserType;