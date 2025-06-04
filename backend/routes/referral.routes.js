import express from "express";
import { requestReferral, provideReferral, getReferrals, deleteReferral } from "../controllers/referral.controller.js";

const router = express.Router();

router.post("/request", requestReferral);
router.post("/provide", provideReferral);
router.get("/", getReferrals);
router.delete("/:id", deleteReferral);

export default router;