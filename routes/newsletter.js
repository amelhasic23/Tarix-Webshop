const express = require('express');
const router = express.Router();
const { run, get, all } = require('../database/db');
const { isAuthenticated } = require('../middleware/auth');

// Get all subscribers (admin)
router.get('/subscribers', isAuthenticated, async (req, res) => {
    try {
        const subscribers = await all('SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC');
        res.json(subscribers);
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        res.status(500).json({ error: 'Failed to fetch subscribers' });
    }
});

// Subscribe to newsletter (public endpoint)
router.post('/subscribe', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email || !email.includes('@')) {
            return res.status(400).json({ error: 'Valid email is required' });
        }

        // Check if already subscribed
        const existing = await get('SELECT * FROM newsletter_subscribers WHERE email = ?', [email]);
        if (existing) {
            return res.status(400).json({ error: 'Email already subscribed' });
        }

        await run('INSERT INTO newsletter_subscribers (email) VALUES (?)', [email]);
        res.json({ success: true, message: 'Successfully subscribed to newsletter' });
    } catch (error) {
        console.error('Error subscribing:', error);
        res.status(500).json({ error: 'Failed to subscribe' });
    }
});

// Give discount to subscriber
router.put('/:id/discount', isAuthenticated, async (req, res) => {
    try {
        const { discount_amount } = req.body;

        const subscriber = await get('SELECT * FROM newsletter_subscribers WHERE id = ?', [req.params.id]);
        if (!subscriber) {
            return res.status(404).json({ error: 'Subscriber not found' });
        }

        await run(
            'UPDATE newsletter_subscribers SET discount_given = 1, discount_amount = ? WHERE id = ?',
            [discount_amount, req.params.id]
        );

        // Here you could integrate email sending using emailjs or similar
        // For now, just update the database

        res.json({ success: true, message: 'Discount assigned successfully' });
    } catch (error) {
        console.error('Error assigning discount:', error);
        res.status(500).json({ error: 'Failed to assign discount' });
    }
});

// Delete subscriber
router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        await run('DELETE FROM newsletter_subscribers WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Subscriber removed' });
    } catch (error) {
        console.error('Error deleting subscriber:', error);
        res.status(500).json({ error: '  Failed to delete subscriber' });
    }
});

module.exports = router;
