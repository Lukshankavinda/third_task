import {Request, Response} from 'express';
import {getRepository } from 'typeorm';
import {validate} from "class-validator";
import { normal_users } from '../Entities/normal_users';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class normalUserController {

    static addNormalUser = async (req:Request, res:Response) => {
        const {name, email, password, tpno} = req.body;
        let n_user = new normal_users();
       
        n_user.name = name;
        n_user.email = email;
        n_user.tpno = tpno;

        n_user.password = bcrypt.hashSync(password, 10);

        const errors = await validate(normal_users);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        const userRepository = getRepository( normal_users);
        try {
            await userRepository.save(n_user);
        } catch (e) {
            res.status(409).send('user Already existed');
            return ;
        }
        res.status(201).send('New User is Registered ')
    };


    static login = async (req:Request, res:Response) => {
        const {email, password} = req.body;

        if (!(email && password)) {
            res.status(400).send();
        }

        const userRepository = getRepository( normal_users);
        let user: normal_users|any;
        try {
            user = await userRepository.findOne({ where: {
                email: email
            } });
            if (user && ! bcrypt.compareSync(password,user.password)) {
                res.status(401).send('Incorrect Password');
                return ;
            }
            const generateJWT = () => {
                return jwt.sign(
                    {
                        email: user.email,
                        name: user.name,
                        tpno: user.tpno,
                    },
                    "SECRET",
                    {expiresIn: "1h"}
                );
            };
           
            res.status(200).json({ access_token: generateJWT()});
        } catch (error) {
            res.status(401).send(error);
        }
    };
    
}
export default normalUserController;
