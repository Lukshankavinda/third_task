import "reflect-metadata"; 
import express, {Request, Response} from 'express';
import * as BodyParser from 'body-parser';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { normal_users } from './Entities/normal_users';
import { counter_users } from './Entities/counter_users';
import { issues } from './Entities/issues';
import { counters } from './Entities/counters';
import { notifications } from './Entities/notifications';
import normalUserRoutes from './routes/normalUserRoutes';
import counterUserRoutes from './routes/counterUserRoutes';
import issuesRoutes from './routes/issuesRoutes';
import counterRoutes from './routes/counterRoutes';


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
    synchronize: false,
    entities: [normal_users, counter_users, issues, counters, notifications]
})

app.use('/', normalUserRoutes);
app.use('/', counterUserRoutes);
app.use('/', issuesRoutes);
app.use('/', counterRoutes);

app.listen('5000', () => {
    console.log('server running');
})