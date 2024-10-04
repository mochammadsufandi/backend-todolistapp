const express = require('express');
const router = express.Router();
const urgencyCategoryController = require('../controllers/urgencyCategoryController');
const activityCategoryController = require('../controllers/activityCategoryController');

// urgency category
router.get('/urgency', urgencyCategoryController.getAll);


// activity category
router.get('/activity', activityCategoryController.getAll);

module.exports = router;
