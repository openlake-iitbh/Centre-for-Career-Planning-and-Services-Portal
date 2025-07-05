import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const JobApplicants = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const backendUrl = "http://localhost:3000";
  const fetchApplicants = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/applications/job/${jobId}/applicants`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ccps-token")}`,
        },
      });
      console.log("Applicants response:", res.data);
      setApplicants(res.data.applicants || []);
    } catch (error) {
      console.error("Error fetching applicants:", error.response?.data || error.message);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `/api/applications/status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ccps-token")}`,
          },
        }
      );
      await fetchApplicants();
    } catch (error) {
      console.error("Error updating status:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Applicants</h2>
      <div className="space-y-4">
        {applicants.map((app) => (
          <div
            key={app._id}
            className="bg-gray-100 rounded-lg p-4 shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{app.studentId.name}</p>
              <p className="text-sm text-gray-600">{app.studentId.email}</p>
              <p>Status: <span className="font-medium">{app.status}</span></p>
            </div>
            <select
              className="border rounded p-1"
              value={app.status}
              onChange={(e) => updateStatus(app._id, e.target.value)}
            >
              <option>applied</option>
              <option>under review</option>
              <option>selected</option>
              <option>rejected</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobApplicants;
