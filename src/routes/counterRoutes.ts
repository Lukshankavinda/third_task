import { Router } from "express";
import counterController from '../controllers/counterController';

const router = Router();

router.get('/getCounter', counterController.getCounter); //http://localhost:5000/getCounter

export default router;
