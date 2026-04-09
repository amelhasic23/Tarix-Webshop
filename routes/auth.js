const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { get, run } = require('../database/db');
const { isAuthenticated, isNotAuthenticated } = require('../middleware/auth');

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Get admin user
        const admin = await get('SELECT * FROM admins WHERE username = ?', [username]);

        if (!admin) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Verify password
        const isValid = await bcrypt.compare(password, admin.password_hash);

        if (!isValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Set session
        req.session.adminId = admin.id;
        req.session.username = admin.username;

        // Explicitly save session before responding
        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).json({ error: 'Could not create session' });
            }

            res.json({
                success: true,
                message: 'Login successful',
                admin: {
                    id: admin.id,
                    username: admin.username,
                    email: admin.email
                }
            });
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'An error occurred during login' });
    }
});

// Logout
router.post('/logout', isAuthenticated, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Could not log out' });
        }
        res.json({ success: true, message: 'Logged out successfully' });
    });
});

// Check auth status
router.get('/check', (req, res) => {
    console.log('[Auth Check] Session ID:', req.sessionID);
    console.log('[Auth Check] Session data:', req.session);
    console.log('[Auth Check] AdminId:', req.session?.adminId);

    if (req.session && req.session.adminId) {
        res.json({
            authenticated: true,
            admin: {
                id: req.session.adminId,
                username: req.session.username
            }
        });
    } else {
        res.json({ authenticated: false });
    }
});

module.exports = router;
