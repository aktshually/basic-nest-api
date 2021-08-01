import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import UsersController from "src/controllers/users.controller";
import { UsersService } from "src/providers/users.service";
import config from "ormconfig";
import { User } from "src/entities/users.entity";

@Module({
    imports: [TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}