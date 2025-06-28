import express from "express";
import {
  alumniList,
  searchAlumniByJobId,
  searchAlumniByJobRole,
  searchAlumniByCompany,
} from "../controllers/alumni.controllers.js";

const router = express.Router();

router.get("/", alumniList);
router.get("/search-by-id", searchAlumniByJobId);
router.get("/search-by-role", searchAlumniByJobRole);
router.get("/search-by-company", searchAlumniByCompany);

export default router;
