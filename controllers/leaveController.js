const Leave = require('../models/Leave');

exports.applyLeave = async (req, res) => {
    const { leaveType, startDate, endDate } = req.body;
    try {
        const leave = new Leave({
            employeeId: req.user.id,
            leaveType,
            startDate,
            endDate,
            status: 'Pending'
        });
        await leave.save();
        res.json({ message: 'Leave application submitted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find({ employeeId: req.user.id }).sort({ appliedDate: -1 });
        res.json(leaves);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};