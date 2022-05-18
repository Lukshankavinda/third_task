import {Request, Response} from 'express';
import { getRepository,getConnection } from 'typeorm';
import { issues } from '../Entities/issues';
import { counters } from '../Entities/counters';


class issuesController{

    static addIssue = async (req:Request, res:Response) => {

        const issue = await getRepository( issues)
        .createQueryBuilder('issue')
        .select('issue.counters_')
        .addSelect('COUNT(issue.issue_no)', 'issues')
        .groupBy('issue.counters_')
        .execute();

        const count = await getRepository( counters)
        .createQueryBuilder('count')
        .select('id')
        .where({ status: ['active']})
        .execute();

        var lenCount = Object.keys(count).length;
        var lenIssue = Object.keys(issue).length;


        if (lenCount == 0 ) {
            res.status(401).send('all counters are close');
        } 
        else {

            let array:number[] = [];

            for (let index = 0; index < lenCount; index++) {
                array.push(Number(Object.values(count[index])))
            }
            
            let minValue: Number = 999999;
            let minCount: Number = 999999;
        
            for (let index = 0; index< lenIssue; index++) {
                if (array.includes(issue[index].counters_id)) {
                    if (minValue > issue[index].issues ) {
                        minValue = issue[index].issues ;
                        minCount = issue[index].counters_id ;
                    }
                }
            }
            res.locals.minValue = minValue;
            res.locals.minCount = minCount;

        }

        await getConnection()
        .createQueryBuilder()
        .insert()
        .into(issues)
        .values([
            {
                name: res.locals.jwt.name, 
                tpno: res.locals.jwt.tpno, 
                email: res.locals.jwt.email, 
                issue: req.body.issue,
                issue_no: Number(res.locals.minValue) + 1,
                normal_users_: req.body.normalUsers_id,
                counters_: res.locals.minCount,

            }, 
        ])
        .execute();
        return res.json(
            'new issue added successfully  Issue No :- '
            +(Number(res.locals.minValue) + 1)+
            ' and Counter Id :- '+res.locals.minCount
            );

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