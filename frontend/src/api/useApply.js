import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const TOKEN = localStorage.getItem("ccps-token");

const headers = { Authorization: `Bearer ${TOKEN}` };

export const fetchJobs = () =>
  axios.get(`${BASE_URL}/api/jobs`, { headers }).then((r) => r.data.jobs);

export const fetchMyApplications = () =>
  axios
    .get(`${BASE_URL}/api/applications/student-applications`, { headers })
    .then((r) => ({
      onCampus: r.data.onCampusApplications,
      offCampus: r.data.offCampusApplications,
    }));

export const applyToJob = (jobId) =>
  axios.post(
    `${BASE_URL}/api/applications/apply`,
    { jobId },
    { headers }
  );
