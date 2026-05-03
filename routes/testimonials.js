const express = require('express');
const router = express.Router();
const { run, get, all } = require('../database/db');
const { isAuthenticated } = require('../middleware/auth');
const upload = require('../middleware/upload');
const fs = require('fs');

// Get all testimonials
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const testimonials = await all('SELECT * FROM testimonials ORDER BY order_position ASC, id DESC');
        res.json(testimonials);
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
});

// Get single testimonial
router.get('/:id', isAuthenticated, async (req, res) => {
    try {
        const testimonial = await get('SELECT * FROM testimonials WHERE id = ?', [req.params.id]);
        if (!testimonial) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }
        res.json(testimonial);
    } catch (error) {
        console.error('Error fetching testimonial:', error);
        res.status(500).json({ error: 'Failed to fetch testimonial' });
    }
});

// Create testimonial
router.post('/', isAuthenticated, upload.single('image'), async (req, res) => {
    try {
        const { customer_name, customer_role, text, rating, active, order_position } = req.body;

        if (!customer_name || !text) {
            return res.status(400).json({ error: 'Customer name and text are required' });
        }

        let image_path = null;
        if (req.file) {
            image_path = `./${req.file.path.replace(/\\/g, '/')}`;
        }

        const result = await run(
            'INSERT INTO testimonials (customer_name, customer_role, text, rating, image_path, active, order_position) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [customer_name, customer_role || '', text, rating || 5, image_path, active || 1, order_position || 0]
        );

        const newTestimonial = await get('SELECT * FROM testimonials WHERE id = ?', [result.id]);
        res.status(201).json(newTestimonial);
    } catch (error) {
        console.error('Error creating testimonial:', error);
        res.status(500).json({ error: 'Failed to create testimonial' });
    }
});

// Update testimonial
router.put('/:id', isAuthenticated, upload.single('image'), async (req, res) => {
    try {
        const { customer_name, customer_role, text, rating, active, order_position } = req.body;
        const testimonialId = req.params.id;

        const existingTestimonial = await get('SELECT * FROM testimonials WHERE id = ?', [testimonialId]);
        if (!existingTestimonial) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }

        let image_path = existingTestimonial.image_path;

        if (req.file) {
            if (existingTestimonial.image_path && fs.existsSync(existingTestimonial.image_path)) {
                try { fs.unlinkSync(existingTestimonial.image_path); } catch (e) { console.warn('Could not delete old image:', e.message); }
            }
            image_path = `./${req.file.path.replace(/\\/g, '/')}`;
        }

        await run(
            'UPDATE testimonials SET customer_name = ?, customer_role = ?, text = ?, rating = ?, image_path = ?, active = ?, order_position = ? WHERE id = ?',
            [customer_name, customer_role || '', text, rating || 5, image_path, active !== undefined ? active : existingTestimonial.active, order_position !== undefined ? order_position : existingTestimonial.order_position, testimonialId]
        );

        const updatedTestimonial = await get('SELECT * FROM testimonials WHERE id = ?', [testimonialId]);
        res.json(updatedTestimonial);
    } catch (error) {
        console.error('Error updating testimonial:', error);
        res.status(500).json({ error: 'Failed to update testimonial' });
    }
});

// Delete testimonial
router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        const testimonial = await get('SELECT * FROM testimonials WHERE id = ?', [req.params.id]);
        if (!testimonial) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }

        if (testimonial.image_path && fs.existsSync(testimonial.image_path)) {
            try { fs.unlinkSync(testimonial.image_path); } catch (e) { console.warn('Could not delete image:', e.message); }
        }

        await run('DELETE FROM testimonials WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Testimonial deleted successfully' });
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        res.status(500).json({ error: 'Failed to delete testimonial' });
    }
});

// Toggle active status
router.put('/:id/toggle-active', isAuthenticated, async (req, res) => {
    try {
        const testimonial = await get('SELECT * FROM testimonials WHERE id = ?', [req.params.id]);
        if (!testimonial) {
            return res.status(404).json({ error: 'Testimonial not found' });
        }

        const newValue = testimonial.active === 1 ? 0 : 1;
        await run('UPDATE testimonials SET active = ? WHERE id = ?', [newValue, req.params.id]);
        res.json({ success: true, active: newValue });
    } catch (error) {
        console.error('Error toggling testimonial:', error);
        res.status(500).json({ error: 'Failed to toggle testimonial' });
    }
});

module.exports = router;
