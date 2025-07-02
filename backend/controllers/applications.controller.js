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
