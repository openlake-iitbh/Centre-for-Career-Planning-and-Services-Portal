import React, { useEffect, useState } from "react";
import { fetchJobs, fetchMyApplications, applyToJob } from "../api/useApply";
import { toast } from "react-hot-toast";
import Sidebar from "../components/Sidebar";

const Applications = () => {
  const [jobs, setJobs] = useState([]);
  const [myApps, setMyApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [jobList, { onCampus, offCampus }] = await Promise.all([
          fetchJobs(),
          fetchMyApplications(),
        ]);
        setJobs(jobList);
        setMyApps([...onCampus, ...offCampus]);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load jobs/applications");
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  const handleApply = async (jobId) => {
    try {
      await applyToJob(jobId);
      toast.success("Applied successfully");
      const { onCampus, offCampus } = await fetchMyApplications();
      setMyApps([...onCampus, ...offCampus]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Apply failed");
    }
  };

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <div>
      <Sidebar />
      <div className="max-w-4xl mx-auto p-6 space-y-6">

        <h1 className="text-3xl font-bold">Job Board</h1>
        <ul className="grid gap-4 sm:grid-cols-2">
          {jobs.map((job) => {
            const app = myApps.find((a) => a.jobId === job._id || a.jobId._id === job._id);
            const status = app?.status;

            return (
              <li key={job._id} className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold">{job.jobTitle}</h2>
                <p className="text-sm text-gray-600">{job.Company} • {job.Type}</p>
                <p className="mt-2 text-gray-800 line-clamp-3">{job.jobDescription}</p>
                <div className="mt-4 flex items-center justify-between">
                  {status ? (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded">
                      {status}
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApply(job._id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Apply
                    </button>
                  )}
                  <span className="text-xs text-gray-500">
                    Deadline: {new Date(job.Deadline).toLocaleDateString()}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Applications;
