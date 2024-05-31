const { sendNotification } = require('../config/firebaseConfig');

exports.sendNotification = async (req, res) => {
    const { fcmToken, title, body } = req.body;
    try {
        await sendNotification(fcmToken, title, body);
        res.status(200).send('Notification sent to job seeker');
    } catch (error) {
        console.error('Error sending notification: ', error);
        res.status(500).json({ message: 'Failed to send notification.' });
    }
};
