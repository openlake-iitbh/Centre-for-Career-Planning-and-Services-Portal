import express from "express";
import { jobCreate,jobUpdate,jobRelevanceScoreUpvote,jobRelevanceScoreDownvote,jobDelete,jobList } from "../controllers/jobs.controllers.js";

const router = express.Router();

router.post("/",jobCreate)
router.put("/:id",jobUpdate)
router.delete("/:id",jobDelete)
router.get('/', jobList);
router.get('/upvote/:id',jobRelevanceScoreUpvote)
router.get('/downvote/:id',jobRelevanceScoreDownvote)

export default router;