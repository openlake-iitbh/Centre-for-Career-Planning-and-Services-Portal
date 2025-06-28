import express from "express";
import { ViewRes ,updateProfile , deleteOffCampus ,addOffCampus,updateStatus  } from "../controllers/studentview.controller.js";

const router = express.Router();

// getting student view
router.get('/:ID', ViewRes);
router.put('/:ID', updateProfile);
router.delete('/:ID', deleteOffCampus);
router.put('/:ID', addOffCampus);
router.put('/:ID', updateStatus);


export default router;