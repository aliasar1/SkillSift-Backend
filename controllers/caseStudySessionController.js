const CaseStudySession = require('../models/caseStudySession');

const addStartTime = async (req, res) => {
    try {
        const { question, response } = req.body;
        const existingSession = await CaseStudySession.findOne({ application_id: req.params.applicationId });
        if (existingSession) {
            throw new Error('Session already exists for this application');
        }
        const newSession = new CaseStudySession({ application_id: req.params.applicationId, question: question, response: response });
        await newSession.save();
        
        console.log(newSession);
        res.status(200).send(newSession);
    } catch (error) {
        res.status(500).json({ message: `Error adding start time: ${error.message}` });
    }
};

const getSessionData = async (req, res) => {
    try {
        const session = await CaseStudySession.findOne({ application_id: req.params.applicationId });
        if (!session) {
            return res.status(404).json({ isSessionExist: false });
        }

        res.status(200).json({ session: session, isSessionExist: true });
    } catch (error) {
        res.status(500).json({ message: `Error fetching session data: ${error.message}` });
    }
};


const saveProgress = async (req, res) => {
    try {
        const { question, response } = req.body;
        const applicationId = req.params.applicationId;

        const session = await CaseStudySession.findOne({ application_id: applicationId });
        if (!session) {
            return res.status(404).json({ message: 'Session not found for this application' });
        }

        session.question = question;
        session.response = response;
        await session.save();

        res.status(200).json({ message: 'Progress saved successfully', session });
    } catch (error) {
        res.status(500).json({ message: `Error saving progress: ${error.message}` });
    }
};

module.exports = {
    addStartTime,
    getSessionData,
    saveProgress
};