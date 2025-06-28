import Alumni from '../models/Alumni.model.js';

export const alumniList = async (req, res) => {
    try {
        const alumni = await Alumni.find();
        res.json(alumni);
    } catch (error) {
        res.json({ message: error });
    }
}   

// Search by Job ID
export const searchAlumniByJobId = async (req, res) => {
  const { jobId } = req.query;
  if (!jobId) return res.status(400).json({ message: "Job ID is required" });

  try {
    const alumni = await Alumni.find({ "jobs.id": jobId });
    if (!alumni.length) return res.status(404).json({ message: "No alumni found with given job ID" });
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Search by Job Role
export const searchAlumniByJobRole = async (req, res) => {
  const { jobRole } = req.query;
  if (!jobRole) return res.status(400).json({ message: "Job role is required" });

  try {
    const alumni = await Alumni.find({ "jobs.role": { $regex: jobRole, $options: "i" } });
    if (!alumni.length) return res.status(404).json({ message: "No alumni found with given job role" });
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Search by Company
export const searchAlumniByCompany = async (req, res) => {
  const { company } = req.query;
  if (!company) return res.status(400).json({ message: "Company is required" });

  try {
    const alumni = await Alumni.find({ company: { $regex: company, $options: "i" } });
    if (!alumni.length) return res.status(404).json({ message: "No alumni found with given company" });
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
