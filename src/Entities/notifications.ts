import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from 'typeorm';
import {issues} from "./issues";


@Entity()
export class notifications extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    message!: string;

    @OneToOne(() => issues)
    @JoinColumn()
    issues_!: issues;

    
}
