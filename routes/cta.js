const express = require('express');
const router = express.Router();
const { run, get } = require('../database/db');
const { isAuthenticated } = require('../middleware/auth');
const upload = require('../middleware/upload');
const fs = require('fs');

// Get CTA content
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const cta = await get('SELECT * FROM cta_content WHERE active = 1 LIMIT 1');
        res.json(cta || {});
    } catch (error) {
        console.error('Error fetching CTA:', error);
        res.status(500).json({ error: 'Failed to fetch CTA content' });
    }
});

// Update CTA content
router.put('/', isAuthenticated, upload.single('image'), async (req, res) => {
    try {
        const { heading, subheading, text, button_text } = req.body;

        // Check if CTA already exists
        let cta = await get('SELECT * FROM cta_content WHERE active = 1 LIMIT 1');

        let image_path = cta ? cta.image_path : null;

        if (req.file) {
            // Delete old image if exists
            if (cta && cta.image_path && fs.existsSync(cta.image_path)) {
                fs.unlinkSync(cta.image_path);
            }
            image_path = `./${req.file.path.replace(/\\/g, '/')}`;
        }

        if (cta) {
            // Update existing
            await run(
                'UPDATE cta_content SET heading = ?, subheading = ?, text = ?, button_text = ?, image_path = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                [heading, subheading, text, button_text, image_path, cta.id]
            );
            cta = await get('SELECT * FROM cta_content WHERE id = ?', [cta.id]);
        } else {
            // Create new
            const result = await run(
                'INSERT INTO cta_content (heading, subheading, text, button_text, image_path, active) VALUES (?, ?, ?, ?, ?, ?)',
                [heading, subheading, text, button_text, image_path, 1]
            );
            cta = await get('SELECT * FROM cta_content WHERE id = ?', [result.id]);
        }

        res.json(cta);
    } catch (error) {
        console.error('Error updating CTA:', error);
        res.status(500).json({ error: 'Failed to update CTA content' });
    }
});

module.exports = router;
