const Attendance = require('../models/Attendance');

exports.markAttendance = async (req, res) => {
    const { status } = req.body;
    try {
        const attendance = new Attendance({
            employeeId: req.user.id,
            status
        });
        await attendance.save();
        res.json({ message: 'Attendance marked successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find({ employeeId: req.user.id }).sort({ date: -1 });
        res.json(attendance);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};