const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

async function sendNotificationToRecruiter(recruiterFcmToken, jobSeekerName, jobTitle) {
    const message = {
        token: recruiterFcmToken,
        notification: {
            title: 'New Job Application',
            body: `${jobSeekerName} has applied for ${jobTitle}`,
        },
        data: {
            jobSeekerName: jobSeekerName,
            jobTitle: jobTitle,
        },
    };

    try {
        await admin.messaging().send(message);
        console.log('Notification sent successfully to recruiter');
    } catch (error) {
        console.error('Error sending notification to recruiter:', error);
        throw error; // Rethrow the error to be caught by the controller
    }
}

async function sendNotificationToJobSeeker(jobSeekerFcmToken, recruiterName, jobTitle) {
    const message = {
        token: jobSeekerFcmToken,
        notification: {
            title: 'Job Application Accepted',
            body: `Your application for ${jobTitle} has been accepted by ${recruiterName}`,
        },
        data: {
            recruiterName: recruiterName,
            jobTitle: jobTitle,
        },
    };

    try {
        await admin.messaging().send(message);
        console.log('Notification sent successfully to job seeker');
    } catch (error) {
        console.error('Error sending notification to job seeker:', error);
        throw error; // Rethrow the error to be caught by the controller
    }
}

module.exports = {
    sendNotificationToRecruiter,
    sendNotificationToJobSeeker,
};
