const express = require('express');
const users = require('../data/users');
const { hashPassword, comparePassword } = require('../utils/password');
const { generateToken } = require('../utils/jwt');
const ROLE_PERMISSIONS = require('../data/permissions');
const crypto = require('crypto');

const router = express.Router();

/**
 * Register (default role: USER)
 */
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);

    users.push({
        id: users.length + 1,
        email,
        password: hashedPassword,
        role: 'USER'
    });

    res.json({ message: 'User registered successfully' });
});

/**
 * Login
 */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const permissions = ROLE_PERMISSIONS[user.role] || [];

    const token = generateToken({
        id: user.id,
        role: user.role,
        email: user.email
    });

    res.json({ token, role: user.role, permissions });
});

/**
 * Forgot password (token based)
 */
router.post('/forgot-password', (req, res) => {
    const { email } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
        return res.json({ message: 'If user exists, reset token sent' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;

    // In real app → send email
    res.json({ resetToken: token });
});

/**
 * Reset password
 */
router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    const user = users.find(
        u => u.resetToken === token && u.resetTokenExpiry > Date.now()
    );

    if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.password = await hashPassword(newPassword);
    user.resetToken = null;
    user.resetTokenExpiry = null;

    res.json({ message: 'Password reset successful' });
});

module.exports = router;
