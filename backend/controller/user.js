const bcrypt = require('bcrypt');
const User = require('../models/user');


const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let solt = 10;
        bcrypt.hash(password, solt, async (err, hash) => {
            const response = await User.create({
                name, email, password: hash,
            });
            res.status(201).json({ message: 'User created successfully', user: response })
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
}

module.exports = {
    createUser,
}

