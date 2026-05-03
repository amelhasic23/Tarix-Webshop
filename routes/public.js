const express = require('express');
const router = express.Router();
const { all, get } = require('../database/db');

// Get active banners
router.get('/banners', async (req, res) => {
    try {
        const banners = await all('SELECT * FROM banners WHERE active = 1 ORDER BY order_position ASC, id ASC');
        res.json(banners);
    } catch (error) {
        console.error('Error fetching banners:', error);
        res.status(500).json({ error: 'Failed to fetch banners' });
    }
});

// Get all categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await all(
            `SELECT c.id, c.name, c.icon_path, c.parent_id, c.order_position, c.created_at,
                    COUNT(p.id) as product_count
             FROM categories c
             LEFT JOIN products p ON p.category_id = c.id
             GROUP BY c.id
             ORDER BY c.order_position ASC, c.id ASC`
        );
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// Get all products with optional filters
router.get('/products', async (req, res) => {
    try {
        const { category, featured, best_seller, limit } = req.query;
        let query = 'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE 1=1';
        const params = [];

        if (category) {
            query += ' AND (p.category_id = ? OR c.name LIKE ?)';
            params.push(category, `%${category}%`);
        }

        if (featured) {
            query += ' AND p.featured = ?';
            params.push(featured);
        }

        if (best_seller) {
            query += ' AND p.best_seller = ?';
            params.push(best_seller);
        }

        query += ' ORDER BY p.created_at DESC';

        if (limit) {
            query += ' LIMIT ?';
            params.push(parseInt(limit));
        }

        const products = await all(query, params);
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Get best-selling products
router.get('/bestsellers', async (req, res) => {
    try {
        const { limit } = req.query;
        let query = 'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.best_seller = 1 ORDER BY p.id DESC';

        if (limit) {
            query += ' LIMIT ?';
        }

        const products = limit ? await all(query, [parseInt(limit)]) : await all(query);
        res.json(products);
    } catch (error) {
        console.error('Error fetching bestsellers:', error);
        res.status(500).json({ error: 'Failed to fetch bestsellers' });
    }
});

// Get active testimonials
router.get('/testimonials', async (req, res) => {
    try {
        const testimonials = await all('SELECT * FROM testimonials WHERE active = 1 ORDER BY order_position ASC, id DESC');
        res.json(testimonials);
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        res.status(500).json({ error: 'Failed to fetch testimonials' });
    }
});

// Get active CTA content
router.get('/cta', async (req, res) => {
    try {
        const cta = await get('SELECT * FROM cta_content WHERE active = 1 LIMIT 1');
        res.json(cta || null);
    } catch (error) {
        console.error('Error fetching CTA:', error);
        res.status(500).json({ error: 'Failed to fetch CTA content' });
    }
});

module.exports = router;
