# Tarix WebShop - Admin Dashboard

## 🎉 Setup Complete!

Your admin dashboard has been successfully implemented and is now running!

---

## 🚀 Quick Start

### Start the Server

```bash
npm start
```

### Access Points

- **Main Website**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **Admin Dashboard**: http://localhost:3000/admin/dashboard (after login)

---

## 🔐 Default Admin Credentials

```
Username: admin
Password: admin123
```

**⚠️  IMPORTANT**: Change this password immediately after your first login!

---

## 📊 Admin Dashboard Features

### 1. **Dashboard Home**
- View statistics (total products, orders, subscribers, categories)
- See recent orders at a glance

### 2. **Banner Management**
- Add, edit, and delete banner slides
- Upload banner images
- Set subtitle, title, text, and price
- Activate/deactivate banners
- Reorder banners

### 3. **Category Management**
- Create and manage product categories
- Upload category icons
- View product count per category
- Delete categories (only if no products assigned)

### 4. **Product Management**
- Add new products with images
- Set product name, description, price, old price, discount
- Assign to categories
- Manage stock levels
- Mark products as "Featured" or "Best Seller"
- Edit and delete products

### 5. **Testimonials Management**
- Add customer testimonials
- Upload customer photos
- Set customer name, role, and rating
- Write testimonial text
- Activate/deactivate testimonials

### 6. **CTA Content**
- Edit Call-to-Action banner content
- Update heading, subheading, text, button text
- Upload background image

### 7. **Newsletter Subscribers**
- View all newsletter subscribers
- Give discounts to subscribers
- Delete subscribers
- Export subscriber list (coming soon)

### 8. **Order Management**
- View all orders
- Filter by status (Pending, Processing, Shipped, Delivered, Cancelled)
- View detailed order information
- Update order status
- See customer and billing details

---

## 🛠️ Technical Details

### Tech Stack

**Backend:**
- Node.js with Express
- SQLite database
- Session-based authentication
- Bcrypt password hashing
- Multer for file uploads

**Frontend:**
- Vanilla HTML/CSS/JavaScript
- Ion Icons
- Responsive design

### File Structure

```
Tarix-WebShop/
├── server.js                 # Main Express server
├── database/
│   ├── db.js                # Database connection
│   ├── schema.sql           # Database schema
│   ├── seed.js              # Seed script
│   └── tarix.db             # SQLite database file
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── banners.js           # Banner CRUD
│   ├── categories.js        # Category CRUD
│   ├── products.js          # Product CRUD
│   ├── testimonials.js      # Testimonials CRUD
│   ├── cta.js               # CTA content routes
│   ├── newsletter.js        # Newsletter routes
│   ├── orders.js            # Order management
│   └── public.js            # Public API for main site
├── middleware/
│   ├── auth.js              # Auth middleware
│   └── upload.js            # File upload config
├── admin/
│   ├── login.html           # Admin login page
│   ├── login.css            # Login styles
│   ├── login.js             # Login scripts
│   ├── dashboard.html       # Admin dashboard
│   ├── dashboard.css        # Dashboard styles
│   └── dashboard.js         # Dashboard scripts
├── Images/                  # Image storage
│   ├── banners/            # Banner images
│   ├── products/           # Product images
│   ├── testimonials/       # Testimonial images
│   ├── cta/                # CTA images
│   └── icons/              # Category icons
└── index.html              # Main website
```

---

## 📦 Available npm Scripts

```bash
# Start production server
npm start

# Start development server with auto-reload
npm run dev

# Seed database with initial data
npm run seed
```

---

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ Session-based authentication
- ✅ Protected API routes
- ✅ File upload validation
- ✅ SQL injection prevention
- ✅ XSS protection with Helmet.js
- ✅ Rate limiting on API endpoints

---

## 📸 Image Upload Guidelines

**Recommended Image Sizes:**
- Banners: 1920x800px or 16:9 ratio
- Products: 800x800px or 1:1 ratio
- Category Icons: 100x100px SVG or PNG
- Testimonials: 200x200px or 1:1 ratio
- CTA Banner: 1920x600px

**Accepted Formats:** JPG, PNG,GIF, WebP
**Max File Size:** 5MB

---

## 🎯 How to Use the Admin Dashboard

### Adding a New Product

1. Go to **Products** section
2. Click **"Add New Product"**
3. Fill in product details:
   - Name
   - Category
   - Price (in BAM)
   - Old Price (optional, for showing discounts)
   - Discount percentage
   - Description
   - Stock quantity
   - Upload product image
   - Check "Featured" or "Best Seller" if applicable
4. Click **"Save Product"**

### Managing Orders

1. Go to **Orders** section
2. Use the status filter to view orders by status
3. Click **"View"** to see order details
4. Click **"Update Status"** to change order status
5. Available statuses: Pending → Processing → Shipped → Delivered

### Adding Testimonials

1. Go to **Testimonials** section
2. Click **"Add New Testimonial"**
3. Enter customer name, role, testimonial text
4. Set rating (1-5 stars)
5. Upload customer photo (optional)
6. Click **"Save Testimonial"**

### Managing Newsletter Subscribers

1. Go to **Newsletter** section
2. View all subscribers with their subscription dates
3. Click **"Give Discount"** to assign a discount percentage
4. Click **"Delete"** to remove a subscriber

---

## 🔄 Updating the Main Site

The main website (`index.html`) currently uses hardcoded data. To make it dynamic and pull data from your admin dashboard:

### Option 1: Keep Current Structure (Recommended for now)
The current site works as-is. You can manually update content when needed.

### Option 2: Make It Fully Dynamic (Future Enhancement)
Update `index.js` to fetch data from the API endpoints:
- Fetch banners from `/api/public/banners`
- Fetch products from `/api/public/products`
- Fetch categories from `/api/public/categories`
- Fetch testimonials from `/api/public/testimonials`
- Fetch CTA from `/api/public/cta`

This is already set up in the backend - you just need to modify the frontend to use it!

---

## 🐛 Troubleshooting

### Server won't start?
```bash
# Make sure port 3000 is not in use
# Check if another process is using it
```

### Can't login to admin?
- Default credentials: admin / admin123
- If you changed the password and forgot it, re-run `npm run seed` to reset

### Images not uploading?
- Check file size (max 5MB)
- Verify file format (JPG, PNG, GIF, WebP only)
- Ensure Images folder has write permissions

### Database errors?
```bash
# Reset the database
rm database/tarix.db
npm run seed
```

---

## 📝 Important Notes

1. **Change the default admin password** after first login!
2. **Backup your database** regularly (`database/tarix.db`)
3. **Keep your `.env` file secure** and never commit it to git
4. **Test order management** thoroughly before going live
5. The session secret in `.env` should be changed for production

---

## 🎨 Customization

### Changing Colors
Edit `admin/dashboard.css` to customize the admin panel colors

### Adding New Admin Users
Currently supports one admin. To add multiple admins with different roles, you'll need to extend the `admins` table and add role-based permissions.

### Email Notifications
To send email notifications for orders:
1. Configure EmailJS in your account
2. Update the order creation endpoint to send emails
3. Add SMTP configuration for newsletter discount emails

---

## 🚀 Next Steps

1. **Test all features** in the admin dashboard
2. **Add some products** with real images
3. **Customize banners** for your brand
4. **Add testimonials** from your customers
5. **Set up newsletter** campaigns
6. **Test the order flow** end-to-end

---

## 📞 Support

If you encounter any issues or need help:
- Check the browser console for error messages
- Check the server terminal for backend errors
- Verify all images are in the correct folders
- Make sure all npm packages are installed

---

## 🎉 You're All Set!

Your admin dashboard is now ready to use. Start managing your e-commerce store with ease!

**Happy selling! 🛍️**
