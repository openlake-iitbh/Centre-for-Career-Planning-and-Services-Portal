import express from 'express';
import { getStudentProfile, updateStudentProfile } from '../controllers/profile.controllers.js';
import { protectRoute } from '../middleware/auth.middleware.js'; 

const router = express.Router();
  
router.get('/', protectRoute, getStudentProfile);
router.post('/', protectRoute, updateStudentProfile);

export default router;
