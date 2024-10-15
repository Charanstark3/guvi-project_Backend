const express = require('express');
const router = express.Router();
const { applyLeave, getLeaves } = require('../controllers/leaveController');
const auth = require('../middleware/authMiddleware');

router.post('/apply', auth, applyLeave);
router.get('/', auth, getLeaves);

module.exports = router;