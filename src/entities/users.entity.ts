import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
export class User {

    @PrimaryColumn()
    user_id: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        default: Date.now()
    })
    lastLogin: number;

    @CreateDateColumn({
        default: Date.now()
    })
    createdAt: number;

    @UpdateDateColumn({
        default: Date.now()
    })
    updatedAt: number;

    constructor() {
        if (!this.user_id) {
            this.user_id = uuid()
        }
    }

}