import { Request, Response } from 'express';
import { getRepository} from 'typeorm';
import { counters } from '../Entities/counters';
import { issues } from '../Entities/issues';

class counterController {

    static getCounter = async (req:Request, res:Response) => {

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

        console.log(issue)
        console.log(count)

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

            return res.send(minCount +','+ minValue );

        }
    }
}

export default counterController;

/* issues table ekata query ekak gahanna counter id eken group karala max isse_no eka pick karanna.
    
     ex : counter_id 1 | 10
          counter_id 2 | 12
          counter_id 3 | 20


    aduma max number eka thyena counter _id eka pick kara

    return karanna counter_id eka

*/