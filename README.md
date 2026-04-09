# Tarix WebShop 🛍️

A modern, multilingual e-commerce platform built with vanilla JavaScript, HTML, and CSS.

## 🌟 Features

### Core Functionality
- **Multilingual Support**: English, German (Deutsch), and Bosnian (Bosanski)
- **Shopping Cart**: Full cart management with localStorage persistence
- **Favorites/Wishlist**: Save products for later
- **User Authentication**: Secure registration and login system
- **Product Catalog**: Browse, filter, sort, and search products
- **Order Checkout**: Complete checkout process with EmailJS integration
- **Admin Dashboard**: Manage products, orders, banners, and more

### Security Features
- ✅ PBKDF2 password hashing with 100,000 iterations
- ✅ XSS protection with input sanitization
- ✅ URL validation and sanitization
- ✅ Secure session management

### Accessibility Features
- ✅ ARIA labels on all interactive elements
- ✅ Modal focus management and keyboard navigation
- ✅ Screen reader support
- ✅ Semantic HTML structure

### Performance Optimizations
- ✅ Image lazy loading and optimization
- ✅ Resource preloading for critical assets
- ✅ DNS prefetch for CDN resources
- ✅ Optimized critical rendering path
- ✅ Responsive images with proper sizing

### User Experience
- 🌙 Dark mode support
- 📱 Fully responsive design
- ⌨️ Keyboard shortcuts (ESC to close modals)
- ⏳ Loading states for async operations
- ✔️ Real-time form validation
- 📧 Email notifications for orders

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (required for backend server)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/amelhasic23/Tarix-Webshop.git
   cd Tarix-Webshop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Update the values:
     ```env
     NODE_ENV=production
     PORT=10000
     SESSION_SECRET=your-random-secret-key-here
     ```
   - Generate a secure SESSION_SECRET:
     ```bash
     node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
     ```

4. **Initialize the database**
   ```bash
   npm run seed
   ```
   This creates the SQLite database with an admin user and sample data.

   **Default admin credentials:**
   - Username: `admin`
   - Password: `admin123`

   ⚠️ **Change these immediately in production!**

5. **Start the server**
   ```bash
   npm start
   ```

6. **Access the application**
   - **Main Store**: http://localhost:10000
   - **Admin Dashboard**: http://localhost:10000/admin/login

⚠️ **IMPORTANT**: Do NOT open `index.html` directly in your browser (file:// protocol). The application requires the server to be running for API calls to work. If you see a red warning banner at the top of the page, it means you're accessing the site incorrectly.

## 📁 Project Structure

```
Tarix-WebShop/
├── index.html              # Main storefront page
├── index.css               # Main stylesheet
├── index.js                # Main JavaScript (cart, auth, products)
├── login.html              # Login/registration page
├── checkout.html           # Checkout page (legacy)
├── admin/                  # Admin dashboard
│   ├── dashboard.html
│   ├── dashboard.css
│   ├── dashboard.js
│   └── login.html
├── database/               # Database schema and seed data
├── routes/                 # API routes (for future backend)
├── middleware/             # Auth and upload middleware
├── Images/                 # Product images, banners, icons
│   ├── products/
│   ├── icons/
│   └── logo/
└── scripts/                # Build and localization scripts
```

## 🎨 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Icons**: [Ionicons](https://ionic.io/ionicons)
- **Fonts**: Google Fonts (Poppins)
- **Carousel**: [Swiper.js](https://swiperjs.com/)
- **Email**: [EmailJS](https://www.emailjs.com/)
- **Storage**: localStorage for cart, favorites, and user data

## 🔧 Development

### Available Scripts

```bash
# Install dependencies
npm install

# Start development server (if using Node.js backend)
npm start

# Run localization scripts
python auto-localize.py
python add-translations.py
```

### Code Quality
- Security fixes applied (see `ANALYSIS_REPORT.md`)
- Performance optimizations implemented
- Accessibility standards followed (WCAG 2.1)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🌐 Localization

The site supports three languages out of the box:
- **English** (en)
- **German** (de)
- **Bosnian** (bs)

See `LOCALIZATION-GUIDE.md` for adding more languages.

## 🛡️ Security

This project implements modern security best practices:
- Password hashing with PBKDF2 (100,000 iterations + random salt)
- XSS protection via input sanitization
- URL validation to prevent malicious redirects
- Secure session management
- No sensitive data in localStorage (passwords are hashed)

**Note**: This is a frontend-only demo. For production use, implement a proper backend with server-side validation and authentication.

## 🐛 Troubleshooting

### Changes in admin don't appear on main site

**Cause**: You're opening `index.html` directly via file:// instead of through the server.

**Solution**:
1. Make sure the server is running: `npm start`
2. Visit http://localhost:10000 (NOT file://...)
3. Check browser console for error messages
4. Look for the red warning banner at the top

### Admin login redirects immediately / Session expires

**Cause**: Session cookie configuration issues.

**Solution**:
- Ensure the server is running with `npm start`
- Check that `SESSION_SECRET` is set in `.env`
- Verify `database/sessions.sqlite` exists
- Clear browser cookies and try again

### API calls failing / "Is the server running?" warnings

**Cause**: Server is not running or not accessible.

**Solution**:
```bash
# Check if server is running
curl http://localhost:10000/api/public/products

# If no response, start the server
npm start
```

### Products with stock=0 not visible on main site

This is by design. Products with zero stock are now shown with "Out of Stock" labels (after recent fixes). If you still don't see them, clear your browser cache.

### GLIBC_2.38 errors / Native module issues

**Cause**: Native modules (sqlite3, bcrypt) compiled for newer systems than deployment environment.

**Solutions**:

**Option 1 - Use specific Node.js version:**
In Render environment variables, set:
```
NODE_VERSION=18.20.4
NPM_CONFIG_BUILD_FROM_SOURCE=true
```

**Option 2 - Use build script:**
In Render settings:
- **Build Command**: `bash build.sh`
- **Start Command**: `npm start`

**Option 3 - Force rebuild:**
Change Build Command to:
```bash
npm install && npm rebuild sqlite3 bcrypt && npm run seed
```

### Environment variable errors

Make sure you have a `.env` file in the root directory with all required variables:
```env
NODE_ENV=production
PORT=10000
SESSION_SECRET=your-secret-key-here
```

## 📄 Documentation

- `ADMIN-DASHBOARD-README.md` - Admin panel guide
- `LOCALIZATION-GUIDE.md` - Translation instructions
- `ANALYSIS_REPORT.md` - Security & performance audit

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Amel Hasic**
- GitHub: [@amelhasic23](https://github.com/amelhasic23)

## 🙏 Acknowledgments

- Product images from various sources
- Icons from Ionicons
- Fonts from Google Fonts
- Built with assistance from Claude Code

---

**⚠️ Disclaimer**: This is a demonstration project. For production use, implement proper backend authentication, payment processing, and database management.
