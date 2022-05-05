import {Request, Response} from 'express';
import {BaseEntity, getRepository } from 'typeorm';
import {validate} from "class-validator";
import { counter_users } from '../Entities/counter_users';

class counterUserController extends BaseEntity{

    static addCounterUser = async (req:Request, res:Response) => {
        const {name, user_name, password} = req.body;
        let c_user = new counter_users();
       
        c_user.name = name;
        c_user.user_name = user_name;

        c_user.password = c_user.setPassword(password);

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
        try {
            user = await userRepository.findOne({ where: {
                user_name:user_name
            } });
            if (user && !user.isValidPassword(password)) {
                res.status(401).send('Incorrect Password');
                return ;
            }
            res.status(200).json({ access_token: user.generateJWT()});
        } catch (error) {
            res.status(401).send(error);
        }

    };

}
export default counterUserController;
