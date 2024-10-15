const express = require('express');
const router = express.Router();
const { markAttendance, getAttendance } = require('../controllers/attendanceController');
const auth = require('../middleware/authMiddleware');

router.post('/mark', auth, markAttendance);
router.get('/', auth, getAttendance);

module.exports = router;