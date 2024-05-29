const Fcm = require('../models/fcmModel'); 

exports.createFcmToken = async (req, res) => {
    try {
        const { user_id, fcmToken } = req.body;

        const newFcm = new Fcm({ user_id, fcmToken });
        const savedFcm = await newFcm.save();

        res.status(201).json(savedFcm);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllFcmTokens = async (req, res) => {
    try {
        const fcms = await Fcm.find().populate('user_id');
        res.status(200).json(fcms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getFcmTokenById = async (req, res) => {
    try {
        const { id } = req.params;
        const fcm = await Fcm.findById(id).populate('user_id');
        if (!fcm) return res.status(404).json({ message: 'FCM Token not found' });

        res.status(200).json(fcm);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getFcmTokensByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const fcmToken = await Fcm.find({ user_id: userId });
        if(fcmToken){
            return res.status(404).json({ message: 'FCM Token not found for this user' });
        }
        res.status(200).json(fcmToken);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateFcmTokenById = async (req, res) => {
    try {
        const { id } = req.params;
        const { fcmToken } = req.body;

        const updatedFcm = await Fcm.findByIdAndUpdate(id, { fcmToken }, { new: true });
        if (!updatedFcm) return res.status(404).json({ message: 'FCM Token not found' });

        res.status(200).json(updatedFcm);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteFcmTokenById = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedFcm = await Fcm.findByIdAndDelete(id);
        if (!deletedFcm) return res.status(404).json({ message: 'FCM Token not found' });

        res.status(200).json({ message: 'FCM Token deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
