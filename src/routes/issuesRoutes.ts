import { Router } from "express";
import issuesController from '../controllers/issuesController';

const router = Router();

router.post('/user/addi', issuesController.addIssue); // http://localhost:5000/user/addi
router.get('/counter/getAll', issuesController.getAllIssues);
router.delete('/user/deleteIssue/:id', issuesController.deleteIssues);

export default router;