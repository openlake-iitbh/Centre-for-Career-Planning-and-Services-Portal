import Student from "../models/student.model.js";

// Function to fetch student details by StudentID
const getStudentDetails = async (studentID) => {
    try {
        const student = await Student.findOne({ StudentID: studentID });

        if (!student) {
            return { error: 'Student not found' };
        }

        return student;
    } catch (error) {
        console.error(error);
        return { error: 'An error occurred while fetching student details' };
    }
};

export const ViewRes = async (req, res) => {
  console.log(req.params)
  const {studentID} = req.params;
  const student = await getStudentDetails(studentID);

  if (student.error) {
    return res.json({"found":0});
  }
  return res.json(student);

}

export const updateProfile = async (req, res) => {
  const { studentID } = req.params;
  const { Discipline, JobReferenceID, Status, Jobstatus, SavedJobs, ReferenceObject } = req.body;
  const student = await Student.findOne({ StudentID: studentID });
  if(!student){
    return res.json({"found":0});
  }
  if(Discipline) student.Discipline = Discipline;
  if(JobReferenceID) student.JobReferenceID = JobReferenceID;
  if(Status) student.Status = Status;
  if(Jobstatus) student.Jobstatus = Jobstatus;
  if(SavedJobs) student.SavedJobs = SavedJobs;
  if(ReferenceObject) student.ReferenceObject = ReferenceObject;
  await student.save();
}

export const deleteOffCampus = async (req, res) => {
  try {
    const { studentID } = req.params;
    const { jobID } = req.body;
    
    const student = await Student.findOne({ StudentID: studentID });
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.Jobstatus = student.Jobstatus.filter((job) => job.JobRerenceID !== jobID);
    await student.save();
    
    return res.json(student);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addOffCampus = async (req, res) => {
  try {
    const { studentID } = req.params;
    const { jobID } = req.body;

    const student = await Student.findOne({ StudentID: studentID });
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.Jobstatus.push({ JobReferenceID: jobID, ApplicationStatus: "applied" });
    await student.save();
    
    return res.json(student);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { studentID } = req.params;
    const { jobID, status } = req.body;

    const student = await Student.findOne({ StudentID: studentID });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const job = student.Jobstatus.find((job) => job.JobReferenceID === jobID);
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.ApplicationStatus = status;
    student.markModified("Jobstatus"); 
    await student.save();
    
    return res.json(student);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
