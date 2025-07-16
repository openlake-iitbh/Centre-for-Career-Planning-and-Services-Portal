import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api';

export const createJobPosting = async (jobData, token) => {
  const payload = {
    ...jobData,
    requiredSkills: jobData.requiredSkills.split(',').map((skill) => skill.trim()),
    batch: parseInt(jobData.batch),
    relevanceScore: jobData.relevanceScore ? parseFloat(jobData.relevanceScore) : undefined,
  };

  const res = await axios.post(`${BASE_URL}/jobs`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
