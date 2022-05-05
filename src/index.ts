import "reflect-metadata"; 
import express, {Request, Response} from 'express';
import BodyParser from 'body-parser';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { normal_users } from './Entities/normal_users';
import { counter_users } from './Entities/counter_users';
import { issues } from './Entities/issues';
import { counters } from './Entities/counters';
import { notifications } from './Entities/notifications';



const app = express();
app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}))

createConnection({
    type: 'mysql',
    database: "third_task",
    username: "root",
    password: "123456",
    logging: true,
    synchronize: true,
    entities: [normal_users, counter_users, issues, counters, notifications]
})

app.listen('5000', () => {
    console.log('server running');
})