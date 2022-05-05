import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

@Entity()
export class counter_users extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true})
    user_name!: string;

    @Column()
    password!: string;

    setPassword = (password: string) => {
        return (this.password = bcrypt.hashSync(password, 10));
    };

    isValidPassword = (password: string) => { 
      return bcrypt.compareSync(password, this.password)
    };

    generateJWT = () => {
      return jwt.sign(
          {
              user_name: this.user_name,
              name: this.name,

          },
          "SECRET",
          {expiresIn: "24h"}
      );
  };

}
