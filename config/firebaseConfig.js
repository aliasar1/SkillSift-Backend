const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: "skillsift-f1225"
});

const messaging = admin.messaging();

async function sendNotification(fcmToken, title, body) {
    const message = {
        token: fcmToken,
        notification: {
            title: title,
            body: body,
        },
    };

    try {
        await messaging.send(message);
        console.log('Notification sent successfully.');
    } catch (error) {
        console.error('Error sending notification: ', error);
        throw error; 
    }
}

module.exports = {
    sendNotification,
};

