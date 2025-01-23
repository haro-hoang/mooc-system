const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.login = (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email, async (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results === null || results.length === 0) return res.status(404).json({ error: 'User not found' });
        const user = results;
        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

        const token = jwt.sign({ 
            id: user.id,
            email: user.email,
            name: user.name,
            roles: user.roles
         },
         process.env.JWT_SECRET,
         { expiresIn: '24h' });
        res.json({ message: 'Login successful', token });
    });
};

exports.register = (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    User.create({ name, email, password: hashedPassword }, (err) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        res.status(201).json({ message: 'User registered successfully' });
    });
};

exports.logout = (req, res) => {
    res.json({ message: 'Logout successful' });
}; 