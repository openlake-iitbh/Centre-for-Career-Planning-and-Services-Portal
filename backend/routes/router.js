//importing all the necessary dependencies 
import express from "express";
import {jobCreate,jobUpdate,jobRelevanceScoreUpvote,jobRelevanceScoreDownvote,jobDelete,jobList} from "../controllers/jobs.controllers.js"
import { alumniList } from "../controllers/alumni.controllers.js";
import { ViewRes ,updateProfile , deleteOffCampus ,addOffCampus,updateStatus  } from "../controllers/studentview.js";

//using the router
const router = express.Router();

//making the routes
router.route("").get();
router.post("/jobs",jobCreate)
router.put("/jobs/:id",jobUpdate)
router.delete("/jobs/:id",jobDelete)
router.get('/jobs', jobList);  
router.get('/jobs/upvote/:id',jobRelevanceScoreUpvote)
router.get('/jobs/downvote/:id',jobRelevanceScoreDownvote)

// getting student view
router.get('/student/:ID', ViewRes);
router.put('/student/:ID', updateProfile);
router.delete('/student/:ID', deleteOffCampus);
router.put('/student/:ID', addOffCampus);
router.put('/student/:ID', updateStatus);


//alumni routes
router.get("/alumni", alumniList);

//exporting the router
export default router;
