require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use('/api/', limiter);

// Strict rate limit for login
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts, please try again later'
});

// CORS
app.use(cors({
    origin: true,
    credentials: true
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-this',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// Prevent API response caching
app.use('/api', (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

// Serve static files
app.use(express.static(path.join(__dirname)));
app.use('/Images', express.static(path.join(__dirname, 'Images')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// Import routes
const authRoutes = require('./routes/auth');
const bannersRoutes = require('./routes/banners');
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const testimonialsRoutes = require('./routes/testimonials');
const ctaRoutes = require('./routes/cta');
const newsletterRoutes = require('./routes/newsletter');
const ordersRoutes = require('./routes/orders');
const publicRoutes = require('./routes/public');

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/banners', bannersRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/cta', ctaRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/public', publicRoutes);

// Apply login rate limiter
app.post('/api/auth/login', loginLimiter);

// Serve main site
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve admin login page
app.get('/admin/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin', 'login.html'));
});

// Serve admin dashboard
app.get('/admin/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin', 'dashboard.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🛒 Tarix WebShop Server Running`);
    console.log(`───────────────────────────────────`);
    console.log(`📍 Store:  http://localhost:${PORT}`);
    console.log(`🔐 Admin:  http://localhost:${PORT}/admin/login`);
    console.log(`───────────────────────────────────`);
    console.log(`⚙️  Environment: ${process.env.NODE_ENV || 'development'}\n`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down gracefully...');
    process.exit(0);
});
