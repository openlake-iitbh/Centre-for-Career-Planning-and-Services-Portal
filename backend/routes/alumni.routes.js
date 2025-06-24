import express from "express"
import { alumniList } from "../controllers/alumni.controllers.js";
const router = express.Router();

//alumni routes
router.get("/", alumniList);

export default router;