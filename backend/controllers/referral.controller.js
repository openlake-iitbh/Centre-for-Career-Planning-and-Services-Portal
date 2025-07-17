import Referral from "../models/referral.model.js";

export const requestReferral = async (req, res) => {
    try {
        const { studentName, studentEmail, companyName, jobId, resumeLink } = req.body;
        console.log({ studentName, studentEmail, companyName, jobId, resumeLink });
        const newReferral = new Referral({ studentName, studentEmail, companyName, jobId, resumeLink });
        await newReferral.save();
        res.status(201).json(newReferral);
    } catch (error) {
        res.status(500).json({ error: "Error requesting referral." });
    }
};

export const provideReferral = async (req, res) => {
    try {
        const { referralId, referralLink, alumniEmail } = req.body;
        const referral = await Referral.findByIdAndUpdate(referralId, { referralLink, alumniEmail }, { new: true });
        res.json(referral);
    } catch (error) {
        res.status(500).json({ error: "Error providing referral." });
    }
};

export const getReferrals = async (req, res) => {
    try {
        const referrals = await Referral.find();
        res.json(referrals);
    } catch (error) {
        res.status(500).json({ error: "Error fetching referrals." });
    }
};

export const deleteReferral = async (req, res) => {
    try {
        await Referral.findByIdAndDelete(req.params.id);
        res.json({ message: "Referral deleted." });
    } catch (error) {
        res.status(500).json({ error: "Error deleting referral." });
    }
};