const { sendNotification } = require('../config/firebaseConfig');
const FCM = require('../models/fcmModel');

exports.registerToken = async (req, res) => {
    const { fcmToken, userId } = req.body;
   
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        let fcmRecord = await FCM.findOne({ user_id: userId });
        if (fcmRecord) {
            if (!fcmRecord.fcmTokens.includes(fcmToken)) {
                fcmRecord.fcmTokens.push(fcmToken);
                await fcmRecord.save();
            }
        } else {
            fcmRecord = new FCM({
                user_id: userId,
                fcmTokens: [fcmToken],
            });
            await fcmRecord.save();
        }

        res.status(200).json({ message: 'Token registered successfully' });
    } catch (error) {
        console.error('Error registering token: ', error);
        res.status(500).json({ message: 'Failed to register token' });
    }
};

exports.removeToken = async (req, res) => {
    const { fcmToken, userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        let fcmRecord = await FCM.findOne({ user_id: userId });

        if (fcmRecord) {
            fcmRecord.fcmTokens = fcmRecord.fcmTokens.filter(token => token !== fcmToken);
            await fcmRecord.save();
            res.status(200).json({ message: 'Token deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting token: ', error);
        res.status(500).json({ message: 'Failed to delete token' });
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

exports.getAllTokensOfUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const userFCM = await FCM.findOne({ user_id: userId });
        if (!userFCM) {
            return res.status(404).json({ message: 'No tokens found for this user' });
        }
        res.status(200).json(userFCM.fcmTokens);
    } catch (error) {
        console.error('Error fetching tokens: ', error);
        res.status(500).json({ message: 'Failed to fetch tokens' });
    }
};
