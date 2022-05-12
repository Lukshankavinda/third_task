import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";


@Entity()
export class normal_users extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true})
    email!: string;

    @Column()
    password!: string;

    @Column()
    tpno!: string;
}
