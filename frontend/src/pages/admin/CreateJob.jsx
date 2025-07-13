import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CreateJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    location: '',
    salary: '',
    jobType: '',
    deadline: '',
    skills: '',
    eligibility: '',
    resumeRequired: false,
    externalLink: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('ccps-token'); 
      await axios.post('/api/admin/jobs', {
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim())
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Job created successfully');
      setFormData({
        title: '', company: '', description: '', location: '',
        salary: '', jobType: '', deadline: '', skills: '',
        eligibility: '', resumeRequired: false, externalLink: ''
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h1 className="text-2xl font-semibold mb-6">Create Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} className="input" required />
        <input type="text" name="company" placeholder="Company" value={formData.company} onChange={handleChange} className="input" required />
        <textarea name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} className="input" rows="4" required />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="input" required />
        <input type="text" name="salary" placeholder="Salary (optional)" value={formData.salary} onChange={handleChange} className="input" />
        <input type="text" name="jobType" placeholder="Job Type (e.g. Internship, Full-time)" value={formData.jobType} onChange={handleChange} className="input" required />
        <input type="date" name="deadline" placeholder="Deadline" value={formData.deadline} onChange={handleChange} className="input" required />
        <input type="text" name="skills" placeholder="Skills (comma-separated)" value={formData.skills} onChange={handleChange} className="input" />
        <input type="text" name="eligibility" placeholder="Eligibility Criteria" value={formData.eligibility} onChange={handleChange} className="input" />
        <div className="flex items-center gap-2">
          <input type="checkbox" name="resumeRequired" checked={formData.resumeRequired} onChange={handleChange} />
          <label>Resume Required</label>
        </div>
        <input type="text" name="externalLink" placeholder="External Apply Link (optional)" value={formData.externalLink} onChange={handleChange} className="input" />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create Job
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
