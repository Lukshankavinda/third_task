import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { issues } from '../Entities/issues';

class issuesController{

    static addIssue = async (req:Request, res:Response) => {
        const newPost ={
        
            name: res.locals.jwt.name,
            tpno: res.locals.jwt.tpno,
            email: res.locals.jwt.email,
            issue: req.body.issue,
            issue_no: req.body.issue_no,
            normal_users_: req.body.normalUsers_id,
            counters_: req.body.counters_id,

        };
        const post = getRepository(issues).create(newPost);
        const result = await getRepository(issues).save(post);
        return res.json(result);
    };

    static getAllIssues = async (req:Request,res:Response) => {

        const result = await getRepository(issues).find();
        return res.json(result);
    
    }

    static deleteIssues = async (req:Request,res:Response) => {

        const {id} = req.params;
        await issues.delete(id);

        console.log(req.params)
        res.send('del')
    
    }

}
export default issuesController;