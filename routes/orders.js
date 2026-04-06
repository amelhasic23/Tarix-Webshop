const express = require('express');
const router = express.Router();
const { run, get, all } = require('../database/db');
const { isAuthenticated } = require('../middleware/auth');

// Get all orders (admin)
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const { status, from_date, to_date } = req.query;
        let query = 'SELECT * FROM orders WHERE 1=1';
        const params = [];

        if (status) {
            query += ' AND status = ?';
            params.push(status);
        }

        if (from_date) {
            query += ' AND created_at >= ?';
            params.push(from_date);
        }

        if (to_date) {
            query += ' AND created_at <= ?';
            params.push(to_date);
        }

        query += ' ORDER BY created_at DESC';

        const orders = await all(query, params);

        // Parse JSON fields
        const parsedOrders = orders.map(order => ({
            ...order,
            customer_data: JSON.parse(order.customer_data),
            items: JSON.parse(order.items)
        }));

        res.json(parsedOrders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// Get single order
router.get('/:id', isAuthenticated, async (req, res) => {
    try {
        const order = await get('SELECT * FROM orders WHERE id = ?', [req.params.id]);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const parsedOrder = {
            ...order,
            customer_data: JSON.parse(order.customer_data),
            items: JSON.parse(order.items)
        };

        res.json(parsedOrder);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
});

// Create order (public endpoint - from checkout)
router.post('/', async (req, res) => {
    try {
        const { customer, items, subtotal, shipping, tax, total } = req.body;

        if (!customer || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Invalid order data' });
        }

        const orderNumber = 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();

        const result = await run(
            'INSERT INTO orders (order_number, customer_data, items, subtotal, shipping, tax, total, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [orderNumber, JSON.stringify(customer), JSON.stringify(items), subtotal, shipping, tax, total, 'pending']
        );

        const newOrder = await get('SELECT * FROM orders WHERE id = ?', [result.id]);
        const parsedOrder = {
            ...newOrder,
            customer_data: JSON.parse(newOrder.customer_data),
            items: JSON.parse(newOrder.items)
        };

        res.status(201).json(parsedOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// Update order status
router.put('/:id/status', isAuthenticated, async (req, res) => {
    try {
        const { status } = req.body;

        const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const order = await get('SELECT * FROM orders WHERE id = ?', [req.params.id]);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        await run(
            'UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [status, req.params.id]
        );

        const updatedOrder = await get('SELECT * FROM orders WHERE id = ?', [req.params.id]);
        res.json({
            ...updatedOrder,
            customer_data: JSON.parse(updatedOrder.customer_data),
            items: JSON.parse(updatedOrder.items)
        });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Failed to update order status' });
    }
});

module.exports = router;
