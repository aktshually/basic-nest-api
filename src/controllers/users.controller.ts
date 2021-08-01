import { Body, Get } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { UsersService } from "src/providers/users.service";

@Controller("users")
export default class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    sayHello(@Body("name") name: string) {
        return this.usersService.sayHello(name)   
    }

}