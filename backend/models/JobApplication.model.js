import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobPosting",
    required: true
  },
  resume: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  status: {
    type: String,
    default: "applied"
  }
}, { timestamps: true });

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);
export default JobApplication;
