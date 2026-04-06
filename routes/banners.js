const express = require('express');
const router = express.Router();
const { run, get, all } = require('../database/db');
const { isAuthenticated } = require('../middleware/auth');
const upload = require('../middleware/upload');
const fs = require('fs');
const path = require('path');

// Get all banners (admin)
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const banners = await all('SELECT * FROM banners ORDER BY order_position ASC, id ASC');
        res.json(banners);
    } catch (error) {
        console.error('Error fetching banners:', error);
        res.status(500).json({ error: 'Failed to fetch banners' });
    }
});

// Get single banner
router.get('/:id', isAuthenticated, async (req, res) => {
    try {
        const banner = await get('SELECT * FROM banners WHERE id = ?', [req.params.id]);
        if (!banner) {
            return res.status(404).json({ error: 'Banner not found' });
        }
        res.json(banner);
    } catch (error) {
        console.error('Error fetching banner:', error);
        res.status(500).json({ error: 'Failed to fetch banner' });
    }
});

// Create new banner
router.post('/', isAuthenticated, upload.single('image'), async (req, res) => {
    try {
        const { subtitle, title, text, price, active, order_position } = req.body;

        if (!subtitle || !title) {
            return res.status(400).json({ error: 'Subtitle and title are required' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'Image is required' });
        }

        const image_path = `./${req.file.path.replace(/\\/g, '/')}`;

        const result = await run(
            'INSERT INTO banners (subtitle, title, text, price, image_path, active, order_position) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [subtitle, title, text, price, image_path, active || 1, order_position || 0]
        );

        const newBanner = await get('SELECT * FROM banners WHERE id = ?', [result.id]);
        res.status(201).json(newBanner);
    } catch (error) {
        console.error('Error creating banner:', error);
        res.status(500).json({ error: 'Failed to create banner' });
    }
});

// Update banner
router.put('/:id', isAuthenticated, upload.single('image'), async (req, res) => {
    try {
        const { subtitle, title, text, price, active, order_position } = req.body;
        const bannerId = req.params.id;

        const existingBanner = await get('SELECT * FROM banners WHERE id = ?', [bannerId]);
        if (!existingBanner) {
            return res.status(404).json({ error: 'Banner not found' });
        }

        let image_path = existingBanner.image_path;

        // If new image uploaded, delete old and update path
        if (req.file) {
            // Delete old image if it exists
            if (existingBanner.image_path && fs.existsSync(existingBanner.image_path)) {
                fs.unlinkSync(existingBanner.image_path);
            }
            image_path = `./${req.file.path.replace(/\\/g, '/')}`;
        }

        await run(
            'UPDATE banners SET subtitle = ?, title = ?, text = ?, price = ?, image_path = ?, active = ?, order_position = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [subtitle, title, text, price, image_path, active !== undefined ? active : existingBanner.active, order_position !== undefined ? order_position : existingBanner.order_position, bannerId]
        );

        const updatedBanner = await get('SELECT * FROM banners WHERE id = ?', [bannerId]);
        res.json(updatedBanner);
    } catch (error) {
        console.error('Error updating banner:', error);
        res.status(500).json({ error: 'Failed to update banner' });
    }
});

// Delete banner
router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        const banner = await get('SELECT * FROM banners WHERE id = ?', [req.params.id]);
        if (!banner) {
            return res.status(404).json({ error: 'Banner not found' });
        }

        // Delete image file
        if (banner.image_path && fs.existsSync(banner.image_path)) {
            fs.unlinkSync(banner.image_path);
        }

        await run('DELETE FROM banners WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Banner deleted successfully' });
    } catch (error) {
        console.error('Error deleting banner:', error);
        res.status(500).json({ error: 'Failed to delete banner' });
    }
});

// Reorder banner
router.put('/:id/reorder', isAuthenticated, async (req, res) => {
    try {
        const { order_position } = req.body;
        await run('UPDATE banners SET order_position = ? WHERE id = ?', [order_position, req.params.id]);
        res.json({ success: true });
    } catch (error) {
        console.error('Error reordering banner:', error);
        res.status(500).json({ error: 'Failed to reorder banner' });
    }
});

module.exports = router;
