import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  getStudentProfile,
  updateStudentProfile,
  createStudentProfile,
} from "../api/useProfile";
import { useAuthContext } from "../context/AuthContext";

const Profile = () => {
  const { authUser } = useAuthContext();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    studentID: "",
    discipline: "",
    program: "",
    cgpa: "",
  });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ ...profile });

  const isIncompleteProfile =
    !profile.studentID || !profile.discipline || !profile.program || !profile.cgpa;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getStudentProfile(authUser._id);

        setProfile({
          name: data.name || "",
          email: data.email || "",
          studentID: data.studentID || "",
          discipline: data.discipline || "",
          program: data.program || "",
          cgpa: data.cgpa || "",
        });

        setFormData({
          name: data.name || "",
          email: data.email || "",
          studentID: data.studentID || "",
          discipline: data.discipline || "",
          program: data.program || "",
          cgpa: data.cgpa || "",
        });
      } catch (error) {
        console.warn("No existing student profile found.");
        setProfile({
          name: authUser.name || "",
          email: authUser.email || "",
          studentID: "",
          discipline: "",
          program: "",
          cgpa: "",
        });

        setFormData({
          name: authUser.name || "",
          email: authUser.email || "",
          studentID: "",
          discipline: "",
          program: "",
          cgpa: "",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [authUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        studentID: formData.studentID,
        discipline: formData.discipline,
        program: formData.program,
        cgpa: formData.cgpa,
        batch: 2025, // Replace with dynamic year if needed
        status: "active", // Adjust as per your requirement
      };

      if (!profile.studentID) {
        // Profile doesn't exist; create it
        await createStudentProfile(authUser._id, payload);
      } else {
        // Profile exists; update it
        await updateStudentProfile(authUser._id, payload);
      }

      setShowForm(false);

      const updated = await getStudentProfile(authUser._id);
      setProfile({
        name: updated.name || "",
        email: updated.email || "",
        studentID: updated.studentID || "",
        discipline: updated.discipline || "",
        program: updated.program || "",
        cgpa: updated.cgpa || "",
      });
    } catch (error) {
      console.error("Error saving profile:", error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl font-semibold text-gray-700">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Student Profile</h2>

          {isIncompleteProfile && !showForm && (
            <div className="mb-4 text-center text-red-500 font-semibold">
              Your profile is incomplete. Please update your profile.
            </div>
          )}

          {!showForm ? (
            <div className="space-y-4 text-lg text-gray-700">
              <div><strong>Name:</strong> {profile.name || "N/A"}</div>
              <div><strong>Email:</strong> {profile.email || "N/A"}</div>
              <div><strong>ID Number:</strong> {profile.studentID || "N/A"}</div>
              <div><strong>Discipline:</strong> {profile.discipline || "N/A"}</div>
              <div><strong>Program:</strong> {profile.program || "N/A"}</div>
              <div><strong>CGPA:</strong> {profile.cgpa || "N/A"}</div>
              <button
                onClick={() => setShowForm(true)}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Update Profile
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border p-2 rounded"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="studentID"
                value={formData.studentID}
                onChange={handleChange}
                placeholder="Student ID"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="discipline"
                value={formData.discipline}
                onChange={handleChange}
                placeholder="Discipline"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="program"
                value={formData.program}
                onChange={handleChange}
                placeholder="Program"
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                name="cgpa"
                step="0.01"
                min="0"
                max="10"
                value={formData.cgpa}
                onChange={handleChange}
                placeholder="CGPA"
                className="w-full border p-2 rounded"
              />
              <div className="flex gap-4 justify-center">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;





// import React, { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import { getStudentProfile, updateStudentProfile } from "../api/useProfile";
// import { useAuthContext } from "../context/AuthContext";

// const Profile = () => {
//   const { authUser } = useAuthContext();
//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//     idNumber: "",
//     discipline: "",
//     program: "",
//     cgpa: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({ ...profile });

//   // changes have to be made to fetch like the other data.
//   const isIncompleteProfile = !profile.idNumber || !profile.discipline || !profile.program || !profile.cgpa;

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         const data = await getStudentProfile(authUser._id);
        
//         setProfile({
//           name: data.name || "",
//           email: data.email || "",
//           idNumber: data.studentID || "",
//           discipline: data.discipline || "",
//           program: data.program || "",
//           cgpa: data.cgpa || "",
//         });
//         setFormData({
//           name: data.name || "",
//           email: data.email || "",
//           idNumber: data.studentID || "",
//           discipline: data.discipline || "",
//           program: data.program || "",
//           cgpa: data.cgpa || "",
//         });
//       } catch (error) {
//         console.error("Error fetching profile:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [authUser]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updateStudentProfile(authUser._id,{
//         name: formData.name,
//         email: formData.email,
//         idNumber: formData.studentID,
//         discipline: formData.discipline,
//         program: formData.program,
//         cgpa: formData.cgpa,
//       });
//       setShowForm(false);
//       // Refresh the profile
//       const updated = await getStudentProfile(authUser._id);
//       setProfile({
//         name: updated.name || "",
//         email: updated.email || "",
//         idNumber: updated.studentID || "",
//         discipline: updated.discipline || "",
//         program: updated.program || "",
//         cgpa: updated.cgpa || "",
//       });
//     } catch (error) {
//       console.error("Error updating profile:", error.message);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <p className="text-xl font-semibold text-gray-700">Loading Profile...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex-1 p-8">
//         <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-6">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Student Profile</h2>

//           {isIncompleteProfile && !showForm && (
//             <div className="mb-4 text-center text-red-500 font-semibold">
//               Your profile is incomplete. Please update your profile.
              
//               {/* <button
//                 onClick={() => setShowForm(true)}
//                 className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Update Profile
//               </button> */}
//             </div>
//           )}

//           {!showForm ? (
//             <div className="space-y-4 text-lg text-gray-700">
//               <div><strong>Name:</strong> {profile.name || "N/A"}</div>
//               <div><strong>Email:</strong> {profile.email || "N/A"}</div>
//               <div><strong>ID Number:</strong> {profile.idNumber || "N/A"}</div>
//               <div><strong>Discipline:</strong> {profile.discipline || "N/A"}</div>
//               <div><strong>Program:</strong> {profile.program || "N/A"}</div>
//               <div><strong>CGPA:</strong> {profile.cgpa || "N/A"}</div>
//               <button
//                 onClick={() => setShowForm(true)}
//                 className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Update Profile
//               </button>
//             </div>
            
//           ) : (
//             <form className="space-y-4" onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Name"
//                 className="w-full border p-2 rounded"
//               />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email"
//                 className="w-full border p-2 rounded"
//               />
//               <input
//                 type="number"
//                 name="studentID"
//                 step="0.01"
//                 min="0"
//                 max="10"
//                 value={formData.idNumber}
//                 onChange={handleChange}
//                 placeholder="studentID"
//                 className="w-full border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 name="discipline"
//                 value={formData.discipline}
//                 onChange={handleChange}
//                 placeholder="Discipline"
//                 className="w-full border p-2 rounded"
//               />
//               <input
//                 type="text"
//                 name="program"
//                 value={formData.program}
//                 onChange={handleChange}
//                 placeholder="Program"
//                 className="w-full border p-2 rounded"
//               />
//               <input
//                 type="number"
//                 name="cgpa"
//                 step="0.01"
//                 min="0"
//                 max="10"
//                 value={formData.cgpa}
//                 onChange={handleChange}
//                 placeholder="CGPA"
//                 className="w-full border p-2 rounded"
//               />
//               <div className="flex gap-4 justify-center">
//                 <button
//                   type="submit"
//                   className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                 >
//                   Save Changes
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowForm(false)}
//                   className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           )}
          
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;