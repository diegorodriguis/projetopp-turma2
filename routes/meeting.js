const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');

router.post('/', meetingController.scheduleMeeting);
router.get('/project/:projectId', meetingController.getMeetingsByProject);

module.exports = router;
