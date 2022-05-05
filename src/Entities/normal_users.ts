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

    setPassword = (password: string) => {
        return (this.password = bcrypt.hashSync(password, 10));
    };

    isValidPassword = (password: string) => { 
      return bcrypt.compareSync(password, this.password)
    };

    generateJWT = () => {
        return jwt.sign(
            {
                email: this.email,
                name: this.name,
                tpno: this.tpno,

            },
            "SECRET",
            {expiresIn: "1h"}
        );
    };

}
