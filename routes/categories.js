const express = require('express');
const router = express.Router();
const { run, get, all } = require('../database/db');
const { isAuthenticated } = require('../middleware/auth');
const upload = require('../middleware/upload');
const fs = require('fs');

// Get all categories
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const categories = await all('SELECT * FROM categories ORDER BY order_position ASC, id ASC');
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// Get single category
router.get('/:id', isAuthenticated, async (req, res) => {
    try {
        const category = await get('SELECT * FROM categories WHERE id = ?', [req.params.id]);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ error: 'Failed to fetch category' });
    }
});

// Create category
router.post('/', isAuthenticated, upload.single('icon'), async (req, res) => {
    try {
        const { name, parent_id, order_position } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Category name is required' });
        }

        let icon_path = null;
        if (req.file) {
            icon_path = `./${req.file.path.replace(/\\/g, '/')}`;
        }

        const result = await run(
            'INSERT INTO categories (name, icon_path, parent_id, order_position, product_count) VALUES (?, ?, ?, ?, ?)',
            [name, icon_path, parent_id || null, order_position || 0, 0]
        );

        const newCategory = await get('SELECT * FROM categories WHERE id = ?', [result.id]);
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Failed to create category' });
    }
});

// Update category
router.put('/:id', isAuthenticated, upload.single('icon'), async (req, res) => {
    try {
        const { name, parent_id, order_position } = req.body;
        const categoryId = req.params.id;

        const existingCategory = await get('SELECT * FROM categories WHERE id = ?', [categoryId]);
        if (!existingCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }

        let icon_path = existingCategory.icon_path;

        if (req.file) {
            if (existingCategory.icon_path && fs.existsSync(existingCategory.icon_path)) {
                fs.unlinkSync(existingCategory.icon_path);
            }
            icon_path = `./${req.file.path.replace(/\\/g, '/')}`;
        }

        await run(
            'UPDATE categories SET name = ?, icon_path = ?, parent_id = ?, order_position = ? WHERE id = ?',
            [name, icon_path, parent_id || null, order_position !== undefined ? order_position : existingCategory.order_position, categoryId]
        );

        const updatedCategory = await get('SELECT * FROM categories WHERE id = ?', [categoryId]);
        res.json(updatedCategory);
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Failed to update category' });
    }
});

// Delete category
router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        const category = await get('SELECT * FROM categories WHERE id = ?', [req.params.id]);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Reassign products to uncategorized (null) before deleting
        await run('UPDATE products SET category_id = NULL WHERE category_id = ?', [req.params.id]);

        // Delete icon file
        if (category.icon_path && fs.existsSync(category.icon_path)) {
            fs.unlinkSync(category.icon_path);
        }

        await run('DELETE FROM categories WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Failed to delete category' });
    }
});

// Reorder category
router.put('/:id/reorder', isAuthenticated, async (req, res) => {
    try {
        const { order_position } = req.body;
        await run('UPDATE categories SET order_position = ? WHERE id = ?', [order_position, req.params.id]);
        res.json({ success: true });
    } catch (error) {
        console.error('Error reordering category:', error);
        res.status(500).json({ error: 'Failed to reorder category' });
    }
});

module.exports = router;
