import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("ccps-token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const fetchJobs = () =>
  axios.get(`${BASE_URL}/api/jobs`, { headers: getAuthHeaders() }).then((r) => r.data.jobs);

export const fetchMyApplications = () =>
  axios
    .get(`${BASE_URL}/api/applications/student-applications`, { headers: getAuthHeaders() })
    .then((r) => ({
      onCampus: r.data.onCampusApplications,
      offCampus: r.data.offCampusApplications,
    }));

export const applyToJob = (jobId) =>
  axios.post(`${BASE_URL}/api/applications/apply`, { jobId }, { headers: getAuthHeaders() });
