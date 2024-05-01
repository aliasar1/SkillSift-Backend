const express = require('express');
const router = express.Router();
const level2Controller = require('../controllers/level2Controller');

router.post('/', level2Controller.addScore);
router.get('/:applicationId', level2Controller.getScoreByApplicationId);
router.get('/exists/:applicationId', level2Controller.checkIfApplicationIdExists);
router.put('/:applicationId', level2Controller.updateStatusByApplicationId);

module.exports = router;
