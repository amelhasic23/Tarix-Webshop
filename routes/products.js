const express = require('express');
const router = express.Router();
const { run, get, all } = require('../database/db');
const { isAuthenticated } = require('../middleware/auth');
const upload = require('../middleware/upload');
const fs = require('fs');

// Get all products (with filters)
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const { category, best_seller, featured, search } = req.query;
        let query = 'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE 1=1';
        const params = [];

        if (category) {
            query += ' AND p.category_id = ?';
            params.push(category);
        }

        if (best_seller !== undefined) {
            query += ' AND p.best_seller = ?';
            params.push(best_seller);
        }

        if (featured !== undefined) {
            query += ' AND p.featured = ?';
            params.push(featured);
        }

        if (search) {
            query += ' AND (p.name LIKE ? OR p.description LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }

        query += ' ORDER BY p.id DESC';

        const products = await all(query, params);
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Get single product
router.get('/:id', isAuthenticated, async (req, res) => {
    try {
        const product = await get('SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = ?', [req.params.id]);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// Create product
router.post('/', isAuthenticated, upload.single('image'), async (req, res) => {
    try {
        const { name, category_id, price, old_price, discount_percentage, description, stock, featured, best_seller, rating } = req.body;

        if (!name || !price) {
            return res.status(400).json({ error: 'Name and price are required' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'Image is required' });
        }

        const image_path = `./${req.file.path.replace(/\\/g, '/')}`;

        const result = await run(
            'INSERT INTO products (name, category_id, price, old_price, discount_percentage, image_path, description, stock, featured, best_seller, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, category_id || null, price, old_price || null, discount_percentage || 0, image_path, description || '', stock || 0, featured || 0, best_seller || 0, rating || 5]
        );

        // Update category product count
        if (category_id) {
            await run('UPDATE categories SET product_count = product_count + 1 WHERE id = ?', [category_id]);
        }

        const newProduct = await get('SELECT * FROM products WHERE id = ?', [result.id]);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
});

// Update product
router.put('/:id', isAuthenticated, upload.single('image'), async (req, res) => {
    try {
        const { name, category_id, price, old_price, discount_percentage, description, stock, featured, best_seller, rating } = req.body;
        const productId = req.params.id;

        const existingProduct = await get('SELECT * FROM products WHERE id = ?', [productId]);
        if (!existingProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        let image_path = existingProduct.image_path;

        if (req.file) {
            if (existingProduct.image_path && fs.existsSync(existingProduct.image_path)) {
                try { fs.unlinkSync(existingProduct.image_path); } catch (e) { console.warn('Could not delete old image:', e.message); }
            }
            image_path = `./${req.file.path.replace(/\\/g, '/')}`;
        }

        // Update category counts if category changed
        if (category_id !== existingProduct.category_id) {
            if (existingProduct.category_id) {
                await run('UPDATE categories SET product_count = product_count - 1 WHERE id = ?', [existingProduct.category_id]);
            }
            if (category_id) {
                await run('UPDATE categories SET product_count = product_count + 1 WHERE id = ?', [category_id]);
            }
        }

        await run(
            'UPDATE products SET name = ?, category_id = ?, price = ?, old_price = ?, discount_percentage = ?, image_path = ?, description = ?, stock = ?, featured = ?, best_seller = ?, rating = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [name, category_id || null, price, old_price || null, discount_percentage || 0, image_path, description || '', stock || 0, featured || 0, best_seller || 0, rating || 5, productId]
        );

        const updatedProduct = await get('SELECT * FROM products WHERE id = ?', [productId]);
        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// Delete product
router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        const product = await get('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update category count
        if (product.category_id) {
            await run('UPDATE categories SET product_count = product_count - 1 WHERE id = ?', [product.category_id]);
        }

        // Delete image file
        if (product.image_path && fs.existsSync(product.image_path)) {
            try { fs.unlinkSync(product.image_path); } catch (e) { console.warn('Could not delete image:', e.message); }
        }

        await run('DELETE FROM products WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

// Toggle best seller
router.put('/:id/toggle-bestseller', isAuthenticated, async (req, res) => {
    try {
        const product = await get('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const newValue = product.best_seller === 1 ? 0 : 1;
        await run('UPDATE products SET best_seller = ? WHERE id = ?', [newValue, req.params.id]);
        res.json({ success: true, best_seller: newValue });
    } catch (error) {
        console.error('Error toggling bestseller:', error);
        res.status(500).json({ error: 'Failed to toggle bestseller' });
    }
});

// Toggle featured
router.put('/:id/toggle-featured', isAuthenticated, async (req, res) => {
    try {
        const product = await get('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const newValue = product.featured === 1 ? 0 : 1;
        await run('UPDATE products SET featured = ? WHERE id = ?', [newValue, req.params.id]);
        res.json({ success: true, featured: newValue });
    } catch (error) {
        console.error('Error toggling featured:', error);
        res.status(500).json({ error: 'Failed to toggle featured' });
    }
});

module.exports = router;
