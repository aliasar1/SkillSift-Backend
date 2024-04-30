const express = require('express');
const router = express.Router();
const level1Controller = require('../controllers/level1Controller');

router.post('/', level1Controller.createLevel1);
router.get('/:id', level1Controller.getLevel1ById);
router.get('/by-application-id/:applicationId', level1Controller.getLevel1ByApplicationId);
router.put('/:id', level1Controller.updateLevel1);
router.delete('/:id', level1Controller.deleteLevel1);

module.exports = router;
