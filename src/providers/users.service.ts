import { HttpStatus } from "@nestjs/common";
import { BadRequestException } from "@nestjs/common";
import { HttpException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private UsersRepository: Repository<User>) {

    }

    private async getOneByEmailAndPassword(email: string, password: string) {
        return await this.UsersRepository.findOneOrFail({
            email: email,
            password: password
        });
    }

    async getAll() {
        const data = (await this.UsersRepository.find()).map((info) => {
            let {user_id, ...necessaryInfo} = info
            return necessaryInfo
        });
        return data
    }

    async createUser(
        username: string,
        email: string,
        password: string
    ): Promise<User> {
        const user = this.UsersRepository.create({
            username,
            email,
            password
        });
        const possibleUser = await this.UsersRepository.find({email})
        if (possibleUser.length !== 0) {
            throw new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: "An user with this email address already exists"
            }, HttpStatus.UNAUTHORIZED)
        }
        return await this.UsersRepository.save(user);
    }

    async removeUser(
        email: string,
        password: string
    ) {
        try {
            const user = await this.getOneByEmailAndPassword(email, password);
            return await this.UsersRepository.remove(user);
        }
        catch (error) {
            throw new BadRequestException("Could not remove this user");
        }
    }

    async getSpecificUser(
        username: string
    ) {
        const user = await this.UsersRepository.find({ username });
        if (user.length === 0) {
            throw new BadRequestException("Could not find this user");
        }
        const data = user[0];
        return {
            username: data.username,
            email: data.email,
            lastLogin: data.lastLogin,
            createdAt: data.createdAt,
            updatedat: data.updatedAt
        }
    }

    async updateUser(
        email: string,
        password: string,
        infoToUpdate: string,
        newInfo: string
    ) {
        const possibilities = ["email", "password", "username"];
        let user = await this.UsersRepository.find({
            email,
            password
        });
        if (user.length === 0) {
            throw new BadRequestException("Could not find this user");
        }
        if (!possibilities.includes(infoToUpdate)) {
            throw new BadRequestException("You can not update this info or its invalid");
        }
        user[0][infoToUpdate] = newInfo;
        user[0].updatedAt = Date.now()
        return this.UsersRepository.save(user);
    }

    async makeLogin(
        email: string,
        password: string
    ) {
        const user = await this.UsersRepository.find({
            email,
            password
        })
        if (user.length === 0) {
            throw new BadRequestException("Incorret credentials")
        }
        return {
            "status": "logged in successfully"
        }
    }
}