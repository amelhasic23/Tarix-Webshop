const bcrypt = require('bcrypt');
const { run, get } = require('./db');
require('dotenv').config();

async function seedDatabase() {
    try {
        console.log('🌱 Starting database seeding...\n');

        // 1. Create default admin user
        console.log('Creating admin user...');
        const adminUsername = process.env.DEFAULT_ADMIN_USERNAME || 'admin';
        const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'admin123';
        const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@tarix.com';

        const existingAdmin = await get('SELECT * FROM admins WHERE username = ?', [adminUsername]);

        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            await run(
                'INSERT INTO admins (username, password_hash, email) VALUES (?, ?, ?)',
                [adminUsername, hashedPassword, adminEmail]
            );
            console.log(`✅ Admin user created: ${adminUsername} / ${adminPassword}`);
        } else {
            console.log('⚠️  Admin user already exists, skipping...');
        }

        // 2. Seed categories
        console.log('\nCreating categories...');
        const categories = [
            { name: 'Dress & Frock', icon_path: './Images/icons/dress.svg', order_position: 1 },
            { name: 'Winter Wear', icon_path: './Images/icons/coat.svg', order_position: 2 },
            { name: 'Glasses & Lens', icon_path: './Images/icons/glasses.svg', order_position: 3 },
            { name: 'Shorts & Jeans', icon_path: './Images/icons/shorts.svg', order_position: 4 },
            { name: 'T-Shirts', icon_path: './Images/icons/tee.svg', order_position: 5 },
            { name: 'Hat & Caps', icon_path: './Images/icons/hat.svg', order_position: 6 },
            { name: 'Jackets', icon_path: './Images/icons/jacket.svg', order_position: 7 },
            { name: 'Watches', icon_path: './Images/icons/watch.svg', order_position: 8 },
            { name: 'Shoes', icon_path: './Images/icons/shoes.svg', order_position: 9 },
            { name: 'Jewelry', icon_path: './Images/icons/jewelry.svg', order_position: 10 }
        ];

        for (const cat of categories) {
            const existing = await get('SELECT * FROM categories WHERE name = ?', [cat.name]);
            if (!existing) {
                await run(
                    'INSERT INTO categories (name, icon_path, order_position, product_count) VALUES (?, ?, ?, ?)',
                    [cat.name, cat.icon_path, cat.order_position, 0]
                );
                console.log(`✅ Category created: ${cat.name}`);
            }
        }

        // 3. Seed banners
        console.log('\nCreating banners...');
        const banners = [
            {
                subtitle: 'Trending item',
                title: "Women's latest fashion sale",
                text: 'starting at',
                price: '$20.00',
                image_path: './Images/banner-1.jpg',
                order_position: 1,
                active: 1
            },
            {
                subtitle: 'Trending accessories',
                title: 'Modern sunglasses',
                text: 'starting at',
                price: '$15.00',
                image_path: './Images/banner-2.jpg',
                order_position: 2,
                active: 1
            },
            {
                subtitle: 'Sale Offer',
                title: 'New fashion summer sale',
                text: 'starting at',
                price: '$15.00',
                image_path: './Images/banner-3.jpg',
                order_position: 3,
                active: 1
            }
        ];

        for (const banner of banners) {
            const existing = await get('SELECT * FROM banners WHERE title = ?', [banner.title]);
            if (!existing) {
                await run(
                    'INSERT INTO banners (subtitle, title, text, price, image_path, order_position, active) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [banner.subtitle, banner.title, banner.text, banner.price, banner.image_path, banner.order_position, banner.active]
                );
                console.log(`✅ Banner created: ${banner.title}`);
            }
        }

        // 4. Seed sample products
        console.log('\nCreating sample products...');
// Get category IDs
        const dressCategory = await get('SELECT id FROM categories WHERE name = ?', ['Dress & Frock']);
        const jacketCategory = await get('SELECT id FROM categories WHERE name = ?', ['Jackets']);
        const shoesCategory = await get('SELECT id FROM categories WHERE name = ?', ['Shoes']);
        const watchCategory = await get('SELECT id FROM categories WHERE name = ?', ['Watches']);

        const products = [
            {
                name: 'Relaxed Short Full Sleeve T-Shirt',
                category_id: dressCategory?.id || null,
                price: 45.00,
                old_price: 55.00,
                discount_percentage: 18,
                image_path: './Images/products/clothes-1.jpg',
                description: 'Premium comfortable t-shirt',
                stock: 50,
                featured: 1,
                best_seller: 1,
                rating: 5
            },
            {
                name: 'Girls Pink Embro Design Top',
                category_id: dressCategory?.id || null,
                price: 61.00,
                old_price: 78.00,
                discount_percentage: 22,
                image_path: './Images/products/clothes-2.jpg',
                description: 'Beautiful embroidered top',
                stock: 30,
                featured: 0,
                best_seller: 1,
                rating: 5
            },
            {
                name: 'Black Floral Wrap Midi Skirt',
                category_id: dressCategory?.id || null,
                price: 76.00,
                old_price: 110.00,
                discount_percentage: 31,
                image_path: './Images/products/clothes-3.jpg',
                description: 'Elegant midi skirt',
                stock: 25,
                featured: 1,
                best_seller: 1,
                rating: 5
            },
            {
                name: 'Pure Garment Dyed Cotton Shirt',
                category_id: dressCategory?.id || null,
                price: 68.00,
                old_price: 88.00,
                discount_percentage: 23,
                image_path: './Images/products/clothes-4.jpg',
                description: 'Premium cotton shirt',
                stock: 40,
                featured: 0,
                best_seller: 0,
                rating: 5
            },
            {
                name: 'MEN Yarn Fleece Full-Zip Jacket',
                category_id: jacketCategory?.id || null,
                price: 155.00,
                old_price: 200.00,
                discount_percentage: 23,
                image_path: './Images/products/jacket-1.jpg',
                description: 'Warm and comfortable jacket',
                stock: 20,
                featured: 1,
                best_seller: 1,
                rating: 5
            },
            {
                name: 'Mens Winter Leathers Jackets',
                category_id: jacketCategory?.id || null,
                price: 325.00,
                old_price: 450.00,
                discount_percentage: 28,
                image_path: './Images/products/jacket-2.jpg',
                description: 'Premium leather jacket',
                stock: 15,
                featured: 0,
                best_seller: 0,
                rating: 5
            },
            {
                name: 'Running & Trekking Shoes',
                category_id: shoesCategory?.id || null,
                price: 58.00,
                old_price: 75.00,
                discount_percentage: 23,
                image_path: './Images/products/shoe-1.jpg',
                description: 'Comfortable sports shoes',
                stock: 60,
                featured: 1,
                best_seller: 1,
                rating: 5
            },
            {
                name: 'Pocket Watch Leather Pouch',
                category_id: watchCategory?.id || null,
                price: 120.00,
                old_price: 150.00,
                discount_percentage: 20,
                image_path: './Images/products/watch-1.jpg',
                description: 'Elegant pocket watch',
                stock: 25,
                featured: 0,
                best_seller: 1,
                rating: 5
            }
        ];

        for (const product of products) {
            const existing = await get('SELECT * FROM products WHERE name = ?', [product.name]);
            if (!existing) {
                await run(
                    'INSERT INTO products (name, category_id, price, old_price, discount_percentage, image_path, description, stock, featured, best_seller, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [product.name, product.category_id, product.price, product.old_price, product.discount_percentage, product.image_path, product.description, product.stock, product.featured, product.best_seller, product.rating]
                );
                console.log(`✅ Product created: ${product.name}`);

                // Update category product count
                if (product.category_id) {
                    await run('UPDATE categories SET product_count = product_count + 1 WHERE id = ?', [product.category_id]);
                }
            }
        }

        // 5. Seed testimonial
        console.log('\nCreating testimonials...');
        const testimonials = [
            {
                customer_name: 'Sarah Johnson',
                customer_role: 'Fashion Blogger',
                text: 'Amazing quality and fantastic customer service! I have been shopping here for years and they never disappoint. The products always exceed my expectations.',
                rating: 5,
                image_path: './Images/testimonial-1.jpg',
                active: 1,
                order_position: 1
            }
        ];

        for (const testimonial of testimonials) {
            const existing = await get('SELECT * FROM testimonials WHERE customer_name = ?', [testimonial.customer_name]);
            if (!existing) {
                await run(
                    'INSERT INTO testimonials (customer_name, customer_role, text, rating, image_path, active, order_position) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [testimonial.customer_name, testimonial.customer_role, testimonial.text, testimonial.rating, testimonial.image_path, testimonial.active, testimonial.order_position]
                );
                console.log(`✅ Testimonial created: ${testimonial.customer_name}`);
            }
        }

        // 6. Seed CTA Content
        console.log('\nCreating CTA content...');
        const existingCTA = await get('SELECT * FROM cta_content LIMIT 1');
        if (!existingCTA) {
            await run(
                'INSERT INTO cta_content (heading, subheading, text, button_text, image_path, active) VALUES (?, ?, ?, ?, ?, ?)',
                ['25% Discount', 'Summer Collection', 'Check out our amazing summer collection with exclusive discounts!', 'Shop Now', './Images/cta-banner.jpg', 1]
            );
            console.log('✅ CTA content created');
        }

        console.log('\n✅ Database seeding completed successfully!\n');
        console.log('🔐 Admin Credentials:');
        console.log(`   Username: ${adminUsername}`);
        console.log(`   Password: ${adminPassword}`);
        console.log(`\n⚠️  IMPORTANT: Change the admin password after first login!\n`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
