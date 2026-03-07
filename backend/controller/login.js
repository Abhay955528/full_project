const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


function generateAccessToken(id, name) {
    return jwt.sign({ userId: id, name: name }, 'secretKey');
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to compare passwords' });
            }
            if (result) {
                const token = generateAccessToken(user.id, user.name);
                res.status(200).json({ message: 'Login successful', token });
            } else {
                res.status(401).json({ error: 'Invalid password' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
}


module.exports = {
    loginUser
}
