import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("ccps-token")}`,
  },
});

export const fetchJobs = () =>
  api.get("/api/jobs").then((res) => res.data.jobs);

export const fetchMyApplications = () =>
  api
    .get("/api/applications/student-applications")
    .then((res) => ({
      onCampus: res.data.onCampusApplications,
      offCampus: res.data.offCampusApplications,
    }));

export const applyToJob = (data) =>
  api.post("/api/applications/apply", data).then((res) => res.data);
