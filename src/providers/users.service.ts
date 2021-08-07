import { HttpStatus } from "@nestjs/common";
import { HttpException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import UserModel from "src/database/models/UserModel";
import { v4 as uuid } from "uuid";

@Injectable()
export class UsersService {

    private async checkIfUserDoesExist(
        email: string,
        password: string
    ) {
        const user = await UserModel.findOne({ email, password });
        if (user === null) return true;
        return false;
    }

    private throwInvalidEmailOrPasswordError() {
        throw new HttpException({
            status: HttpStatus.UNAUTHORIZED,
            error: "Invalid email/password"
        }, HttpStatus.UNAUTHORIZED);
    }

    private throwUserNotFoundError() {
        throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: "User not found"
        }, HttpStatus.FORBIDDEN);
    }

    async getAll(
        email: string,
        password: string
    ) {
        if (!this.checkIfUserDoesExist(email, password)) return this.throwInvalidEmailOrPasswordError()
        const users = await UserModel.find();
        return users.map((user) => {
            const {
                username,
                email,
                todo,
                lastUpdated,
                lastLogin,
                createdAt
            } = user;
            return {
                username,
                email,
                todo,
                lastLogin,
                lastUpdated,
                createdAt,
            };
        });
    }

    async createUser(
        username: string,
        email: string,
        password: string
    ) {
        if (!this.checkIfUserDoesExist(email, password)) {
            const user = await UserModel.create({
                username,
                email,
                password
            });
            const {
                username: name,
                email: mail,
                todo: todo,
                lastLogin: lastLogin,
                lastUpdated: lastUpdate,
                createdAt: createdAt,
            } = await user.save();
            return {
                username: name,
                email: mail,
                todo: todo,
                lastLogin: lastLogin,
                lastUpdate: lastUpdate,
                createdAt: createdAt
            };
        }
        throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: "An user with this email address already exists"
        }, HttpStatus.FORBIDDEN);

    }

    async removeUser(
        email: string,
        password: string
    ) {
        if (!this.checkIfUserDoesExist(email, password)) return this.throwInvalidEmailOrPasswordError();
        const {
            username,
            email: mail,
            lastLogin,
            lastUpdated,
            createdAt
        } = await UserModel.findOneAndRemove({ email, password });
        return {
            username,
            email: mail,
            lastLogin,
            lastUpdated,
            createdAt
        };
    }

    async getSpecificUser(
        username: string,
        email: string,
        password: string
    ) {
        if (await UserModel.findOne({email, password}) === null) return this.throwInvalidEmailOrPasswordError();
        const user = await UserModel.findOne({ username });
        if (user === null) return this.throwUserNotFoundError();
        const {
            todo,
            lastLogin,
            lastUpdated,
            createdAt
        } = user;
        return {
            username,
            email,
            todo,
            lastLogin,
            lastUpdated,
            createdAt
        };
    }

    async updateUser(
        email: string,
        password: string,
        infoToUpdate: string,
        newInfo: string
    ) {
        const possibilities = ["password", "username", "email"];
        if (!possibilities.includes(infoToUpdate)) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: "You can not change this information or it's invalid"
            }, HttpStatus.UNAUTHORIZED);
        }
        const user = await UserModel.findOne({ email });
        if (user === null) return this.throwInvalidEmailOrPasswordError();
        if (user.password !== password) return this.throwInvalidEmailOrPasswordError();
        await UserModel.findOneAndUpdate({
            email,
            password
        }, { [infoToUpdate]: newInfo });
        const {
            username,
            email: mail,
            todo,
            lastLogin,
            lastUpdated,
            createdAt
        } = await UserModel.findOne({ email: infoToUpdate === "email" ? newInfo : email });
        return {
            username,
            mail,
            todo,
            lastLogin,
            lastUpdated,
            createdAt
        };
    }

    async makeLogin(
        email: string,
        password: string
    ) {
        if (!this.checkIfUserDoesExist(email, password)) return this.throwUserNotFoundError();
        return {
            "status": "loggin made successfully!"
        };
    }

    async createTodoListItem(
        itemName: string,
        itemDescription: string,
        email: string,
        password: string
    ) {
        const user = await UserModel.findOne({ email, password });
        if (user === null) return this.throwInvalidEmailOrPasswordError();
        user.todo.push({
            itemName,
            itemDescription,
            itemId: uuid()
        });
        await UserModel.findOneAndUpdate({ email, password }, { todo: user.todo });
        return user.todo;
    }


    async deleteTodoListItem(
        itemName: string,
        email: string,
        password: string
    ) {
        const user = await UserModel.findOne({ email, password });
        if (user === null) return this.throwInvalidEmailOrPasswordError();
        const index = user.todo.findIndex(item => item.itemName === itemName);
        user.todo.splice(index, 1);
        await UserModel.findOneAndUpdate({ email, password }, { todo: user.todo });
        return user.todo;
    }
}