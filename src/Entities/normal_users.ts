import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class normal_users extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true})
    user_name!: string;

    @Column()
    password!: string;

    @Column()
    tpno!: string;

    @Column()
    email!: string;
}
