import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getStudentProfile } from "../api/useProfile";
import { useAuthContext } from "../context/AuthContext";

const Profile = () => {
  const { authUser } = useAuthContext();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    idNumber: "",
    discipline: "",
    program: "",
    cgpa: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getStudentProfile(); // cookies are included inside useProfile.js
        setProfile({
          name: data.name || "N/A",
          email: data.email || "N/A",
          phone: data.phone || "N/A",
          idNumber: data.idNumber || "N/A",
          discipline: data.discipline || "N/A",
          program: data.program || "N/A",
          cgpa: data.cgpa || "N/A",
        });
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
          <div className="flex-1 flex items-center justify-center">
            <p className="text-xl font-semibold text-gray-700">Loading Profile...</p>
          </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Student Profile</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <div><strong>Name:</strong> {profile.name}</div>
            <div><strong>Email:</strong> {profile.email}</div>
            <div><strong>Phone:</strong> {profile.phone}</div>
            <div><strong>ID Number:</strong> {profile.idNumber}</div>
            <div><strong>Discipline:</strong> {profile.discipline}</div>
            <div><strong>Program:</strong> {profile.program}</div>
            <div><strong>CGPA:</strong> {profile.cgpa}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
