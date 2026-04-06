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
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js (for development dependencies only)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/amelhasic23/Tarix-Webshop.git
   cd Tarix-Webshop
   ```

2. **Install dependencies** (optional, for development tools)
   ```bash
   npm install
   ```

3. **Configure EmailJS** (for order confirmation emails)
   - Create a free account at [EmailJS](https://www.emailjs.com/)
   - Copy `.env.example` to `.env`
   - Add your EmailJS credentials:
     ```
     EMAILJS_SERVICE_ID=your_service_id
     EMAILJS_TEMPLATE_ID=your_template_id
     EMAILJS_PUBLIC_KEY=your_public_key
     ```

4. **Open in browser**
   - Simply open `index.html` in your browser
   - Or use a local server:
     ```bash
     npx serve
     ```

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
