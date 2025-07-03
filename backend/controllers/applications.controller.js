import JobApplication from "../models/JobApplication.model.js";
import JobPosting from "../models/jobPosting.model.js";

export const getStudentApplications = async (req, res) => {
  try {
    const studentId = req.user._id; // protectRoute should attach this

    const applications = await JobApplication.find({ studentId }).populate("jobId");

    const onCampusApplications = [];
    const offCampusApplications = [];

    for (let app of applications) {
      if (!app.jobId) continue; // if job got deleted

      const jobType = app.jobId.Type;

      if (jobType === "on-campus") {
        onCampusApplications.push(app);
      } else if (jobType === "off-campus") {
        offCampusApplications.push(app);
      }
    }

    res.status(200).json({
      success: true,
      onCampusApplications,
      offCampusApplications
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch student applications",
      error: err.message
    });
  }
};

export const applyToJob = async (req, res) => {
  try {
    const studentId = req.user._id;
    const { jobId } = req.body;

    // Check if job exists
    const job = await JobPosting.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Check if already applied
    const existingApplication = await JobApplication.findOne({ studentId, jobId });
    if (existingApplication) {
      return res.status(400).json({ success: false, message: "Already applied to this job" });
    }

    const application = new JobApplication({ studentId, jobId });
    await application.save();

    res.status(201).json({
      success: true,
      message: "Job application submitted successfully",
      application
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to apply to job",
      error: err.message
    });
  }
};