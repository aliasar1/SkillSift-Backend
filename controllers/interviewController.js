const InterviewSchedule = require('../models/interviewModel');
const mailer = require('../utils/mailer');

exports.scheduleInterview = async (req, res) => {
    const { application_id, date, time } = req.body;

    const existingInterview = await InterviewSchedule.findOne({ application_id });
    if (existingInterview) {
        return res.status(400).json({ message: 'Interview already scheduled for this application at the given time' });
    }

    const newInterview = new InterviewSchedule({
        application_id,
        date,
        time
    });

    try {
        const savedInterview = await newInterview.save();
        res.status(201).json(savedInterview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.sendInterviewEmail = async (req, res) => {
    const { data, email } = req.body;

    try {
        await mailer(email, 'Interview Scheduled!', data);

        res.status(200).json({ message: 'Interview email sent successfully!' });
    } catch (error) {
        console.error('Error sending interview email:', error);

        res.status(500).json({ message: 'Failed to send interview email. Please try again later.' });
    }
};

exports.checkInterviewExists = async (req, res) => {
    const { application_id } = req.body;

    try {
        const interview = await InterviewSchedule.findOne({ application_id });
        if (interview) {
            return res.status(200).json({ exists: true, interview });
        } else {
            return res.status(200).json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
