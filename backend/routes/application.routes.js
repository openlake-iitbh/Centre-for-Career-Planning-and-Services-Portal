import express from "express";
import { getStudentApplications, applyToJob } from "../controllers/applications.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/student-applications", protectRoute, getStudentApplications);
router.post("/apply", protectRoute, applyToJob); // Assuming applyToJob is defined in the controller

export default router;
