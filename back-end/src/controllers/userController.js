const User = require('../models/userModel');

exports.getAllUsers = (req, res) => {
    User.getAll((err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
};