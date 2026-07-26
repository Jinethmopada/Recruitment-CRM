import express from 'express';
import { registerUser ,loginUser} from '../controllers/userController.js';
import { postJob,getJobs, fetchJob,editJob,deleteJob } from '../controllers/jobsController.js';

const router = express();

router.post('/register',registerUser);
router.post('/login', loginUser);
router.post('/new-job',postJob);
router.get('/get-jobs',getJobs);
router.get('/jobs/:jobId',fetchJob);
router.put('/jobs/:jobId',editJob);
router.delete('/jobs/:jobId',deleteJob);

export default router