import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
    constructor (@InjectRepository(User) private UsersRepository: Repository<User>) {

    }

    sayHello(name: string): string {
        return "hello " + name
    }
}