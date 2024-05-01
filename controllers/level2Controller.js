const Level2 = require('../models/level2Model');

exports.addScore = async (req, res) => {
    try {
        const { application_id, score, status, qna_id } = req.body;
        const level2 = new Level2({ application_id, score, status, qna_id });
        await level2.save();
        res.status(201).json({ success: true, data: level2 });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getScoreByApplicationId = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const score = await Level2.findOne({ application_id: applicationId });
        if (!score) {
            return res.status(404).json({ success: false, message: 'Score not found' });
        }
        res.status(200).json({ success: true, data: score });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.checkIfApplicationIdExists = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const score = await Level2.findOne({ application_id: applicationId });
        if (score) {
            res.status(200).json({ success: true, exists: true });
        } else {
            res.status(200).json({ success: true, exists: false });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.updateStatusByApplicationId = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;
        const updatedScore = await Level2.findOneAndUpdate(
            { application_id: applicationId },
            { status: status },
            { new: true }
        );
        if (!updatedScore) {
            return res.status(404).json({ success: false, message: 'Score not found' });
        }
        res.status(200).json({ success: true, data: updatedScore });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
