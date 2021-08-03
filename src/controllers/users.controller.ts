import { Body, Delete, Get, Post, Patch, Put } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { UsersService } from "src/providers/users.service";

@Controller("users")
export default class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async createUser(
        @Body("name") name: string,
        @Body("email") email: string,
        @Body("password") password: string
    ) {
        return await this.usersService.createUser(name, email, password)
    }

    @Get("/all")
    async getAll() {
        return await this.usersService.getAll()
    }

    @Delete()
    async deleteUser(
        @Body("email") email: string,
        @Body("password") password: string
    ) {
        return await this.usersService.removeUser(email, password)
    }

    @Get()
    async getSpecificUser(
        @Body("username") username: string
    ) {
        return await this.usersService.getSpecificUser(username)
    }

    @Put()
    async updateUser(
        @Body("email") email: string,
        @Body("password") password: string,
        @Body("infoToUpdate") infoToUpdate: string,
        @Body("newInfo") newInfo: string
    ) {
        return await this.usersService.updateUser(email, password, infoToUpdate, newInfo)
    }

    @Patch()
    async makeLogin(
        @Body("email") email: string,
        @Body("password") password: string
    ) {
        return await this.usersService.makeLogin(email, password)
    }

}