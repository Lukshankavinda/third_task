import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import {counter_users} from "./counter_users";



export type UserRoleType = "active" | "close" 

@Entity()
export class counters extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => counter_users)
    @JoinColumn()
    counter_users_!: counter_users;

    @Column({
        type: "enum",
        enum: ["active", "close" ],
    })
    status!: UserRoleType[]

    @Column()
    counter_number!: number;

    @Column({nullable: true})
    ongoin!: number;
}
