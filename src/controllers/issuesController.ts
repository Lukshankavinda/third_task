import {Request, Response} from 'express';
import {BaseEntity, getRepository } from 'typeorm';
import {validate} from "class-validator";
import { issues } from '../Entities/issues';

class issuesController extends BaseEntity{

    static addIssue = async (req:Request, res:Response) => {
        const newPost ={
            name: req.body.name,
            tpno: req.body.tpno,
            email: req.body.email,
            issue: req.body.issue,
            status: req.body.status,
            issue_no: req.body.issue_no,
            normalUsers_id: req.body.normalUsers_id,
            counters_id: req.body.counters_id,

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