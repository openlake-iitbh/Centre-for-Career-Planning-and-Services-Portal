import React, { useState } from 'react';
import ApplyModal from './ApplyModal';

const JobCard = ({ job }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>{job.company}</p>
      <button
        className="btn-apply"
        onClick={() => setIsModalOpen(true)}
      >
        Apply
      </button>

      {isModalOpen && (
        <ApplyModal
          jobId={job._id}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default JobCard;
