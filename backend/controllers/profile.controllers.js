import User from "../models/user.model.js";
import Student from "../models/student.model.js";

export const createStudentProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      studentID,
      discipline,
      program,
      cgpa,
      batch,
      status
    } = req.body;

    // 1. Validate required fields
    if (!studentID || !discipline || !batch || !status) {
      return res.status(400).json({
        message: "Missing required fields: studentID, discipline, batch, status"
      });
    }

    // 2. Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3. Check if student profile already exists
    const existing = await Student.findOne({ ReferenceObject: userId });
    if (existing) {
      return res.status(400).json({ message: "Student profile already exists" });
    }

    // 4. Check if StudentID is already taken (due to `unique: true`)
    const takenID = await Student.findOne({ StudentID: studentID });
    if (takenID) {
      return res.status(400).json({ message: "Student ID already in use" });
    }

    // 5. Create student document
    const newStudent = new Student({
      ReferenceObject: userId,
      StudentID: studentID,
      Discipline: discipline,
      Program: program || "",
      CGPA: cgpa || null,
      Batch: batch,
      Status: status,
      Jobstatus: [],
      JobReferenceID: null,
      SavedJobs: []
    });

    await newStudent.save();

    return res.status(201).json({
      message: "Student profile created successfully",
      student: newStudent
    });
  } catch (error) {
    console.error("Error creating student profile:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



export const getStudentProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const student = await Student.findOne({ ReferenceObject: userId }).populate('ReferenceObject');
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
      program: student.Program || "",  
      cgpa: student.CGPA || "",        
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

    const student = await Student.findOne({ ReferenceObject: userId });
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
