-- Admin Users Table
CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Banners Table
CREATE TABLE IF NOT EXISTS banners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subtitle TEXT NOT NULL,
    title TEXT NOT NULL,
    text TEXT,
    price TEXT,
    image_path TEXT NOT NULL,
    order_position INTEGER DEFAULT 0,
    active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    icon_path TEXT,
    product_count INTEGER DEFAULT 0,
    parent_id INTEGER,
    order_position INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category_id INTEGER,
    price REAL NOT NULL,
    old_price REAL,
    discount_percentage INTEGER DEFAULT 0,
    image_path TEXT NOT NULL,
    description TEXT,
    stock INTEGER DEFAULT 0,
    featured INTEGER DEFAULT 0,
    best_seller INTEGER DEFAULT 0,
    rating INTEGER DEFAULT 5,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_role TEXT,
    text TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    image_path TEXT,
    active INTEGER DEFAULT 1,
    order_position INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CTA Content Table
CREATE TABLE IF NOT EXISTS cta_content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    heading TEXT NOT NULL,
    subheading TEXT,
    text TEXT,
    button_text TEXT,
    image_path TEXT,
    active INTEGER DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    discount_given INTEGER DEFAULT 0,
    discount_amount INTEGER DEFAULT 0
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_number TEXT NOT NULL UNIQUE,
    customer_data TEXT NOT NULL,
    items TEXT NOT NULL,
    subtotal REAL NOT NULL,
    shipping REAL NOT NULL,
    tax REAL NOT NULL,
    total REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_best_seller ON products(best_seller);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
