import React from 'react';
import Sidebar from '../components/Sidebar';

const Home = () => {
  return (
    <div className="flex min-h-screen bg-base-200">
      <Sidebar />
      <div className="flex-1 p-6 pt-16 md:pt-6">
        <iframe
          src="https://www.iitbhilai.ac.in/index.php?pid=placement"
          title="External Site"
          className="w-full h-[90vh] rounded-lg border border-base-300"
        />
      </div>
    </div>
  );
};

export default Home;
