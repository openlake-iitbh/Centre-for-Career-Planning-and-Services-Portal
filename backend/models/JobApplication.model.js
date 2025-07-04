import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "jobPosting",
    required: true
  },
  status: {
    type: String,
    enum: ["applied", "under review", "selected", "rejected"],
    default: "applied"
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);
export default JobApplication;
