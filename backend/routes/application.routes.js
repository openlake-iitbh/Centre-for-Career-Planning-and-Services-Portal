import express from "express";
import { getStudentApplications } from "../controllers/applications.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/student-applications", protectRoute, getStudentApplications);

export default router;
