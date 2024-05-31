const { sendNotification } = require('../config/firebaseConfig');
const FCM = require('../models/fcmModel');

exports.registerToken = async (req, res) => {
    const { fcmToken, userId } = req.body;
    if (!fcmToken || !userId) {
        return res.status(400).json({ message: 'fcmToken and userId are required.' });
    }

    try {
        let fcmEntry = await FCM.findOne({ userId });
        if (fcmEntry) {
            if (!fcmEntry.fcmTokens.includes(fcmToken)) {
                fcmEntry.fcmTokens.push(fcmToken);
                await fcmEntry.save();
            }
        } else {
            fcmEntry = new FCM({ userId, fcmTokens: [fcmToken] });
            await fcmEntry.save();
        }
        res.status(200).send('Token registered successfully');
    } catch (error) {
        console.error('Error registering token: ', error);
        res.status(500).json({ message: 'Failed to register token.' });
    }
};

exports.removeToken = async (req, res) => {
    const { fcmToken, userId } = req.body;
    if (!fcmToken || !userId) {
        return res.status(400).json({ message: 'fcmToken and userId are required.' });
    }

    try {
        const fcmEntry = await FCM.findOne({ userId });
        if (fcmEntry) {
            fcmEntry.fcmTokens = fcmEntry.fcmTokens.filter(token => token !== fcmToken);
            if (fcmEntry.fcmTokens.length === 0) {
                await FCM.deleteOne({ userId });
            } else {
                await fcmEntry.save();
            }
            res.status(200).send('Token removed successfully');
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        console.error('Error removing token: ', error);
        res.status(500).json({ message: 'Failed to remove token.' });
    }
};

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
