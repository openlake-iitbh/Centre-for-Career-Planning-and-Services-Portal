import React, { useState } from 'react';
import ApplyModal from '..components/ApplyModal';

const JobDetails = ({ job }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.description}</p>
      <button onClick={() => setIsModalOpen(true)}>Apply Now</button>

      {isModalOpen && (
        <ApplyModal
          jobId={job._id}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default JobDetails;
