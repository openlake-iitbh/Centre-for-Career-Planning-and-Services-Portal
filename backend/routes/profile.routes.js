import express from 'express';
import { getStudentProfile, updateStudentProfile } from '../controllers/profile.controllers.js';
import { protectRoute } from '../middleware/auth.middleware.js'; 

const router = express.Router();

router.get('/profile/:userId', protectRoute, getStudentProfile);
router.post('/profile/:userId', protectRoute, updateStudentProfile);

export default router;
