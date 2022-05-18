import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import {validate} from "class-validator";
import { counter_users } from '../Entities/counter_users';
import { counters } from '../Entities/counters'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


class counterUserController{

    static addCounterUser = async (req:Request, res:Response) => {
        const {name, user_name, password} = req.body;
        let c_user = new counter_users();
       
        c_user.name = name;
        c_user.user_name = user_name;

        c_user.password = bcrypt.hashSync(password, 10);

        const errors = await validate(counter_users);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        const userRepository = getRepository( counter_users);
        try {
            await userRepository.save(c_user);
        } catch (e) {
            res.status(409).send('This Counter person Already existed');
            return ;
        }
        res.status(201).send('New Counter person is Registered ')
    };


    static login = async (req:Request, res:Response) => {
        const {user_name, password} = req.body;

        if (!(user_name && password)) {
            res.status(400).send();
        }

        const userRepository = getRepository( counter_users);
        let user: counter_users|any;

        const countRepository = getRepository(counters);
        let count: counters|any;
        
        //let countup: counters|any;
        try {

            user = await userRepository.findOne({ where: {
                user_name:user_name
            } });

            count = await countRepository.findOne({ where:{counter_users_:user.id}
             });

            await countRepository.update({id:count.id},{ status: ['active']}); // change status of counters to active

            if (user && !bcrypt.compareSync(password, user.password)) {
                res.status(401).send('Incorrect Password');
                return ;
            }

            const generateJWT = () => {
                return jwt.sign(
                    {
                        user_name: user.user_name,
                        name: user.name,
                        counter_number: count.counter_number,
                        counter_id: count.id
                    },
                    "SECRET",
                    {expiresIn: "24h"}
                );
            };

            res.status(200).json({ access_token: generateJWT()});
        } catch (error) {
            res.status(401).send(error);
        }

    };

}
export default counterUserController;
