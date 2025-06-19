import React from 'react';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex min-h-screen bg-base-200">
      <Sidebar />
      <div className="flex-1 p-6 pt-16 md:pt-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">Welcome to the CCPS Portal 🎓</h1>
            <p className="mt-2 text-base-content">Navigate your career planning journey with ease.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Dashboard"
              desc="Your personal space for updates, stats, and more."
              to="/dashboard"
            />
            <FeatureCard
              title="Resume Builder"
              desc="Create a professional resume in minutes."
              to="/resumebuilder"
            />
            <FeatureCard
              title="Referrals"
              desc="Explore and manage referral opportunities."
              to="/referals"
            />
            <FeatureCard
              title="Discussion Forum"
              desc="Engage in community conversations and share insights."
              to="/discussion-forum"
            />
            <FeatureCard
              title="Analytics"
              desc="View application stats, trends, and reports."
              to="/analytics"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, desc, to }) => (
  <Link to={to} className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-200 ease-in-out">
    <div className="card-body">
      <h2 className="card-title text-primary">{title}</h2>
      <p>{desc}</p>
      <div className="card-actions justify-end">
        <button className="btn btn-primary btn-sm">Go</button>
      </div>
    </div>
  </Link>
);

export default Home;
