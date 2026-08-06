import express from 'express';
import { registerUser ,loginUser} from '../controllers/userController.js';
import { postJob,getJobs, fetchJob,editJob,deleteJob } from '../controllers/jobsController.js';
import { postCandidate,getCandidates,updateStatus } from '../controllers/candidatesController.js';
import {postEmployee,getEmployees,getEmployeeById, deleteEmployee} from '../controllers/employeeController.js';

const router = express();

router.post('/register',registerUser);
router.post('/login', loginUser);
router.post('/new-job',postJob);
router.get('/get-jobs',getJobs);
router.get('/jobs/:jobId',fetchJob);
router.put('/jobs/:jobId',editJob);
router.delete('/jobs/:jobId',deleteJob);
router.post('/candidate',postCandidate);
router.get('/get-candidates',getCandidates);
router.put('/candidate-status', updateStatus);
router.post('/employee',postEmployee);
router.get('/employees',getEmployees);
router.get('/employee/:employeeId',getEmployeeById);
router.delete('/employee/:employeeId',deleteEmployee);

export default router