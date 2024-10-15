const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET, JWT_EXPIRATION } = require('../config/jwtConfig');

exports.register = async (req, res) => {
    const { employeeName, employeeId, email, password, dateOfBirth } = req.body;

    try {
        let user = await User.findOne({ $or: [{ email }, { employeeId }] });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            employeeName,
            employeeId,
            email,
            password,
            dateOfBirth
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: JWT_EXPIRATION },
            (err, token) => {
                if (err) throw err;
                res.json({ token, employeeId: user.employeeId });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { employeeId, password } = req.body;

    try {
        let user = await User.findOne({ employeeId });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: JWT_EXPIRATION },
            (err, token) => {
                if (err) throw err;
                res.json({ token, employeeId: user.employeeId });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};