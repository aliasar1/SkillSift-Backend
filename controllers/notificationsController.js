const { sendNotificationToRecruiter, sendNotificationToJobSeeker } = require('../config/firebaseConfig');

exports.sendNotificationToRecruiter = async (req, res) => {
    const { recruiterFcmToken, jobSeekerName, jobTitle } = req.body;
    try {
        await sendNotificationToRecruiter(recruiterFcmToken, jobSeekerName, jobTitle);
        res.status(200).send('Notification sent to recruiter');
    } catch (error) {
        console.error('Error sending notification to recruiter:', error);
        res.status(500).json({ message: 'Failed to send notification to recruiter' });
    }
};

exports.sendNotificationToJobSeeker = async (req, res) => {
    const { jobSeekerFcmToken, recruiterName, jobTitle } = req.body;
    try {
        await sendNotificationToJobSeeker(jobSeekerFcmToken, recruiterName, jobTitle);
        res.status(200).send('Notification sent to job seeker');
    } catch (error) {
        console.error('Error sending notification to job seeker:', error);
        res.status(500).json({ message: 'Failed to send notification to job seeker' });
    }
};
