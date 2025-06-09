import User from "../models/user.model.js";
import Student from "../models/student.model.js";

export const getStudentProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const student = await Student.findOne({ userId: userId }).populate('ReferenceObject');
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const user = student.ReferenceObject;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const profile = {
      name: user.name,
      email: user.email,
      studentID: student.StudentID,
      discipline: student.Discipline || "",
      program: student.Program || "",   // If you add 'Program' field to Student schema
      cgpa: student.CGPA || "",         // If you add 'CGPA' field to Student schema
    };

    return res.json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateStudentProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, discipline, program, cgpa } = req.body;

    const student = await Student.findOne({ userId: userId });
    if (!student) {  
      return res.status(404).json({ message: "Student not found" });
    }

    const user = await User.findById(student.ReferenceObject);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update User fields
    if (name) user.name = name;
    if (email) user.email = email;
    await user.save();

    // Update Student fields
    if (discipline) student.Discipline = discipline;
    if (program) student.Program = program;
    if (cgpa) student.CGPA = cgpa;
    await student.save();

    return res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
