import "reflect-metadata"; 
import express, {Request, Response} from 'express';
import { createConnection } from 'typeorm';
import { normal_users } from './Entities/normal_users';
import { counter_users } from './Entities/counter_users';
import { issues } from './Entities/issues';
import { counters } from './Entities/counters';
import { notifications } from './Entities/notifications';

const app = express();

createConnection({
    type: 'mysql',
    database: "third_task",
    username: "root",
    password: "123456",
    logging: true,
    synchronize: true,
    entities: [normal_users, counter_users, issues, counters, notifications]
})


app.get('/', (req: Request, res: Response): void => {
    res.json({message: " running"});
})

app.listen('5000', (): void => {
    console.log('server running');
})