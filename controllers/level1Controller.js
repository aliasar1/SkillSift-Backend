const asyncHandler = require('express-async-handler');
const Level1 = require('../models/level1Model');

exports.createLevel1 = asyncHandler(async (req, res) => {
    try {
        console.log(req.body.score);
        const score = parseFloat(req.body.score);
        console.log(score);
        const level1 = await Level1.create({ ...req.body, score });
        res.status(201).json(level1);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

exports.getLevel1ById = asyncHandler(async (req, res) => {
    try {
        const level1 = await Level1.findById(req.params.id);
        res.status(200).json(level1);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

exports.updateLevel1 = asyncHandler(async (req, res) => {
    try {
        const score = parseFloat(req.body.score);

        const level1 = await Level1.findByIdAndUpdate(req.params.id, { ...req.body, score }, { new: true });
        res.status(200).json(level1);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

exports.deleteLevel1 = asyncHandler(async (req, res) => {
    try {
        await Level1.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});