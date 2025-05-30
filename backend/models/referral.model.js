import mongoose from "mongoose";

const referralSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    companyName: { type: String, required: true },
    jobId: { type: String, required: true },
    resumeLink: { type: String, required: true },
    alumniEmail: { type: String },
    referralLink: { type: String }
}, { timestamps: true });

const Referral = mongoose.model("Referral", referralSchema);
export default Referral;
