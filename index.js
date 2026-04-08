"use strict";

// ========================================
// XSS PROTECTION - SANITIZE HTML
// ========================================
function sanitizeHTML(str) {
    if (str === null || str === undefined) return '';
    const temp = document.createElement('div');
    temp.textContent = String(str);
    return temp.innerHTML;
}

// Sanitize URL for src/href attributes
function sanitizeURL(url) {
    if (!url) return '';
    const str = String(url);
    // Allow http, https, relative paths, and safe data URLs for images
    if (str.startsWith('http://') || str.startsWith('https://') ||
        str.startsWith('./') || str.startsWith('/') ||
        str.startsWith('data:image/')) {
        return str;
    }
    return '';
}

// ========================================
// DARK MODE TOGGLE
// ========================================
let isDarkMode = localStorage.getItem('darkMode') === 'true';

function initDarkMode() {
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    updateDarkModeToggle();
}

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
    updateDarkModeToggle();
}

function updateDarkModeToggle() {
    const toggleBtn = document.getElementById('darkModeToggle');
    if (toggleBtn) {
        const icon = toggleBtn.querySelector('ion-icon');
        if (icon) {
            icon.setAttribute('name', isDarkMode ? 'sunny-outline' : 'moon-outline');
        }
        toggleBtn.setAttribute('aria-pressed', isDarkMode);
    }
}

// Initialize dark mode immediately
initDarkMode();

// ========================================
// GLOBAL MODAL ESCAPE KEY HANDLER
// ========================================
function initGlobalModalEscapeHandler() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any active modal
            const cartModal = document.querySelector('.cart-modal.active');
            const favModal = document.querySelector('.favorites-modal.active');
            const checkoutModal = document.querySelector('.checkout-modal.active');
            const productModal = document.querySelector('.product-detail-modal.active');
            const newsletterModal = document.querySelector('[data-modal].active, [data-modal]:not(.closed)');

            if (cartModal) cartModal.classList.remove('active');
            if (favModal) favModal.classList.remove('active');
            if (checkoutModal) checkoutModal.classList.remove('active');
            if (productModal) productModal.remove();
            if (newsletterModal && !newsletterModal.classList.contains('closed')) {
                newsletterModal.classList.add('closed');
            }
        }
    });
}

// ========================================
// FORM VALIDATION UTILITIES
// ========================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    const re = /^[\d\s\-+()]{7,20}$/;
    return re.test(phone);
}

function showFieldError(input, message) {
    clearFieldError(input);
    input.classList.add('error');
    const errorEl = document.createElement('span');
    errorEl.className = 'field-error';
    errorEl.textContent = message;
    errorEl.setAttribute('role', 'alert');
    input.parentNode.appendChild(errorEl);
}

function clearFieldError(input) {
    input.classList.remove('error');
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) existingError.remove();
}

function clearAllFieldErrors(form) {
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    form.querySelectorAll('.field-error').forEach(el => el.remove());
}

// ========================================
// LOADING STATE UTILITIES
// ========================================
function setButtonLoading(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.dataset.originalText = button.innerHTML;
        button.innerHTML = '<span class="loading-spinner"></span> Loading...';
        button.classList.add('loading');
    } else {
        button.disabled = false;
        if (button.dataset.originalText) {
            button.innerHTML = button.dataset.originalText;
        }
        button.classList.remove('loading');
    }
}

// ========================================
// CSV EXPORT UTILITY (For Admin)
// ========================================
function exportToCSV(data, filename) {
    if (!data || data.length === 0) {
        showNotification('No data to export');
        return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row =>
            headers.map(header => {
                let cell = row[header];
                if (cell === null || cell === undefined) cell = '';
                if (typeof cell === 'object') cell = JSON.stringify(cell);
                // Escape quotes and wrap in quotes if contains comma
                cell = String(cell).replace(/"/g, '""');
                if (cell.includes(',') || cell.includes('"') || cell.includes('\n')) {
                    cell = `"${cell}"`;
                }
                return cell;
            }).join(',')
        )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename || 'export.csv';
    link.click();
    URL.revokeObjectURL(link.href);
}

// Make CSV export available globally
window.exportToCSV = exportToCSV;

// ========================================
// LOCALIZATION
// ========================================
const translations = {
    en: {
        // Navigation
        home: "Home",
        categories: "Categories",
        mensFashion: "Men's Fashion",
        womensFashion: "Women's Fashion",
        electronics: "Electronics",
        jewelry: "Jewelry",
        perfume: "Perfume",
        blog: "Blog",
        hotDeals: "Hot Deals",

        // Header
        freeShipping: "Free Shipping",
        freeShippingDesc: "This week on orders over 100 BAM.",
        searchProducts: "Search products...",

        // Product Categories
        shirt: "Shirt",
        shorts: "Shorts & Jeans",
        safetyShoes: "Safety Shoes",
        wallet: "Wallet",
        dress: "Dress",
        earrings: "Earrings",
        necklace: "Necklace",
        watch: "Watch",
        smartWatch: "Smart Watch",
        shirt: "Shirt",
        sports: "Sports",
        jacket: "Jacket",
        sunglasses: "Sunglasses",
        hat: "Hat & Caps",
        belt: "Belt",

        // Sections
        newProducts: "New Products",
        trendingProducts: "Trending",
        topRated: "Top Rated",
        dealOfTheDay: "Deal of the Day",
        bestSellers: "Best Sellers",

        // Product Actions
        addToCart: "Add to Cart",
        addToFavorites: "Add to Favorites",
        quickView: "Quick View",
        compare: "Compare",

        // Newsletter
        subscribeNewsletter: "Subscribe Newsletter",
        newsletterDesc: "Join the Tarix newsletter to get early access to new arrivals, exclusive discounts up to 30% off, and be the first to know about seasonal collections.",
        emailAddress: "Email Address",
        subscribe: "Subscribe",

        // Cart & Favorites
        cart: "Cart",
        favorites: "Favorites",
        continueToCheckout: "Continue to Checkout",
        viewAllFavorites: "View All Favorites",
        cartEmpty: "Your cart is empty",
        favoritesEmpty: "Your favorites list is empty",
        total: "Total",
        subtotal: "Subtotal",
        close: "Close",
        remove: "Remove",

        // Product Details
        productDescription: "Product Description",
        price: "Price",
        availability: "Availability",
        inStock: "In Stock",
        outOfStock: "Out of Stock",

        // Footer
        popularCategories: "Popular Categories",
        products: "Products",
        ourCompany: "Our Company",
        services: "Services",
        contact: "Contact",
        aboutUs: "About Us",
        delivery: "Delivery",
        payment: "Payment Method",
        returns: "Return Policy",
        termsConditions: "Terms & Conditions",
        privacyPolicy: "Privacy Policy",

        // Misc
        viewAll: "View All",
        shopNow: "Shop Now",
        learnMore: "Learn More",
        saleOff: "Sale",
        new: "New",
        bestseller: "Bestseller",

        // Checkout
        checkout: "Checkout",
        billingDetails: "Billing Details",
        firstName: "First Name",
        lastName: "Last Name",
        phone: "Phone Number",
        address: "Street Address",
        city: "City",
        zipCode: "ZIP Code",
        country: "Country",
        cardNumber: "Card Number",
        expiryDate: "Expiry Date",
        cvv: "CVV",
        orderSummary: "Order Summary",
        shipping: "Shipping",
        tax: "Tax",
        placeOrder: "Place Order",
        loadMore: "Load More Products",

        // Banners
        trendingItem: "Trending item",
        trendingAccessories: "Trending accessories",
        saleOffer: "Sale Offer",
        womensLatestFashionSale: "Women's latest fashion sale",
        modernSunglasses: "Modern sunglasses",
        newFashionSummerSale: "New fashion summer sale",
        startingAt: "starting at",

        // Browse Categories
        browseCategories: "Browse Categories",
        dressFrock: "Dress & frock",
        winterWear: "Winter wear",
        glassesLens: "Glasses & lens",
        shortsJeans: "Shorts & jeans",
        tShirts: "T-shirts",
        hatCaps: "Hat & caps",
        showAll: "Show all",

        // Deal of the Day
        addToCart: "Add to Cart",
        alreadySold: "Already sold:",
        available: "Available:",
        hurryUpOffer: "Hurry Up! Offer ends in:",
        days: "Days",
        hours: "Hours",
        minutes: "Min",
        seconds: "Sec",

        // Product Badges
        sale: "Sale",

        // Testimonials
        testimonials: "Testimonials",
        sarahJohnson: "Sarah Johnson",
        fashionBlogger: "Fashion Blogger",
        testimonialText: "Amazing quality and fantastic customer service! I've been shopping here for years and they never disappoint. The products always exceed my expectations.",

        // CTA Banner
        discountOffer: "25% Discount",
        summerCollection: "Summer Collection",

        // Services
        ourServices: "Our Services",
        worldwideDelivery: "Delivery across Bosnia and Herzegovina",
        nextDayDelivery: "Next Day Delivery",
        bestOnlineSupport: "Best Online Support",
        returnPolicy: "Return Policy",
        moneyBack: "30% Money Back",
        forOrdersOver: "For Orders Over",
        expressShippingAvailable: "Express Shipping Available",
        supportHours: "Hours: 8AM - 11PM",
        easyFreeReturn: "Easy & Free Return",

        // Brands
        trustedBrands: "Trusted Brands",
        brandsDescription: "We partner with the world's most loved brands",
        luxeFashion: "Luxe Fashion",
        ecoStyle: "EcoStyle",
        starWear: "StarWear",
        velocity: "Velocity",
        amore: "Amore",
        worldStyle: "WorldStyle",

        // Newsletter CTA
        subscribeGetDiscount: "Subscribe & Get 15% Off",
        newsletterCTA: "Join our newsletter for exclusive deals, new arrivals, and style tips delivered to your inbox.",
        enterEmail: "Enter your email address",

        // Footer Brand Directory
        brandDirectory: "Brand Directory",
        fashion: "Fashion",
        footwear: "Footwear",
        jewellery: "Jewellery",
        cosmetics: "Cosmetics",
        tshirt: "T-shirt",
        shirts: "Shirts",
        shortsJeans2: "Shorts & Jeans",
        dressFrock2: "Dress & Frock",
        innerwear: "Innerwear",
        hosiery: "Hosiery",
        sport: "Sport",
        formal: "Formal",
        boots: "Boots",
        casual: "Casual",
        cowboyShoes: "Cowboy Shoes",
        partyWearShoes: "Party Wear Shoes",
        branded: "Branded",
        coupleRings: "Couple Rings",
        pendants: "Pendants",
        crystal: "Crystal",
        bangles: "Bangles",
        bracelets: "Bracelets",
        shampoo: "Shampoo",
        bodywash: "Bodywash",
        facewash: "Facewash",
        makeupKit: "Makeup Kit",
        liner: "Liner",
        lipstick: "Lipstick",
        sunscreen: "Sunscreen",

        // Footer Links
        electronic: "Electronic",
        cosmetic: "Cosmetic",
        health: "Health",
        watches: "Watches",
        pricesDrop: "Prices Drop",
        bestSales: "Best Sales",
        contactUs: "Contact Us",
        sitemap: "Sitemap",
        legalNotice: "Legal Notice",
        securePayment: "Secure Payment",

        // Contact & Payment
        cashOnDelivery: "Cash on Delivery",
        cashOnDeliveryDesc: "Pay when you receive your package. No advance payment required.",
        followUs: "Follow Us",

        // Menu & Language
        menu: "Menu",
        language: "Language",
        english: "English",
        german: "Deutsch",
        bosnian: "Bosanski",

        // Copyright
        copyright: "Copyright © 2026 Tarix. All rights reserved.",
        adminPanel: "Admin Panel",

        // Auth & User
        login: "Login",
        register: "Register",
        logout: "Logout",
        nameAndSurname: "Name and Surname",
        email: "Email",
        password: "Password",
        typeOfPerson: "Type of Person",
        individual: "Fizičko Lice",
        company: "Firma",
        alreadyHaveAccount: "Already have an account?",
        dontHaveAccount: "Don't have an account?",
        signIn: "Sign In",
        signUp: "Sign Up",
        welcomeBack: "Welcome Back",
        createAccount: "Create Account",
        loginSuccess: "Login successful!",
        registerSuccess: "Registration successful!",
        pleaseLogin: "Please log in to continue",
        emailAlreadyRegistered: "Email already registered!",
        invalidEmailPassword: "Invalid email or password",
        loggedOut: "Logged out successfully",

        // Additional product categories
        coupleRings: "Couple Rings",
        clothesPerfume: "Clothes Perfume",
        deodorant: "Deodorant",
        flowerFragrance: "Flower Fragrance",
        airFreshener: "Air Freshener",
        clothes: "Clothes",
        mensFashion2: "Mens Fashion",
        winterWear2: "Winter Wear",
        jackets2: "Jackets",
        partyWear2: "Party Wear",
        boots2: "Boots",
        formal2: "Formal",
        jewellery2: "Jewellery",
        perfume2: "Perfume",
        watches2: "Watches",
        casual2: "Casual",
        skirt: "Skirt",

        // Filter & Sort
        filterBy: "Filter by:",
        sortBy2: "Sort by:",
        allCategories: "All Categories",
        jackets3: "Jackets",
        shirts2: "Shirts",
        dresses2: "Dresses",
        shorts3: "Shorts",
        shoes2: "Shoes",
        default: "Default",
        priceLowToHigh: "Price: Low to High",
        priceHighToLow: "Price: High to Low",
        nameAZ: "Name: A-Z",
        nameZA: "Name: Z-A",
        rating2: "Rating",
        productsText: "products",

        // Section titles
        newArrivals: "New Arrivals",
        brandsSubtitle: "We partner with the world's most loved brands",
        recentlyViewedProducts: "Recently Viewed Products",
        emptyRecentlyViewed2: "You haven't viewed any products yet",

        // Footer
        legal: "Legal",

        // Misc text
        hotOffers2: "Hot Offers",
        min2: "Min",
        sec2: "Sec",
    },
    de: {
        // Navigation
        home: "Startseite",
        categories: "Kategorien",
        mensFashion: "Herrenmode",
        womensFashion: "Damenmode",
        electronics: "Elektronik",
        jewelry: "Schmuck",
        perfume: "Parfüm",
        blog: "Blog",
        hotDeals: "Heiße Angebote",

        // Header
        freeShipping: "Kostenloser Versand",
        freeShippingDesc: "Diese Woche bei Bestellungen über 100 BAM.",
        searchProducts: "Produkte suchen...",

        // Product Categories
        shirt: "Hemd",
        shorts: "Shorts & Jeans",
        safetyShoes: "Sicherheitsschuhe",
        wallet: "Geldbörse",
        dress: "Kleid",
        earrings: "Ohrringe",
        necklace: "Halskette",
        watch: "Uhr",
        smartWatch: "Smartwatch",
        sports: "Sport",
        jacket: "Jacke",
        sunglasses: "Sonnenbrille",
        hat: "Hut & Mützen",
        belt: "Gürtel",

        // Sections
        newProducts: "Neue Produkte",
        trendingProducts: "Trendprodukte",
        topRated: "Bestbewertet",
        dealOfTheDay: "Angebot des Tages",
        bestSellers: "Bestseller",

        // Product Actions
        addToCart: "In den Warenkorb",
        addToFavorites: "Zu Favoriten",
        quickView: "Schnellansicht",
        compare: "Vergleichen",

        // Newsletter
        subscribeNewsletter: "Newsletter abonnieren",
        newsletterDesc: "Abonniere den Tarix Newsletter für frühzeitigen Zugang zu neuen Artikeln, exklusive Rabatte bis zu 30% und sei der Erste, der von saisonalen Kollektionen erfährt.",
        emailAddress: "E-Mail-Adresse",
        subscribe: "Abonnieren",

        // Cart & Favorites
        cart: "Warenkorb",
        favorites: "Favoriten",
        continueToCheckout: "Zur Kasse gehen",
        viewAllFavorites: "Alle Favoriten anzeigen",
        cartEmpty: "Ihr Warenkorb ist leer",
        favoritesEmpty: "Ihre Favoritenliste ist leer",
        total: "Gesamt",
        subtotal: "Zwischensumme",
        close: "Schließen",
        remove: "Entfernen",

        // Product Details
        productDescription: "Produktbeschreibung",
        price: "Preis",
        availability: "Verfügbarkeit",
        inStock: "Auf Lager",
        outOfStock: "Nicht verfügbar",

        // Footer
        popularCategories: "Beliebte Kategorien",
        products: "Produkte",
        ourCompany: "Unser Unternehmen",
        services: "Dienstleistungen",
        contact: "Kontakt",
        aboutUs: "Über uns",
        delivery: "Lieferung",
        payment: "Zahlungsmethode",
        returns: "Rückgaberecht",
        termsConditions: "AGB",
        privacyPolicy: "Datenschutz",

        // Misc
        viewAll: "Alle anzeigen",
        shopNow: "Jetzt einkaufen",
        learnMore: "Mehr erfahren",
        saleOff: "Sale",
        new: "Neu",
        bestseller: "Bestseller",

        // Checkout
        checkout: "Kasse",
        billingDetails: "Rechnungsdetails",
        firstName: "Vorname",
        lastName: "Nachname",
        phone: "Telefonnummer",
        address: "Straßenadresse",
        city: "Stadt",
        zipCode: "Postleitzahl",
        country: "Land",
        cardNumber: "Kartennummer",
        expiryDate: "Ablaufdatum",
        cvv: "CVV",
        orderSummary: "Bestellübersicht",
        shipping: "Versand",
        tax: "Steuer",
        placeOrder: "Bestellung aufgeben",
        loadMore: "Mehr Produkte laden",

        // Banners
        trendingItem: "Trendiger Artikel",
        trendingAccessories: "Trendige Accessoires",
        saleOffer: "Verkaufsangebot",
        womensLatestFashionSale: "Neueste Damenmode im Sale",
        modernSunglasses: "Moderne Sonnenbrillen",
        newFashionSummerSale: "Neuer Fashion Sommer Sale",
        startingAt: "ab",

        // Browse Categories
        browseCategories: "Kategorien durchsuchen",
        dressFrock: "Kleid & Frock",
        winterWear: "Winterbekleidung",
        glassesLens: "Brillen & Linsen",
        shortsJeans: "Shorts & Jeans",
        tShirts: "T-Shirts",
        hatCaps: "Hüte & Mützen",
        showAll: "Alle anzeigen",

        // Deal of the Day
        addToCart: "In den Warenkorb",
        alreadySold: "Bereits verkauft:",
        available: "Verfügbar:",
        hurryUpOffer: "Beeilen Sie sich! Angebot endet in:",
        days: "Tage",
        hours: "Stunden",
        minutes: "Min",
        seconds: "Sek",

        // Product Badges
        sale: "Sale",

        // Testimonials
        testimonials: "Erfahrungsberichte",
        sarahJohnson: "Sarah Johnson",
        fashionBlogger: "Mode-Bloggerin",
        testimonialText: "Erstaunliche Qualität und fantastischer Kundenservice! Ich kaufe seit Jahren hier ein und sie enttäuschen nie. Die Produkte übertreffen immer meine Erwartungen.",

        // CTA Banner
        discountOffer: "25% Rabatt",
        summerCollection: "Sommerkollektion",

        // Services
        ourServices: "Unsere Dienstleistungen",
        worldwideDelivery: "Lieferung in ganz Bosnien und Herzegowina",
        nextDayDelivery: "Lieferung am nächsten Tag",
        bestOnlineSupport: "Bester Online-Support",
        returnPolicy: "Rückgaberecht",
        moneyBack: "30% Geld zurück",
        forOrdersOver: "Für Bestellungen über",
        expressShippingAvailable: "Expressversand verfügbar",
        supportHours: "Öffnungszeiten: 8-23 Uhr",
        easyFreeReturn: "Einfache & kostenlose Rückgabe",

        // Brands
        trustedBrands: "Vertrauenswürdige Marken",
        brandsDescription: "Wir arbeiten mit den beliebtesten Marken der Welt zusammen",
        luxeFashion: "Luxe Fashion",
        ecoStyle: "EcoStyle",
        starWear: "StarWear",
        velocity: "Velocity",
        amore: "Amore",
        worldStyle: "WorldStyle",

        // Newsletter CTA
        subscribeGetDiscount: "Abonnieren & 15% Rabatt erhalten",
        newsletterCTA: "Abonnieren Sie unseren Newsletter für exklusive Angebote, Neuankömmlinge und Stylingtipps direkt in Ihren Posteingang.",
        enterEmail: "Geben Sie Ihre E-Mail-Adresse ein",

        // Footer Brand Directory
        brandDirectory: "Markenverzeichnis",
        fashion: "Mode",
        footwear: "Schuhe",
        jewellery: "Schmuck",
        cosmetics: "Kosmetik",
        tshirt: "T-Shirt",
        shirts: "Hemden",
        shortsJeans2: "Shorts & Jeans",
        dressFrock2: "Kleid & Frock",
        innerwear: "Unterwäsche",
        hosiery: "Strumpfwaren",
        sport: "Sport",
        formal: "Formell",
        boots: "Stiefel",
        casual: "Lässig",
        cowboyShoes: "Cowboyschuhe",
        partyWearShoes: "Partyschuhe",
        branded: "Marken",
        coupleRings: "Paarringe",
        pendants: "Anhänger",
        crystal: "Kristall",
        bangles: "Armreifen",
        bracelets: "Armbänder",
        shampoo: "Shampoo",
        bodywash: "Duschgel",
        facewash: "Gesichtswäsche",
        makeupKit: "Make-up-Set",
        liner: "Liner",
        lipstick: "Lippenstift",
        sunscreen: "Sonnencreme",

        // Footer Links
        electronic: "Elektronik",
        cosmetic: "Kosmetik",
        health: "Gesundheit",
        watches: "Uhren",
        pricesDrop: "Preissenkungen",
        bestSales: "Bestseller",
        contactUs: "Kontakt",
        sitemap: "Sitemap",
        legalNotice: "Impressum",
        securePayment: "Sichere Zahlung",

        // Contact & Payment
        cashOnDelivery: "Nachnahme",
        cashOnDeliveryDesc: "Bezahlen Sie bei Erhalt Ihres Pakets. Keine Vorauszahlung erforderlich.",
        followUs: "Folgen Sie uns",

        // Menu & Language
        menu: "Menü",
        language: "Sprache",
        english: "English",
        german: "Deutsch",
        bosnian: "Bosanski",

        // Copyright
        copyright: "Copyright © 2026 Tarix. Alle Rechte vorbehalten.",
        adminPanel: "Admin-Bereich",

        // Auth & User
        login: "Anmelden",
        register: "Registrieren",
        logout: "Abmelden",
        nameAndSurname: "Name und Nachname",
        email: "E-Mail",
        password: "Passwort",
        typeOfPerson: "Personentyp",
        individual: "Privatperson",
        company: "Firma",
        alreadyHaveAccount: "Haben Sie bereits ein Konto?",
        dontHaveAccount: "Sie haben noch kein Konto?",
        signIn: "Anmelden",
        signUp: "Registrieren",
        welcomeBack: "Willkommen zurück",
        createAccount: "Konto erstellen",
        loginSuccess: "Anmeldung erfolgreich!",
        registerSuccess: "Registrierung erfolgreich!",
        pleaseLogin: "Bitte melden Sie sich an, um fortzufahren",
        emailAlreadyRegistered: "E-Mail bereits registriert!",
        invalidEmailPassword: "Ungültige E-Mail oder Passwort",
        loggedOut: "Erfolgreich abgemeldet",

        // Additional product categories
        coupleRings: "Paarringe",
        clothesPerfume: "Kleidungsparfüm",
        deodorant: "Deodorant",
        flowerFragrance: "Blumenduft",
        airFreshener: "Lufterfrischer",
        clothes: "Kleidung",
        mensFashion2: "Herrenmode",
        winterWear2: "Winterkleidung",
        jackets2: "Jacken",
        partyWear2: "Partykleidung",
        boots2: "Stiefel",
        formal2: "Formell",
        jewellery2: "Schmuck",
        perfume2: "Parfüm",
        watches2: "Uhren",
        casual2: "Lässig",
        skirt: "Rock",

        // Filter & Sort
        filterBy: "Filtern nach:",
        sortBy2: "Sortieren nach:",
        allCategories: "Alle Kategorien",
        jackets3: "Jacken",
        shirts2: "Hemden",
        dresses2: "Kleider",
        shorts3: "Shorts",
        shoes2: "Schuhe",
        default: "Standard",
        priceLowToHigh: "Preis: Niedrig bis Hoch",
        priceHighToLow: "Preis: Hoch bis Niedrig",
        nameAZ: "Name: A-Z",
        nameZA: "Name: Z-A",
        rating2: "Bewertung",
        productsText: "Produkte",

        // Section titles
        newArrivals: "Neuankömmlinge",
        brandsSubtitle: "Wir arbeiten mit den beliebtesten Marken der Welt zusammen",
        recentlyViewedProducts: "Kürzlich angesehene Produkte",
        emptyRecentlyViewed2: "Sie haben noch keine Produkte angesehen",

        // Footer
        legal: "Rechtliches",

        // Misc text
        hotOffers2: "Heiße Angebote",
        min2: "Min",
        sec2: "Sek",
    },
    bs: {
        // Navigation
        home: "Početna",
        categories: "Kategorije",
        mensFashion: "Muška moda",
        womensFashion: "Ženska moda",
        electronics: "Elektronika",
        jewelry: "Nakit",
        perfume: "Parfem",
        blog: "Blog",
        hotDeals: "Vruće ponude",

        // Header
        freeShipping: "Besplatna dostava",
        freeShippingDesc: "Ove sedmice za narudžbe preko 100 BAM.",
        searchProducts: "Pretraži proizvode...",

        // Product Categories
        shirt: "Košulja",
        shorts: "Šorc & Farmerke",
        safetyShoes: "Radne cipele",
        wallet: "Novčanik",
        dress: "Haljina",
        earrings: "Naušnice",
        necklace: "Ogrlica",
        watch: "Sat",
        smartWatch: "Pametni sat",
        sports: "Sport",
        jacket: "Jakna",
        sunglasses: "Sunčane naočale",
        hat: "Šešir & Kape",
        belt: "Kaiš",

        // Sections
        newProducts: "Novi proizvodi",
        trendingProducts: "Popularno",
        topRated: "Najbolje ocijenjeno",
        dealOfTheDay: "Ponuda dana",
        bestSellers: "Najprodavanije",

        // Product Actions
        addToCart: "Dodaj u korpu",
        addToFavorites: "Dodaj u favorite",
        quickView: "Brzi pregled",
        compare: "Uporedi",

        // Newsletter
        subscribeNewsletter: "Pretplati se na Newsletter",
        newsletterDesc: "Pridruži se Tarix newsletteru za rani pristup novim artiklima, ekskluzivne popuste do 30% i budi prvi koji sazna za sezonske kolekcije.",
        emailAddress: "Email adresa",
        subscribe: "Pretplati se",

        // Cart & Favorites
        cart: "Korpa",
        favorites: "Favoriti",
        continueToCheckout: "Nastavi na naplatu",
        viewAllFavorites: "Vidi sve favorite",
        cartEmpty: "Vaša korpa je prazna",
        favoritesEmpty: "Vaša lista favorita je prazna",
        total: "Ukupno",
        subtotal: "Međuzbir",
        close: "Zatvori",
        remove: "Ukloni",

        // Product Details
        productDescription: "Opis proizvoda",
        price: "Cijena",
        availability: "Dostupnost",
        inStock: "Na stanju",
        outOfStock: "Rasprodato",

        // Footer
        popularCategories: "Popularne kategorije",
        products: "Proizvodi",
        ourCompany: "Naša kompanija",
        services: "Usluge",
        contact: "Kontakt",
        aboutUs: "O nama",
        delivery: "Dostava",
        payment: "Način plaćanja",
        returns: "Povrat robe",
        termsConditions: "Uslovi korištenja",
        privacyPolicy: "Politika privatnosti",

        // Misc
        viewAll: "Pogledaj sve",
        shopNow: "Kupi sada",
        learnMore: "Saznaj više",
        saleOff: "Rasprodaja",
        new: "Novo",
        bestseller: "Bestseller",

        // Checkout
        checkout: "Naplata",
        billingDetails: "Detalji naplate",
        firstName: "Ime",
        lastName: "Prezime",
        phone: "Broj telefona",
        address: "Adresa",
        city: "Grad",
        zipCode: "Poštanski broj",
        country: "Zemlja",
        cardNumber: "Broj kartice",
        expiryDate: "Datum isteka",
        cvv: "CVV",
        orderSummary: "Pregled narudžbe",
        shipping: "Dostava",
        tax: "Porez",
        placeOrder: "Naruči",
        loadMore: "Učitaj više proizvoda",

        // Banners
        trendingItem: "Trending artikal",
        trendingAccessories: "Trending dodaci",
        saleOffer: "Prodajna ponuda",
        womensLatestFashionSale: "Najnovija ženska moda na sniženju",
        modernSunglasses: "Moderne sunčane naočale",
        newFashionSummerSale: "Nova modna ljetnja rasprodaja",
        startingAt: "počevši od",

        // Browse Categories
        browseCategories: "Pregledaj kategorije",
        dressFrock: "Haljine",
        winterWear: "Zimska odjeća",
        glassesLens: "Naočale i leće",
        shortsJeans: "Šorcevi i traperice",
        tShirts: "Majice",
        hatCaps: "Šeširi i kape",
        showAll: "Prikaži sve",

        // Deal of the Day
        addToCart: "Dodaj u korpu",
        alreadySold: "Već prodano:",
        available: "Dostupno:",
        hurryUpOffer: "Požurite! Ponuda ističe za:",
        days: "Dana",
        hours: "Sati",
        minutes: "Min",
        seconds: "Sek",

        // Product Badges
        sale: "Rasprodaja",

        // Testimonials
        testimonials: "Recenzije",
        sarahJohnson: "Sarah Johnson",
        fashionBlogger: "Modni bloger",
        testimonialText: "Nevjerovatna kvaliteta i fantastična usluga! Kupujem ovdje već godinama i nikad me nisu razočarali. Proizvodi uvijek nadmaše moja očekivanja.",

        // CTA Banner
        discountOffer: "25% Popusta",
        summerCollection: "Ljetna kolekcija",

        // Services
        ourServices: "Naše usluge",
        worldwideDelivery: "Dostava širom Bosne i Hercegovine",
        nextDayDelivery: "Dostava sljedećeg dana",
        bestOnlineSupport: "Najbolja online podrška",
        returnPolicy: "Politika povrata",
        moneyBack: "30% povrat novca",
        forOrdersOver: "Za narudžbe preko",
        expressShippingAvailable: "Ekspresna dostava dostupna",
        supportHours: "Radno vrijeme: 8-23h",
        easyFreeReturn: "Lak i besplatan povrat",

        // Brands
        trustedBrands: "Pouzdani brendovi",
        brandsDescription: "Partnerstvo sa najvoljenijim brendovima svijeta",
        luxeFashion: "Luxe Fashion",
        ecoStyle: "EcoStyle",
        starWear: "StarWear",
        velocity: "Velocity",
        amore: "Amore",
        worldStyle: "WorldStyle",

        // Newsletter CTA
        subscribeGetDiscount: "Pretplatite se i dobijte 15% popusta",
        newsletterCTA: "Pridružite se našem newsletteru za ekskluzivne ponude, nove proizvode i savjete iz mode direktno u vaš inbox.",
        enterEmail: "Unesite vašu email adresu",

        // Footer Brand Directory
        brandDirectory: "Direktorij brendova",
        fashion: "Moda",
        footwear: "Obuća",
        jewellery: "Nakit",
        cosmetics: "Kozmetika",
        tshirt: "Majica",
        shirts: "Košulje",
        shortsJeans2: "Šorcevi i traperice",
        dressFrock2: "Haljine",
        innerwear: "Donje rublje",
        hosiery: "Čarape",
        sport: "Sport",
        formal: "Svečano",
        boots: "Čizme",
        casual: "Ležerno",
        cowboyShoes: "Kaubojske cipele",
        partyWearShoes: "Cipele za zabavu",
        branded: "Brendirano",
        coupleRings: "Prstenje za parove",
        pendants: "Privjesci",
        crystal: "Kristal",
        bangles: "Narukvice",
        bracelets: "Narukvice",
        shampoo: "Šampon",
        bodywash: "Gel za tuširanje",
        facewash: "Gel za pranje lica",
        makeupKit: "Set šminke",
        liner: "Ajlajner",
        lipstick: "Ruž",
        sunscreen: "Krema za sunčanje",

        // Footer Links
        electronic: "Elektronika",
        cosmetic: "Kozmetika",
        health: "Zdravlje",
        watches: "Satovi",
        pricesDrop: "Sniženja",
        bestSales: "Najbolja prodaja",
        contactUs: "Kontaktirajte nas",
        sitemap: "Mapa sajta",
        legalNotice: "Pravna obavijest",
        securePayment: "Sigurna uplata",

        // Contact & Payment
        cashOnDelivery: "Plaćanje pouzećem",
        cashOnDeliveryDesc: "Platite kada primite paket. Nije potrebna avansna uplata.",
        followUs: "Pratite nas",

        // Menu & Language
        menu: "Meni",
        language: "Jezik",
        english: "English",
        german: "Deutsch",
        bosnian: "Bosanski",

        // Copyright
        copyright: "Copyright © 2026 Tarix. Sva prava zadržana.",
        adminPanel: "Admin Panel",

        // Auth & User
        login: "Prijava",
        register: "Registracija",
        logout: "Odjava",
        nameAndSurname: "Ime i prezime",
        email: "Email",
        password: "Lozinka",
        typeOfPerson: "Tip osobe",
        individual: "Fizičko Lice",
        company: "Firma",
        alreadyHaveAccount: "Već imate nalog?",
        dontHaveAccount: "Nemate nalog?",
        signIn: "Prijavite se",
        signUp: "Registrujte se",
        welcomeBack: "Dobrodošli nazad",
        createAccount: "Napravite nalog",
        loginSuccess: "Prijava uspješna!",
        registerSuccess: "Registracija uspješna!",
        pleaseLogin: "Molimo prijavite se da nastavite",
        emailAlreadyRegistered: "Email već registrovan!",
        invalidEmailPassword: "Neispravna email adresa ili lozinka",
        loggedOut: "Uspješno ste se odjavili",

        // Additional product categories
        coupleRings: "Prstenje za parove",
        clothesPerfume: "Parfem za odjeću",
        deodorant: "Dezodorans",
        flowerFragrance: "Cvjetni miris",
        airFreshener: "Osvježivač zraka",
        clothes: "Odjeća",
        mensFashion2: "Muška moda",
        winterWear2: "Zimska odjeća",
        jackets2: "Jakne",
        partyWear2: "Odjeća za zabavu",
        boots2: "Čizme",
        formal2: "Svečano",
        jewellery2: "Nakit",
        perfume2: "Parfem",
        watches2: "Satovi",
        casual2: "Ležerno",
        skirt: "Suknja",

        // Filter & Sort
        filterBy: "Filtriraj po:",
        sortBy2: "Sortiraj po:",
        allCategories: "Sve kategorije",
        jackets3: "Jakne",
        shirts2: "Košulje",
        dresses2: "Haljine",
        shorts3: "Šorcevi",
        shoes2: "Cipele",
        default: "Podrazumevano",
        priceLowToHigh: "Cijena: Od niske prema visokoj",
        priceHighToLow: "Cijena: Od visoke prema niskoj",
        nameAZ: "Ime: A-Z",
        nameZA: "Ime: Z-A",
        rating2: "Ocjena",
        productsText: "proizvoda",

        // Section titles
        newArrivals: "Novi proizvodi",
        brandsSubtitle: "Partnerstvo sa najvoljenijim brendovima svijeta",
        recentlyViewedProducts: "Nedavno pregledani proizvodi",
        emptyRecentlyViewed2: "Još niste pregledali nijedan proizvod",

        // Footer
        legal: "Pravno",

        // Misc text
        hotOffers2: "Vruće ponude",
        min2: "Min",
        sec2: "Sek",
    }
};


let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

function translatePage(lang) {
    currentLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);

    const langData = translations[lang] || translations['en'];

    // Translate elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (langData[key]) {
            element.textContent = langData[key];
        }
    });

    // Translate placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (langData[key]) {
            element.placeholder = langData[key];
        }
    });
}

// Language selector
document.addEventListener('DOMContentLoaded', function() {
    console.log('Language system loaded');
    console.log('Current language:', currentLanguage);

    const languageSelector = document.querySelector('select[name="language"]');
    if (languageSelector) {
        languageSelector.value = currentLanguage;
        languageSelector.addEventListener('change', (e) => {
            console.log('Language changed to:', e.target.value);
            translatePage(e.target.value);
        });
    } else {
        console.warn('Language selector not found');
    }

    // Initialize with saved language
    translatePage(currentLanguage);
    console.log('Initial translation complete');
});

// ========================================
// BACK TO TOP BUTTON
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('backToTopBtn');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// ========================================
// CART & FAVORITES FUNCTIONALITY
// ========================================
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function updateCartCount() {
    const cartCount = document.querySelector('[data-cart-open] .count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function updateFavoritesCount() {
    const favCount = document.querySelector('[data-favorites-open] .count');
    if (favCount) {
        favCount.textContent = favorites.length;
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesCount();
}

function addToCart(product) {
    const existingItem = cart.find(item => item.title === product.title);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    showNotification(`${product.title} added to cart!`);
}

function addToFavorites(product) {
    const exists = favorites.find(item => item.title === product.title);
    if (!exists) {
        favorites.push(product);
        saveFavorites();
        showNotification(`${product.title} added to favorites!`);
    } else {
        showNotification(`${product.title} is already in favorites!`);
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCartModal();
}

function updateCartQuantity(index, change) {
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            removeFromCart(index);
        } else {
            saveCart();
            renderCartModal();
        }
    }
}


function removeFromFavorites(index) {
    favorites.splice(index, 1);
    saveFavorites();
    renderFavoritesModal();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff4757;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Initialize counts
updateCartCount();
updateFavoritesCount();

// ========================================
// PRODUCT MODAL
// ========================================
function createProductModal(product) {
    const existingModal = document.querySelector('.product-detail-modal');
    if (existingModal) existingModal.remove();

    // Sanitize all user-controlled data
    const safeTitle = sanitizeHTML(product.title);
    const safeCategory = sanitizeHTML(product.category);
    const safePrice = sanitizeHTML(product.price);
    const safeOldPrice = product.oldPrice ? sanitizeHTML(product.oldPrice) : null;
    const safeBadge = product.badge ? sanitizeHTML(product.badge) : null;
    const safeImage = sanitizeURL(product.image);
    // Rating contains ion-icon HTML from our own rendering, keep it
    const safeRating = product.rating || '';

    const modal = document.createElement('div');
    modal.className = 'product-detail-modal active';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', `Product details: ${safeTitle}`);
    modal.innerHTML = `
        <div class="product-modal-overlay"></div>
        <div class="product-modal-content">
            <button class="product-modal-close" aria-label="Close product modal">
                <ion-icon name="close-outline"></ion-icon>
            </button>
            <div class="product-modal-body">
                <div class="product-modal-images">
                    <img src="${safeImage}" alt="${safeTitle}" class="product-modal-main-img">
                </div>
                <div class="product-modal-info">
                    <span class="product-modal-category">${safeCategory}</span>
                    <h2 class="product-modal-title">${safeTitle}</h2>
                    <div class="product-modal-rating">
                        ${safeRating}
                    </div>
                    <div class="product-modal-price">
                        <span class="current-price">${safePrice}</span>
                        ${safeOldPrice ? `<del class="old-price">${safeOldPrice}</del>` : ''}
                        ${safeBadge ? `<span class="discount-badge">${safeBadge}</span>` : ''}
                    </div>
                    <div class="product-modal-description">
                        <h3>Product Description</h3>
                        <p>High-quality ${safeCategory.toLowerCase()} with premium materials and excellent craftsmanship. Perfect for everyday use and special occasions.</p>
                    </div>
                    <div class="product-modal-actions">
                        <button class="btn-modal-cart" data-action="add-cart">
                            <ion-icon name="bag-handle-outline"></ion-icon>
                            <span data-translate="addToCart">Add to Cart</span>
                        </button>
                        <button class="btn-modal-favorite" data-action="add-favorite">
                            <ion-icon name="heart-outline"></ion-icon>
                            <span data-translate="addToFavorites">Add to Favorites</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Use event listeners instead of inline onclick for security
    const cartBtn = modal.querySelector('[data-action="add-cart"]');
    const favBtn = modal.querySelector('[data-action="add-favorite"]');

    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            addToCart({ title: product.title, price: product.price, category: product.category, image: product.image });
        });
    }

    if (favBtn) {
        favBtn.addEventListener('click', () => {
            addToFavorites({ title: product.title, price: product.price, category: product.category, image: product.image });
        });
    }

    const closeBtn = modal.querySelector('.product-modal-close');
    const overlay = modal.querySelector('.product-modal-overlay');

    closeBtn.addEventListener('click', () => modal.remove());
    overlay.addEventListener('click', () => modal.remove());

    // Focus trap for accessibility
    closeBtn.focus();

    translatePage(currentLanguage);
}

window.addToCartFromModal = function(title, price, category, image) {
    addToCart({ title, price, category, image });
};

window.addToFavoritesFromModal = function(title, price, category, image) {
    addToFavorites({ title, price, category, image });
};

// ========================================
// CART & FAVORITES MODALS
// ========================================
function renderCartModal() {
    let existingModal = document.querySelector('.cart-modal');
    if (!existingModal) {
        existingModal = document.createElement('div');
        existingModal.className = 'cart-modal';
        document.body.appendChild(existingModal);
    }

    let total = 0;
    cart.forEach(item => {
        const price = parseFloat(String(item.price).replace('BAM', '').trim()) || 0;
        total += price * (item.quantity || 1);
    });

    existingModal.setAttribute('role', 'dialog');
    existingModal.setAttribute('aria-modal', 'true');
    existingModal.setAttribute('aria-label', 'Shopping Cart');

    existingModal.innerHTML = `
        <div class="cart-modal-overlay"></div>
        <div class="cart-modal-content">
            <div class="cart-modal-header">
                <h2 data-translate="cart">Cart</h2>
                <button class="cart-modal-close" aria-label="Close cart">
                    <ion-icon name="close-outline"></ion-icon>
                </button>
            </div>
            <div class="cart-modal-body">
                ${cart.length === 0 ? `<p class="empty-message" data-translate="cartEmpty">Your cart is empty</p>` : ''}
                ${cart.map((item, index) => {
                    const price = parseFloat(String(item.price).replace('BAM', '').trim()) || 0;
                    const safeTitle = sanitizeHTML(item.title);
                    const safeImage = sanitizeURL(item.image);
                    return `
                    <div class="cart-item">
                        <img src="${safeImage}" alt="${safeTitle}">
                        <div class="cart-item-info">
                            <h4>${safeTitle}</h4>
                            <p class="item-price">${price.toFixed(2)} BAM</p>
                            <div class="quantity-controls">
                                <button class="quantity-btn" data-action="decrease" data-index="${index}" aria-label="Decrease quantity">
                                    <ion-icon name="remove-outline"></ion-icon>
                                </button>
                                <span class="quantity" aria-label="Quantity: ${item.quantity}">${item.quantity}</span>
                                <button class="quantity-btn" data-action="increase" data-index="${index}" aria-label="Increase quantity">
                                    <ion-icon name="add-outline"></ion-icon>
                                </button>
                            </div>
                            <p class="item-subtotal">Subtotal: ${(price * item.quantity).toFixed(2)} BAM</p>
                        </div>
                        <button class="remove-btn" data-action="remove" data-index="${index}" aria-label="Remove ${safeTitle} from cart">
                            <ion-icon name="trash-outline"></ion-icon>
                        </button>
                    </div>
                `;}).join('')}
            </div>
            ${cart.length > 0 ? `
                <div class="cart-modal-footer">
                    <div class="cart-total">
                        <span data-translate="total">Total:</span>
                        <strong>${total.toFixed(2)} BAM</strong>
                    </div>
                    <button class="btn-checkout" data-translate="continueToCheckout">Continue to Checkout</button>
                </div>
            ` : ''}
        </div>
    `;

    existingModal.classList.add('active');

    // Use event delegation for cart actions
    existingModal.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        const action = btn.dataset.action;
        const index = parseInt(btn.dataset.index, 10);

        if (action === 'decrease') updateCartQuantity(index, -1);
        else if (action === 'increase') updateCartQuantity(index, 1);
        else if (action === 'remove') removeFromCart(index);
    });

    const closeBtn = existingModal.querySelector('.cart-modal-close');
    const overlay = existingModal.querySelector('.cart-modal-overlay');
    const checkoutBtn = existingModal.querySelector('.btn-checkout');

    closeBtn.addEventListener('click', () => existingModal.classList.remove('active'));
    overlay.addEventListener('click', () => existingModal.classList.remove('active'));
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            existingModal.classList.remove('active');
            renderCheckoutModal();
        });
    }

    // Focus first interactive element for accessibility
    closeBtn.focus();

    translatePage(currentLanguage);
}

function renderFavoritesModal() {
    let existingModal = document.querySelector('.favorites-modal');
    if (!existingModal) {
        existingModal = document.createElement('div');
        existingModal.className = 'favorites-modal';
        document.body.appendChild(existingModal);
    }

    existingModal.setAttribute('role', 'dialog');
    existingModal.setAttribute('aria-modal', 'true');
    existingModal.setAttribute('aria-label', 'Favorites');

    existingModal.innerHTML = `
        <div class="favorites-modal-overlay"></div>
        <div class="favorites-modal-content">
            <div class="favorites-modal-header">
                <h2 data-translate="favorites">Favorites</h2>
                <button class="favorites-modal-close" aria-label="Close favorites">
                    <ion-icon name="close-outline"></ion-icon>
                </button>
            </div>
            <div class="favorites-modal-body">
                ${favorites.length === 0 ? `<p class="empty-message" data-translate="favoritesEmpty">Your favorites list is empty</p>` : ''}
                ${favorites.map((item, index) => {
                    const price = parseFloat(String(item.price).replace('BAM', '').trim()) || 0;
                    const safeTitle = sanitizeHTML(item.title);
                    const safeImage = sanitizeURL(item.image);
                    return `
                    <div class="favorites-item">
                        <img src="${safeImage}" alt="${safeTitle}">
                        <div class="favorites-item-info">
                            <h4>${safeTitle}</h4>
                            <p>${price.toFixed(2)} BAM</p>
                        </div>
                        <button class="add-to-cart-btn" data-action="add-to-cart" data-index="${index}" aria-label="Add ${safeTitle} to cart">
                            <ion-icon name="bag-add-outline"></ion-icon>
                        </button>
                        <button class="remove-btn" data-action="remove" data-index="${index}" aria-label="Remove ${safeTitle} from favorites">
                            <ion-icon name="trash-outline"></ion-icon>
                        </button>
                    </div>
                `;}).join('')}
            </div>
        </div>
    `;

    existingModal.classList.add('active');

    // Use event delegation for favorites actions
    existingModal.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        const action = btn.dataset.action;
        const index = parseInt(btn.dataset.index, 10);

        if (action === 'add-to-cart') addToCartFromFavorites(index);
        else if (action === 'remove') removeFromFavorites(index);
    });

    const closeBtn = existingModal.querySelector('.favorites-modal-close');
    const overlay = existingModal.querySelector('.favorites-modal-overlay');

    closeBtn.addEventListener('click', () => existingModal.classList.remove('active'));
    overlay.addEventListener('click', () => existingModal.classList.remove('active'));

    // Focus first interactive element for accessibility
    closeBtn.focus();

    translatePage(currentLanguage);
}

// ========================================
// CHECKOUT MODAL
// ========================================
function renderCheckoutModal() {
    let existingModal = document.querySelector('.checkout-modal');
    if (!existingModal) {
        existingModal = document.createElement('div');
        existingModal.className = 'checkout-modal';
        document.body.appendChild(existingModal);
    }

    // Calculate totals
    let subtotal = 0;
    cart.forEach(item => {
        const price = parseFloat(String(item.price).replace('BAM', '').trim()) || 0;
        subtotal += price * (item.quantity || 1);
    });

    const shipping = 9.00; // Fixed shipping in BAM
    const tax = subtotal * 0.17; // 17% tax
    const total = subtotal + shipping + tax;

    existingModal.setAttribute('role', 'dialog');
    existingModal.setAttribute('aria-modal', 'true');
    existingModal.setAttribute('aria-label', 'Checkout');

    existingModal.innerHTML = `
        <div class="checkout-modal-overlay"></div>
        <div class="checkout-modal-content">
            <div class="checkout-modal-header">
                <h2 data-translate="checkout">Checkout</h2>
                <button class="checkout-modal-close" aria-label="Close checkout">
                    <ion-icon name="close-outline"></ion-icon>
                </button>
            </div>
            <div class="checkout-modal-body">
                <form id="checkoutForm" class="checkout-form" novalidate>
                    <div class="form-section">
                        <h3 data-translate="billingDetails">Billing Details</h3>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="checkout-firstName" data-translate="firstName">First Name</label>
                                <input type="text" id="checkout-firstName" name="firstName" required minlength="2" autocomplete="given-name">
                            </div>
                            <div class="form-group">
                                <label for="checkout-lastName" data-translate="lastName">Last Name</label>
                                <input type="text" id="checkout-lastName" name="lastName" required minlength="2" autocomplete="family-name">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="checkout-email" data-translate="email">Email</label>
                            <input type="email" id="checkout-email" name="email" required autocomplete="email">
                        </div>
                        <div class="form-group">
                            <label for="checkout-phone" data-translate="phone">Phone Number</label>
                            <input type="tel" id="checkout-phone" name="phone" required autocomplete="tel">
                        </div>
                        <div class="form-group">
                            <label for="checkout-address" data-translate="address">Street Address</label>
                            <input type="text" id="checkout-address" name="address" required minlength="5" autocomplete="street-address">
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="checkout-city" data-translate="city">City</label>
                                <input type="text" id="checkout-city" name="city" required minlength="2" autocomplete="address-level2">
                            </div>
                            <div class="form-group">
                                <label for="checkout-zipCode" data-translate="zipCode">ZIP Code</label>
                                <input type="text" id="checkout-zipCode" name="zipCode" required pattern="[0-9]{5}" autocomplete="postal-code">
                            </div>
                        </div>
                        <div class="form-group checkbox-group">
                            <input type="checkbox" id="checkout-terms" name="terms" required>
                            <label for="checkout-terms">I agree to the Terms & Conditions</label>
                        </div>
                    </div>

                    <div class="form-section order-summary">
                        <h3 data-translate="orderSummary">Order Summary</h3>
                        <div class="summary-items">
                            ${cart.map(item => {
                                const price = parseFloat(String(item.price).replace('BAM', '').trim()) || 0;
                                const safeTitle = sanitizeHTML(item.title);
                                return `
                                    <div class="summary-item">
                                        <span>${safeTitle} x ${item.quantity}</span>
                                        <span>${(price * item.quantity).toFixed(2)} BAM</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                        <div class="summary-totals">
                            <div class="summary-row">
                                <span data-translate="subtotal">Subtotal:</span>
                                <span>${subtotal.toFixed(2)} BAM</span>
                            </div>
                            <div class="summary-row">
                                <span data-translate="shipping">Shipping:</span>
                                <span>${shipping.toFixed(2)} BAM</span>
                            </div>
                            <div class="summary-row">
                                <span data-translate="tax">Tax (17%):</span>
                                <span>${tax.toFixed(2)} BAM</span>
                            </div>
                            <div class="summary-row total-row">
                                <strong data-translate="total">Total:</strong>
                                <strong>${total.toFixed(2)} BAM</strong>
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="btn-place-order" data-translate="placeOrder">Place Order</button>
                </form>
            </div>
        </div>
    `;

    existingModal.classList.add('active');

    const closeBtn = existingModal.querySelector('.checkout-modal-close');
    const overlay = existingModal.querySelector('.checkout-modal-overlay');
    const form = existingModal.querySelector('#checkoutForm');

    // Use { once: true } to auto-remove listeners after first use
    closeBtn.addEventListener('click', () => existingModal.classList.remove('active'), { once: true });
    overlay.addEventListener('click', () => existingModal.classList.remove('active'), { once: true });

    // Use event delegation instead of adding listeners to each input
    form.addEventListener('blur', (e) => {
        if (e.target.tagName === 'INPUT') {
            validateCheckoutField(e.target);
        }
    }, true);

    form.addEventListener('input', (e) => {
        if (e.target.tagName === 'INPUT') {
            clearFieldError(e.target);
        }
    }, true);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        clearAllFieldErrors(form);

        const firstName = form.querySelector('[name="firstName"]');
        const lastName = form.querySelector('[name="lastName"]');
        const email = form.querySelector('[name="email"]');
        const phone = form.querySelector('[name="phone"]');
        const address = form.querySelector('[name="address"]');
        const city = form.querySelector('[name="city"]');
        const zipCode = form.querySelector('[name="zipCode"]');
        const terms = form.querySelector('[name="terms"]');

        if (!firstName.value.trim() || firstName.value.trim().length < 2) {
            showFieldError(firstName, 'First name must be at least 2 characters');
            isValid = false;
        }
        if (!lastName.value.trim() || lastName.value.trim().length < 2) {
            showFieldError(lastName, 'Last name must be at least 2 characters');
            isValid = false;
        }
        if (!validateEmail(email.value)) {
            showFieldError(email, 'Please enter a valid email address');
            isValid = false;
        }
        if (!validatePhone(phone.value)) {
            showFieldError(phone, 'Please enter a valid phone number');
            isValid = false;
        }
        if (!address.value.trim() || address.value.trim().length < 5) {
            showFieldError(address, 'Please enter a valid address');
            isValid = false;
        }
        if (!city.value.trim() || city.value.trim().length < 2) {
            showFieldError(city, 'Please enter a valid city');
            isValid = false;
        }
        if (!zipCode.value.trim() || !/^\d{5}$/.test(zipCode.value.trim())) {
            showFieldError(zipCode, 'ZIP code must be 5 digits');
            isValid = false;
        }
        if (!terms.checked) {
            showFieldError(terms, 'You must agree to the Terms & Conditions');
            isValid = false;
        }

        if (!isValid) {
            // Focus first error field
            const firstError = form.querySelector('.error');
            if (firstError) firstError.focus();
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('.btn-place-order');
        setButtonLoading(submitBtn, true);

        const formData = new FormData(form);
        const orderData = {
            orderNumber: 'ORD-' + Date.now(),
            customer: {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: formData.get('address'),
                city: formData.get('city'),
                zipCode: formData.get('zipCode')
            },
            items: cart,
            subtotal: subtotal.toFixed(2),
            shipping: shipping.toFixed(2),
            tax: tax.toFixed(2),
            total: total.toFixed(2),
            date: new Date().toLocaleString()
        };

        // Save order to localStorage for admin panel
        const orders = JSON.parse(localStorage.getItem('tarix_orders') || '[]');
        orders.push({
            id: Date.now(),
            order_number: orderData.orderNumber,
            customer_data: orderData.customer,
            items: orderData.items,
            subtotal: orderData.subtotal,
            shipping: orderData.shipping,
            tax: orderData.tax,
            total: orderData.total,
            status: 'pending',
            created_at: new Date().toISOString()
        });
        localStorage.setItem('tarix_orders', JSON.stringify(orders));

        // Send email using EmailJS (wrapped in try-catch so order still completes)
        try {
            await sendOrderEmail(orderData);
        } catch (emailError) {
            console.warn('Email notification failed, but order was placed:', emailError);
        }

        setButtonLoading(submitBtn, false);

        // Show success notification
        showNotification(`Order ${sanitizeHTML(orderData.orderNumber)} placed successfully! Check your email for confirmation.`);

        // Clear cart
        cart = [];
        saveCart();
        updateCartCount();

        // Close modal
        existingModal.classList.remove('active');
    });

    // Focus first input for accessibility
    const firstInput = form.querySelector('input');
    if (firstInput) firstInput.focus();

    translatePage(currentLanguage);
}

// Validate individual checkout field
function validateCheckoutField(input) {
    clearFieldError(input);
    const name = input.name;
    const value = input.value.trim();

    switch (name) {
        case 'firstName':
        case 'lastName':
            if (value.length < 2) {
                showFieldError(input, `${name === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`);
            }
            break;
        case 'email':
            if (!validateEmail(value)) {
                showFieldError(input, 'Please enter a valid email address');
            }
            break;
        case 'phone':
            if (!validatePhone(value)) {
                showFieldError(input, 'Please enter a valid phone number');
            }
            break;
        case 'address':
            if (value.length < 5) {
                showFieldError(input, 'Please enter a valid address');
            }
            break;
        case 'city':
            if (value.length < 2) {
                showFieldError(input, 'Please enter a valid city');
            }
            break;
        case 'zipCode':
            if (!/^\d{5}$/.test(value)) {
                showFieldError(input, 'ZIP code must be 5 digits');
            }
            break;
    }
}

// Email sending function (using EmailJS)
async function sendOrderEmail(orderData) {
    try {
        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS is not loaded. Please check the script tag in index.html');
            return Promise.reject(new Error('EmailJS not loaded'));
        }

        console.log('Sending order confirmation email...');
        console.log('To:', orderData.customer.email);

        // Prepare email template parameters
        const templateParams = {
            to_email: orderData.customer.email,
            customer_name: `${orderData.customer.firstName} ${orderData.customer.lastName}`,
            order_number: orderData.orderNumber,
            order_date: orderData.date,
            customer_address: `${orderData.customer.address}, ${orderData.customer.city} ${orderData.customer.zipCode}`,
            customer_phone: orderData.customer.phone,
            order_items: orderData.items.map(item =>
                `${item.title} (x${item.quantity}) - ${(parseFloat(item.price.replace('BAM', '').trim()) * item.quantity).toFixed(2)} BAM`
            ).join(', '),
            subtotal: orderData.subtotal + ' BAM',
            shipping: orderData.shipping + ' BAM',
            tax: orderData.tax + ' BAM',
            total: orderData.total + ' BAM'
        };

        console.log('Email parameters:', templateParams);

        // Send email using EmailJS
        const response = await emailjs.send(
            'service_7ebbrkb',      // Service ID
            'template_fjhmoum',      // Template ID
            templateParams
        );

        console.log('Order confirmation email sent successfully!', response);
        return Promise.resolve(response);
    } catch (error) {
        console.error('Error sending order confirmation email:', error);
        console.error('Error details:', {
            message: error.message || error.text || 'Unknown error',
            status: error.status,
            text: error.text
        });
        // Don't throw error to prevent order from failing
        return Promise.reject(error);
    }
}

window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.removeFromFavorites = removeFromFavorites;
window.addToCartFromFavorites = function(index) {
    addToCart(favorites[index]);
};

// Cart and Favorites open buttons - use querySelectorAll to support multiple buttons
document.querySelectorAll('[data-cart-open]').forEach(btn => {
    btn.addEventListener('click', renderCartModal);
});

document.querySelectorAll('[data-favorites-open]').forEach(btn => {
    btn.addEventListener('click', renderFavoritesModal);
});

// ========================================
// DEAL OF THE DAY - ADD TO CART
// ========================================
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-cart-btn')) {
        const btn = e.target;
        const product = {
            title: btn.dataset.productTitle,
            price: btn.dataset.productPrice,
            oldPrice: btn.dataset.productOldPrice || null,
            image: btn.dataset.productImage
        };

        if (product.title && product.price && product.image) {
            addToCart(product);
        }
    }
});

// ========================================
// PRODUCT ACTION BUTTONS
// ========================================
document.addEventListener('click', function(e) {
    const showcase = e.target.closest('.showcase');
    if (!showcase) return;

    const btnAction = e.target.closest('.btn-action');
    if (!btnAction) return;

    const icon = btnAction.querySelector('ion-icon');
    if (!icon) return;

    const product = {
        title: showcase.querySelector('.showcase-title')?.textContent || 'Unknown',
        price: showcase.querySelector('.price')?.textContent || '$0.00',
        category: showcase.querySelector('.showcase-category')?.textContent || 'General',
        image: showcase.querySelector('.product-img.default')?.src || '',
        oldPrice: showcase.querySelector('del')?.textContent || '',
        badge: showcase.querySelector('.showcase-badge')?.textContent || '',
        rating: showcase.querySelector('.showcase-rating')?.innerHTML || ''
    };

    const iconName = icon.getAttribute('name');

    if (iconName === 'heart-outline') {
        addToFavorites(product);
        icon.setAttribute('name', 'heart');
        setTimeout(() => icon.setAttribute('name', 'heart-outline'), 1000);
    } else if (iconName === 'bag-add-outline') {
        addToCart(product);
    } else if (iconName === 'eye-outline') {
        createProductModal(product);
    }
});

// ========================================
// NEWSLETTER & EXISTING MODALS
// ========================================
const modal = document.querySelector("[data-modal]");
const modalCloseBtn = document.querySelector("[data-button-close]");
const modalCloseOverlay = document.querySelector("[data-modal-overlay]");

const closeModal = function () {
    if (modal) modal.classList.remove("active");
};

if (modalCloseOverlay) modalCloseOverlay.addEventListener("click", closeModal);
if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);

// Close modal with Escape key
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && modal && modal.classList.contains("active")) {
        closeModal();
    }
});

// Newsletter form handler
const newsletterForm = document.querySelector("[data-modal] form");
if (newsletterForm) {
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const submitBtn = newsletterForm.querySelector('button[type="submit"]');

    // Real-time validation on input
    if (emailInput) {
        emailInput.addEventListener('input', () => clearFieldError(emailInput));
        emailInput.addEventListener('blur', () => {
            if (emailInput.value && !validateEmail(emailInput.value)) {
                showFieldError(emailInput, 'Please enter a valid email address');
            }
        });
    }

    newsletterForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        clearAllFieldErrors(this);

        if (!emailInput || !emailInput.value.trim()) {
            showFieldError(emailInput, 'Please enter your email address');
            return;
        }

        if (!validateEmail(emailInput.value)) {
            showFieldError(emailInput, 'Please enter a valid email address');
            return;
        }

        // Check for duplicate subscription
        const existingSubscribers = JSON.parse(localStorage.getItem('tarix_newsletter') || '[]');
        const alreadySubscribed = existingSubscribers.some(s => s.email.toLowerCase() === emailInput.value.toLowerCase());
        if (alreadySubscribed) {
            showFieldError(emailInput, 'This email is already subscribed');
            return;
        }

        // Show loading state
        if (submitBtn) setButtonLoading(submitBtn, true);

        // Simulate network delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));

        // Save to localStorage for admin panel
        const newSubscriber = {
            id: Date.now(),
            email: emailInput.value.trim(),
            subscribed_at: new Date().toISOString(),
            discount_given: false,
            discount_amount: 0
        };
        existingSubscribers.push(newSubscriber);
        localStorage.setItem('tarix_newsletter', JSON.stringify(existingSubscribers));

        if (submitBtn) setButtonLoading(submitBtn, false);

        showNotification(translations[currentLanguage]?.subscribeSuccess || 'Successfully subscribed! Check your email for 15% discount code.');
        emailInput.value = '';
        closeModal();
    });
}

// ========================================
// INLINE NEWSLETTER FORM HANDLER
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const inlineNewsletterForm = document.querySelector('.newsletter-section .newsletter-form');
    const inlineNewsletterInput = document.querySelector('.newsletter-section .newsletter-input');

    if (inlineNewsletterForm && inlineNewsletterInput) {
        console.log('[Main] Inline newsletter form found, attaching handler');

        inlineNewsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('[Main] Newsletter form submitted');

            const email = inlineNewsletterInput.value.trim();

            if (!email) {
                showNotification(translations[currentLanguage]?.enterEmail || 'Please enter your email address', 'error');
                return;
            }

            if (!validateEmail(email)) {
                showNotification(translations[currentLanguage]?.invalidEmail || 'Please enter a valid email address', 'error');
                return;
            }

            // Check for duplicates
            const subscribers = JSON.parse(localStorage.getItem('tarix_newsletter') || '[]');
            if (subscribers.some(s => s.email.toLowerCase() === email.toLowerCase())) {
                showNotification(translations[currentLanguage]?.alreadySubscribed || 'This email is already subscribed', 'error');
                return;
            }

            // Save new subscriber
            subscribers.push({
                id: Date.now(),
                email: email,
                subscribed_at: new Date().toISOString(),
                discount_given: false,
                discount_amount: 0
            });
            localStorage.setItem('tarix_newsletter', JSON.stringify(subscribers));
            console.log('[Main] Newsletter subscriber saved:', email);

            inlineNewsletterInput.value = '';
            showNotification(translations[currentLanguage]?.subscribeSuccess || 'Successfully subscribed! Check your email for 15% discount code.', 'success');
        });
    } else {
        console.log('[Main] Inline newsletter form not found');
    }
});

const notificationToast = document.querySelector("[data-toast]");
const toastCloseBtn = document.querySelector("[data-toast-close]");

if (toastCloseBtn && notificationToast) {
    toastCloseBtn.addEventListener("click", function () {
        notificationToast.classList.add("closed");
    });
}

const mobileMenuOpenBtn = document.querySelectorAll("[data-mobile-menu-open-btn]");
const mobileMenu = document.querySelectorAll("[data-mobile-menu]");
const mobileMenuCloseBtn = document.querySelectorAll("[data-mobile-menu-close-btn]");
const overlay = document.querySelector("[data-overlay]");

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {
    const openBtn = mobileMenuOpenBtn[i];
    const closeBtn = mobileMenuCloseBtn[i];
    const menu = mobileMenu[i];

    const mobileMenuCloseFunc = function () {
        if (menu) menu.classList.remove("active");
        if (overlay) {
            overlay.classList.remove("active");
            overlay.classList.add("hidden");
        }
        document.body.classList.remove("menu-open");
    };

    if (openBtn) {
        openBtn.addEventListener("click", function () {
            if (menu) menu.classList.add("active");
            if (overlay) {
                overlay.classList.add("active");
                overlay.classList.remove("hidden");
            }
            document.body.classList.add("menu-open");
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", mobileMenuCloseFunc);
    }
}

if (overlay) {
    overlay.addEventListener("click", function () {
        mobileMenu.forEach(function (m) {
            if (m) m.classList.remove("active");
        });
        overlay.classList.remove("active");
        overlay.classList.add("hidden");
        document.body.classList.remove("menu-open");
    });
}

const accordionBtn = document.querySelectorAll("[data-accordion-btn]");
const accordionContent = document.querySelectorAll("[data-accordion-content]");

for (let i = 0; i < accordionBtn.length; i++) {
    accordionBtn[i].addEventListener("click", function () {
        const isActive = this.classList.contains("active");

        // Close all accordions
        for (let j = 0; j < accordionBtn.length; j++) {
            accordionBtn[j].classList.remove("active");
            if (accordionContent[j]) accordionContent[j].classList.remove("active");
        }

        if (!isActive) {
            this.classList.add("active");
            if (this.nextElementSibling) this.nextElementSibling.classList.add("active");
        }
    });
}

// ========================================
// USER AUTHENTICATION
// ========================================
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Hash password using Web Crypto API with PBKDF2 and salt for better security
async function hashPassword(password, salt = null) {
    const encoder = new TextEncoder();

    // Generate random salt if not provided (for new registrations)
    if (!salt) {
        const saltBuffer = crypto.getRandomValues(new Uint8Array(16));
        salt = Array.from(saltBuffer).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // Import password as key material
    const passwordKey = await crypto.subtle.importKey(
        'raw',
        encoder.encode(password),
        { name: 'PBKDF2' },
        false,
        ['deriveBits']
    );

    // Derive key using PBKDF2
    const saltBuffer = new Uint8Array(salt.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const hashBuffer = await crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            salt: saltBuffer,
            iterations: 100000, // 100k iterations for good security
            hash: 'SHA-256'
        },
        passwordKey,
        256 // 256 bits
    );

    const hash = Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

    return { hash, salt };
}

async function registerUser(userData) {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(u => u.email === userData.email)) {
        showNotification(translations[currentLanguage].emailAlreadyRegistered || 'Email already registered!');
        return false;
    }

    const { hash, salt } = await hashPassword(userData.password);
    // Store user with hashed password and salt
    const userToStore = {
        ...userData,
        password: hash,
        salt: salt
    };
    users.push(userToStore);
    localStorage.setItem('users', JSON.stringify(users));

    // Store session WITHOUT password and salt
    const { password: _pw, salt: _s, ...safeUser } = userToStore;
    currentUser = safeUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    showNotification(translations[currentLanguage].registerSuccess || 'Registration successful!');
    return true;
}

async function loginUser(email, password) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email);

    if (!user) {
        showNotification(translations[currentLanguage].invalidEmailPassword || 'Invalid email or password');
        return false;
    }

    // Check if user has old SHA-256 hash (no salt) - migrate to PBKDF2
    if (!user.salt) {
        // Old user with SHA-256 - verify old way first
        const oldHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
        const oldHashHex = Array.from(new Uint8Array(oldHash))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');

        if (user.password === oldHashHex) {
            // Migrate to new PBKDF2 hash
            const { hash, salt } = await hashPassword(password);
            user.password = hash;
            user.salt = salt;
            localStorage.setItem('users', JSON.stringify(users));

            // Store session WITHOUT password and salt
            const { password: _pw, salt: _s, ...safeUser } = user;
            currentUser = safeUser;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            showNotification(translations[currentLanguage].loginSuccess || 'Login successful! (Password upgraded)');
            return true;
        } else {
            showNotification(translations[currentLanguage].invalidEmailPassword || 'Invalid email or password');
            return false;
        }
    }

    // New user with PBKDF2 and salt
    const { hash } = await hashPassword(password, user.salt);

    if (user.password === hash) {
        // Store session WITHOUT password and salt
        const { password: _pw, salt: _s, ...safeUser } = user;
        currentUser = safeUser;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showNotification(translations[currentLanguage].loginSuccess || 'Login successful!');
        return true;
    }

    showNotification(translations[currentLanguage].invalidEmailPassword || 'Invalid email or password');
    return false;
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    renderUserDropdown();
    showNotification(translations[currentLanguage].loggedOut || 'Logged out successfully');
    // Close dropdown after logout
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.remove('active');
    }
}

// User Dropdown
function renderUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    if (!dropdown) return;

    if (currentUser) {
        const safeName = sanitizeHTML(currentUser.nameAndSurname || 'User');
        dropdown.innerHTML = `
            <div class="user-info">
                <ion-icon name="person-circle-outline"></ion-icon>
                <span class="user-name">${safeName}</span>
            </div>
            <button class="logout-btn" data-action="logout">
                <ion-icon name="log-out-outline"></ion-icon>
                <span data-translate="logout">Logout</span>
            </button>
        `;
        dropdown.classList.add('has-user');

        // Use event delegation for logout
        const logoutBtn = dropdown.querySelector('[data-action="logout"]');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', logoutUser);
        }
    } else {
        dropdown.innerHTML = `
            <a href="login.html" class="login-link">
                <ion-icon name="log-in-outline"></ion-icon>
                <span data-translate="login">Login</span>
            </a>
        `;
        dropdown.classList.remove('has-user');
    }

    translatePage(currentLanguage);
}

// ========================================
// DYNAMIC CONTENT LOADING FROM LOCALSTORAGE
// ========================================

// Load categories from localStorage (set by admin panel)
function loadCategoriesFromStorage() {
    console.log('[Main] loadCategoriesFromStorage called');
    const container = document.querySelector('.category-dropdown-content');
    if (!container) {
        console.log('[Main] ERROR: .category-dropdown-content not found!');
        return;
    }

    const categories = JSON.parse(localStorage.getItem('tarix_categories')) || [];
    console.log('[Main] Categories in localStorage:', categories.length);
    if (categories.length === 0) {
        console.log('[Main] No categories in localStorage, keeping static HTML');
        return;
    }
    console.log('[Main] Loading', categories.length, 'categories from admin data');

    container.innerHTML = categories.map(cat => {
        const safeName = sanitizeHTML(cat.name || '');
        const safeIcon = sanitizeURL(cat.icon_path || './assets/images/icons/dress.svg');
        const safeCount = sanitizeHTML(cat.product_count || 0);
        const filterAttr = (cat.name || '').toLowerCase().replace(/[^a-z0-9-]/g, '');
        return `
        <div class="category-item" data-filter-category="${filterAttr}">
            <div class="category-img-box">
                <img src="${safeIcon}" alt="${safeName}" width="30" loading="lazy" decoding="async">
            </div>
            <div class="category-content-box">
                <div class="category-content-flex">
                    <h3 class="category-item-title">${safeName}</h3>
                    <p class="category-item-amount">(${safeCount})</p>
                </div>
                <a href="#new-products" class="category-btn" data-translate="showAll">Show all</a>
            </div>
        </div>
    `;
    }).join('');
}

// Load testimonials from localStorage (set by admin panel)
function loadTestimonialsFromStorage() {
    console.log('[Main] loadTestimonialsFromStorage called');
    const container = document.querySelector('.testimonial');
    if (!container) {
        console.log('[Main] ERROR: .testimonial container not found!');
        return;
    }

    const testimonials = JSON.parse(localStorage.getItem('tarix_testimonials')) || [];
    const activeTestimonials = testimonials.filter(t => t.active);
    console.log('[Main] Active testimonials:', activeTestimonials.length);

    if (activeTestimonials.length === 0) {
        console.log('[Main] No active testimonials, keeping static HTML');
        return;
    }

    // Preserve the title
    const title = container.querySelector('.title');
    const titleHTML = title ? title.outerHTML : '<h2 class="title" data-translate="testimonials">Testimonials</h2>';

    // Generate cards for ALL active testimonials
    const cardsHTML = activeTestimonials.map(t => `
        <div class="testimonial-card">
            <img src="${sanitizeURL(t.image_path || './assets/images/testimonial-1.jpg')}"
                 alt="${sanitizeHTML(t.customer_name || 'Customer')}" class="testimonial-banner">
            <p class="testimonial-name">${sanitizeHTML(t.customer_name || 'Customer')}</p>
            <p class="testimonial-title">${sanitizeHTML(t.customer_role || '')}</p>
            <img src="./assets/images/icons/quotes.svg" alt="quotation" class="quotation-img">
            <p class="testimonial-desc">${sanitizeHTML(t.text || '')}</p>
        </div>
    `).join('');

    container.innerHTML = titleHTML + '<div class="testimonial-cards-wrapper">' + cardsHTML + '</div>';
    console.log('[Main] Loaded', activeTestimonials.length, 'testimonial cards');
}

// Load CTA content from localStorage (set by admin panel)
function loadCTAFromStorage() {
    const container = document.querySelector('.cta-container');
    if (!container) return;

    const cta = JSON.parse(localStorage.getItem('tarix_cta'));
    if (!cta || !cta.active) return; // Keep static HTML if no active CTA

    const bannerImg = container.querySelector('.cta-banner');
    const discountEl = container.querySelector('.discount');
    const titleEl = container.querySelector('.cta-title');
    const textEl = container.querySelector('.cta-text');
    const btnEl = container.querySelector('.cta-btn');

    if (bannerImg && cta.image_path) bannerImg.src = sanitizeURL(cta.image_path);
    if (discountEl && cta.subheading) discountEl.textContent = cta.subheading;
    if (titleEl && cta.heading) titleEl.textContent = cta.heading;
    if (textEl && cta.text) textEl.textContent = cta.text;
    if (btnEl && cta.button_text) btnEl.textContent = cta.button_text;
}

// ========================================
// LOAD PRODUCTS FROM ADMIN (localStorage)
// ========================================
function loadProductsFromStorage() {
    console.log('[Main] loadProductsFromStorage called');
    const products = JSON.parse(localStorage.getItem('tarix_products')) || [];
    console.log('[Main] Products in localStorage:', products.length);
    if (products.length === 0) {
        console.log('[Main] No products in localStorage, keeping static HTML');
        return;
    }

    const categories = JSON.parse(localStorage.getItem('tarix_categories')) || [];
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) {
        console.log('[Main] ERROR: .product-grid not found!');
        return;
    }
    console.log('[Main] Loading', products.length, 'products from admin data');

    // Generate product HTML from localStorage data
    productGrid.innerHTML = products.map(product => {
        const category = categories.find(c => c.id === product.category_id);
        const categoryName = category ? sanitizeHTML(category.name) : 'Uncategorized';
        const categoryFilter = categoryName.toLowerCase().replace(/[^a-z0-9-]/g, '');
        const safeName = sanitizeHTML(product.name || '');
        const safeImage = sanitizeURL(product.image_path || './assets/images/products/1.jpg');
        const price = parseFloat(product.price) || 0;
        const oldPrice = parseFloat(product.old_price) || 0;
        const discount = product.discount_percentage || 0;

        return `
            <div class="showcase" data-category="${categoryFilter}">
                <div class="showcase-banner">
                    <img src="${safeImage}" alt="${safeName}" width="300" class="product-img default" loading="lazy" decoding="async">
                    ${discount > 0 ? `<p class="showcase-badge">${discount}%</p>` : ''}
                    ${product.best_seller ? '<p class="showcase-badge angle pink">Best</p>' : ''}
                    <div class="showcase-actions">
                        <button class="btn-action" aria-label="Add to favorites" data-action="add-favorite">
                            <ion-icon name="heart-outline"></ion-icon>
                        </button>
                        <button class="btn-action" aria-label="Quick view" data-action="quick-view">
                            <ion-icon name="eye-outline"></ion-icon>
                        </button>
                        <button class="btn-action" aria-label="Compare" data-action="compare">
                            <ion-icon name="repeat-outline"></ion-icon>
                        </button>
                        <button class="btn-action" aria-label="Add to cart" data-action="add-cart">
                            <ion-icon name="bag-add-outline"></ion-icon>
                        </button>
                    </div>
                </div>
                <div class="showcase-content">
                    <a href="#" class="showcase-category">${categoryName}</a>
                    <a href="#">
                        <h3 class="showcase-title">${safeName}</h3>
                    </a>
                    <div class="showcase-rating">
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                    </div>
                    <div class="price-box">
                        <p class="price">${price.toFixed(2)} BAM</p>
                        ${oldPrice > 0 ? `<del>${oldPrice.toFixed(2)} BAM</del>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Reinitialize product action buttons
    initProductActions();
}

// Initialize product action buttons (add to cart, favorites, etc.)
function initProductActions() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    productGrid.addEventListener('click', function(e) {
        const actionBtn = e.target.closest('[data-action]');
        if (!actionBtn) return;

        const showcase = actionBtn.closest('.showcase');
        if (!showcase) return;

        const action = actionBtn.dataset.action;
        const title = showcase.querySelector('.showcase-title')?.textContent || 'Product';
        const priceText = showcase.querySelector('.price')?.textContent || '0 BAM';
        const image = showcase.querySelector('.product-img')?.src || '';

        const productData = {
            title: title,
            price: priceText,
            image: image
        };

        switch(action) {
            case 'add-cart':
                addToCart(productData);
                break;
            case 'add-favorite':
                addToFavorites(productData);
                break;
            case 'quick-view':
                // Quick view functionality
                console.log('Quick view:', productData);
                break;
        }
    });
}

// ========================================
// LOAD BANNERS FROM ADMIN (localStorage)
// ========================================
function loadBannersFromStorage() {
    console.log('[Main] loadBannersFromStorage called');
    const banners = JSON.parse(localStorage.getItem('tarix_banners')) || [];
    console.log('[Main] Banners in localStorage:', banners.length);
    if (banners.length === 0) {
        console.log('[Main] No banners in localStorage, keeping static HTML');
        return;
    }

    const swiperWrapper = document.querySelector('.banner-swiper .swiper-wrapper');
    if (!swiperWrapper) {
        console.log('[Main] ERROR: .banner-swiper .swiper-wrapper not found!');
        return;
    }

    // Filter active banners only
    const activeBanners = banners.filter(b => b.active);
    console.log('[Main] Active banners:', activeBanners.length);
    if (activeBanners.length === 0) {
        console.log('[Main] No active banners, keeping static HTML');
        return;
    }
    console.log('[Main] Loading', activeBanners.length, 'banners from admin data');

    // Generate banner slides HTML
    swiperWrapper.innerHTML = activeBanners.map((banner, index) => {
        const safeTitle = sanitizeHTML(banner.title || '');
        const safeSubtitle = sanitizeHTML(banner.subtitle || '');
        const safeText = sanitizeHTML(banner.text || '');
        const safeImage = sanitizeURL(banner.image_path || './assets/images/banner-1.jpg');
        const price = banner.price || '20';

        return `
            <div class="swiper-slide slider-item">
                <img src="${safeImage}" alt="${safeTitle}" class="banner-img" ${index === 0 ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'} decoding="async">
                <div class="banner-content">
                    <p class="banner-subtitle">${safeSubtitle}</p>
                    <h2 class="banner-title">${safeTitle}</h2>
                    <p class="banner-text">
                        <span data-translate="startingAt">starting at</span> <b>${price}</b>.00 BAM
                    </p>
                    <a href="#new-products" class="banner-btn" data-translate="shopNow">Shop now</a>
                </div>
            </div>
        `;
    }).join('');

    // Reinitialize Swiper after content change
    if (window.bannerSwiper) {
        window.bannerSwiper.update();
        window.bannerSwiper.slideTo(0);
    }
}

// ========================================
// LOAD BEST SELLERS FROM ADMIN (localStorage)
// ========================================
function loadBestSellersFromStorage() {
    const products = JSON.parse(localStorage.getItem('tarix_products')) || [];
    const bestSellers = products.filter(p => p.best_seller);
    if (bestSellers.length === 0) return; // Keep static HTML

    const swiperWrapper = document.querySelector('.best-sellers-swiper .swiper-wrapper');
    if (!swiperWrapper) return;

    swiperWrapper.innerHTML = bestSellers.map(product => {
        const safeName = sanitizeHTML(product.name || '');
        const safeImage = sanitizeURL(product.image_path || '');
        const price = parseFloat(product.price) || 0;
        const oldPrice = parseFloat(product.old_price) || 0;
        const discount = product.discount_percentage || 0;

        return `
            <div class="swiper-slide">
                <div class="showcase">
                    <div class="showcase-img-wrapper">
                        <img src="${safeImage}" alt="${safeName}" width="75" height="75" class="showcase-img">
                        ${discount > 0 ? `<span class="showcase-badge-sale">-${discount}%</span>` : ''}
                    </div>
                    <div class="showcase-content">
                        <a href="#">
                            <h4 class="showcase-title">${safeName}</h4>
                        </a>
                        <div class="showcase-rating">
                            <ion-icon name="star"></ion-icon>
                            <ion-icon name="star"></ion-icon>
                            <ion-icon name="star"></ion-icon>
                            <ion-icon name="star"></ion-icon>
                            <ion-icon name="star"></ion-icon>
                        </div>
                        <div class="price-box">
                            ${oldPrice > 0 ? `<del>${oldPrice.toFixed(2)} BAM</del>` : ''}
                            <p class="price">${price.toFixed(2)} BAM</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Reinitialize Best Sellers Swiper
    if (window.bestSellersSwiper) {
        window.bestSellersSwiper.update();
    }
}

// ========================================
// LOAD PRODUCTS (Uses static HTML from index.html)
// ========================================
async function loadProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return [];

    // Return existing static products from HTML
    return document.querySelectorAll('.product-grid .showcase');
}

// Toggle dropdown on user icon click
document.addEventListener('DOMContentLoaded', async function() {
    const userIconBtn = document.querySelector('[data-user-icon]');
    if (userIconBtn) {
        userIconBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = document.getElementById('userDropdown');
            if (dropdown) {
                dropdown.classList.toggle('active');
                // Update aria-expanded for accessibility
                this.setAttribute('aria-expanded', dropdown.classList.contains('active'));
            }
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        const dropdown = document.getElementById('userDropdown');
        const userIcon = document.querySelector('[data-user-icon]');

        if (dropdown && !dropdown.contains(e.target) && userIcon && !userIcon.contains(e.target)) {
            dropdown.classList.remove('active');
            if (userIcon) userIcon.setAttribute('aria-expanded', 'false');
        }
    });

    // Initialize user dropdown
    renderUserDropdown();

    // ========================================
    // INITIALIZE NEW FEATURES
    // ========================================
    initGlobalModalEscapeHandler();

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
        updateDarkModeToggle(); // Update icon on page load
    }

    // ========================================
    // COUNTDOWN TIMER
    // ========================================
    let countdownIntervalId = null; // Store interval ID to prevent memory leaks

    function initCountdownTimer() {
        const countdownElements = document.querySelectorAll('.countdown');
        if (countdownElements.length === 0) return;

        // Clear existing interval if any
        if (countdownIntervalId) {
            clearInterval(countdownIntervalId);
        }

        // Set end date to 30 days from now
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 30);

        function updateCountdown() {
            const now = new Date();
            const diff = endDate - now;

            if (diff <= 0) {
                // Reset countdown when it reaches zero
                endDate.setDate(endDate.getDate() + 30);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            countdownElements.forEach(countdown => {
                const displays = countdown.querySelectorAll('.display-number');
                if (displays.length >= 4) {
                    displays[0].textContent = String(days).padStart(2, '0');
                    displays[1].textContent = String(hours).padStart(2, '0');
                    displays[2].textContent = String(minutes).padStart(2, '0');
                    displays[3].textContent = String(seconds).padStart(2, '0');
                }
            });
        }

        updateCountdown();
        countdownIntervalId = setInterval(updateCountdown, 1000);
    }
    initCountdownTimer();

    // ========================================
    // LOAD DYNAMIC CONTENT FROM ADMIN PANEL
    // ========================================
    console.log('[Main] Starting to load dynamic content from admin panel...');
    // Load banners from admin (must be before Swiper init in index.html)
    loadBannersFromStorage();

    // Load categories, testimonials, CTA
    loadCategoriesFromStorage();
    loadTestimonialsFromStorage();
    loadCTAFromStorage();

    // Load products from admin (replaces static HTML if data exists)
    loadProductsFromStorage();
    loadBestSellersFromStorage();

    // ========================================
    // LOAD PRODUCTS FROM API
    // ========================================
    let allProducts = await loadProducts();

    // ========================================
    // PRODUCT PAGINATION (LOAD MORE)
    // ========================================
    const productsPerLoad = 8;
    let currentlyShowing = productsPerLoad;
    const loadMoreBtn = document.getElementById('loadMoreProducts');

    // Initially hide products beyond the first batch
    function updateProductDisplay() {
        allProducts.forEach((product, index) => {
            if (index >= currentlyShowing) {
                product.style.display = 'none';
            } else {
                product.style.display = 'block';
            }
        });

        // Hide button if all products are shown
        if (currentlyShowing >= allProducts.length) {
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        } else {
            if (loadMoreBtn) loadMoreBtn.style.display = 'flex';
        }
    }

    // Load more products on button click
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            currentlyShowing += productsPerLoad;
            updateProductDisplay();

            // Smooth scroll to first newly loaded product
            if (currentlyShowing - productsPerLoad < allProducts.length) {
                setTimeout(() => {
                    const firstNewProduct = allProducts[currentlyShowing - productsPerLoad];
                    if (firstNewProduct) {
                        firstNewProduct.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                }, 100);
            }
        });
    }

    // Initial display
    updateProductDisplay();

    // ========================================
    // PRODUCT FILTERING & SORTING
    // ========================================
    const categoryFilter = document.getElementById('categoryFilter');
    const sortBySelect = document.getElementById('sortBy');
    const productCountSpan = document.getElementById('productCount');

    function filterAndSortProducts() {
        const selectedCategory = categoryFilter.value;
        const selectedSort = sortBySelect.value;
        let visibleProducts = [];

        // Get all products
        allProducts.forEach(product => {
            const productCategories = product.dataset.category?.toLowerCase() || '';

            // Filter logic
            if (selectedCategory === 'all' || productCategories.includes(selectedCategory.toLowerCase())) {
                visibleProducts.push(product);
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });

        // Sort logic
        if (selectedSort !== 'default') {
            visibleProducts.sort((a, b) => {
                switch (selectedSort) {
                    case 'price-low':
                        return getProductPrice(a) - getProductPrice(b);
                    case 'price-high':
                        return getProductPrice(b) - getProductPrice(a);
                    case 'name-az':
                        return getProductName(a).localeCompare(getProductName(b));
                    case 'name-za':
                        return getProductName(b).localeCompare(getProductName(a));
                    case 'rating':
                        return getProductRating(b) - getProductRating(a);
                    default:
                        return 0;
                }
            });

            // Reorder products in DOM
            const productGrid = document.querySelector('.product-grid');
            visibleProducts.forEach(product => {
                productGrid.appendChild(product);
            });
        }

        // Update product count
        if (productCountSpan) {
            productCountSpan.textContent = visibleProducts.length;
        }

        // Reset currentlyShowing to show all filtered products
        currentlyShowing = Math.max(productsPerLoad, visibleProducts.length);
        updateProductDisplay();
    }

    function getProductPrice(product) {
        const priceText = product.querySelector('.price')?.textContent || '0';
        return parseFloat(priceText.replace(/[^\d.]/g, ''));
    }

    function getProductName(product) {
        return product.querySelector('.showcase-title')?.textContent || '';
    }

    function getProductRating(product) {
        const filledStars = product.querySelectorAll('.showcase-rating ion-icon[name="star"]').length;
        return filledStars;
    }

    // Event listeners for filter and sort
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterAndSortProducts);
    }

    if (sortBySelect) {
        sortBySelect.addEventListener('change', filterAndSortProducts);
    }

    // Initialize product count
    if (productCountSpan) {
        productCountSpan.textContent = allProducts.length;
    }

    // ========================================
    // SEARCH AUTOCOMPLETE FUNCTIONALITY
    // ========================================
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchAutocomplete = document.getElementById('searchAutocomplete');

    let searchResults = [];

    function performSearch(query) {
        if (!query || query.trim().length < 2) {
            searchAutocomplete.classList.remove('active');
            return;
        }

        query = query.toLowerCase().trim();
        searchResults = [];

        allProducts.forEach(product => {
            const title = product.querySelector('.showcase-title')?.textContent.toLowerCase() || '';
            const category = product.querySelector('.showcase-category')?.textContent.toLowerCase() || '';
            const price = product.querySelector('.price')?.textContent || '';
            const image = product.querySelector('.product-img.default')?.src || '';

            if (title.includes(query) || category.includes(query)) {
                searchResults.push({
                    title: product.querySelector('.showcase-title')?.textContent || '',
                    category: product.querySelector('.showcase-category')?.textContent || '',
                    price: price,
                    image: image,
                    element: product
                });
            }
        });

        displayAutocompleteResults(searchResults.slice(0, 5)); // Show max 5 results
    }

    function displayAutocompleteResults(results) {
        if (results.length === 0) {
            searchAutocomplete.innerHTML = '<div class="autocomplete-item no-results">No products found</div>';
            searchAutocomplete.classList.add('active');
            return;
        }

        searchAutocomplete.innerHTML = results.map((result, index) => {
            const safeTitle = sanitizeHTML(result.title);
            const safeCategory = sanitizeHTML(result.category);
            const safePrice = sanitizeHTML(result.price);
            const safeImage = sanitizeURL(result.image);
            return `
            <div class="autocomplete-item" data-result-index="${index}">
                <img src="${safeImage}" alt="${safeTitle}">
                <div class="autocomplete-info">
                    <h4>${safeTitle}</h4>
                    <p class="autocomplete-category">${safeCategory}</p>
                    <p class="autocomplete-price">${safePrice}</p>
                </div>
            </div>
        `;
        }).join('');

        // Use event delegation instead of adding listeners to each item
        searchAutocomplete.onclick = (e) => {
            const item = e.target.closest('.autocomplete-item');
            if (item && !item.classList.contains('no-results')) {
                const index = parseInt(item.dataset.resultIndex);
                if (results[index]) {
                    searchResults[index].element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    searchResults[index].element.classList.add('highlight-product');
                    setTimeout(() => {
                        searchResults[index].element.classList.remove('highlight-product');
                    }, 2000);
                    searchAutocomplete.classList.remove('active');
                    searchInput.value = '';
                }
            }
        };

        searchAutocomplete.classList.add('active');
    }

    if (searchInput) {
        // Input event for autocomplete
        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });

        // Focus event
        searchInput.addEventListener('focus', (e) => {
            if (e.target.value.trim().length >= 2) {
                performSearch(e.target.value);
            }
        });

        // Blur event to hide autocomplete (with delay for click to register)
        searchInput.addEventListener('blur', () => {
            setTimeout(() => {
                searchAutocomplete.classList.remove('active');
            }, 200);
        });

        // Enter key to search
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (searchResults.length > 0) {
                    searchResults[0].element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    searchResults[0].element.classList.add('highlight-product');
                    setTimeout(() => {
                        searchResults[0].element.classList.remove('highlight-product');
                    }, 2000);
                }
                searchAutocomplete.classList.remove('active');
            }
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            if (searchResults.length > 0) {
                searchResults[0].element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                searchResults[0].element.classList.add('highlight-product');
                setTimeout(() => {
                    searchResults[0].element.classList.remove('highlight-product');
                }, 2000);
            }
            searchAutocomplete.classList.remove('active');
        });
    }

    // Close autocomplete when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchAutocomplete.contains(e.target)) {
            searchAutocomplete.classList.remove('active');
        }
    });

    // ========================================
    // BREADCRUMB NAVIGATION
    // ========================================
    const breadcrumbEl = document.getElementById('breadcrumb');
    const sections = document.querySelectorAll('section[id]');

    const breadcrumbMap = {
        'home': { name: 'Home', icon: 'home-outline' },
        'categories': { name: 'Categories', icon: 'grid-outline' },
        'new-products': { name: 'New Products', icon: 'sparkles-outline' },
        'testimonials': { name: 'Testimonials', icon: 'chatbubbles-outline' },
        'hot-offers': { name: 'Hot Offers', icon: 'flame-outline' }
    };

    function updateBreadcrumb(sectionId) {
        if (!breadcrumbEl || !sectionId || !breadcrumbMap[sectionId]) return;

        const section = breadcrumbMap[sectionId];

        breadcrumbEl.innerHTML = `
            <li class="breadcrumb-item">
                <a href="#home"><ion-icon name="home-outline"></ion-icon> Home</a>
            </li>
            ${sectionId !== 'home' ? `
            <li class="breadcrumb-item active">
                <a href="#${sectionId}">
                    <ion-icon name="${section.icon}"></ion-icon>
                    ${section.name}
                </a>
            </li>
            ` : ''}
        `;
    }

    // Intersection Observer for sections
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateBreadcrumb(entry.target.id);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Initialize with home
    updateBreadcrumb('home');

    // ========================================
    // RECENTLY VIEWED PRODUCTS
    // ========================================
    let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];

    function addToRecentlyViewed(product) {
        // Remove if already exists
        recentlyViewed = recentlyViewed.filter(item => item.title !== product.title);

        // Add to beginning
        recentlyViewed.unshift(product);

        // Keep only last 6 items
        if (recentlyViewed.length > 6) {
            recentlyViewed = recentlyViewed.slice(0, 6);
        }

        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
        renderRecentlyViewed();
    }

    function renderRecentlyViewed() {
        const container = document.querySelector('.recently-viewed-container');
        if (!container) return;

        if (recentlyViewed.length === 0) {
            container.innerHTML = '<p class="empty-recently-viewed">You haven\'t viewed any products yet</p>';
            return;
        }

        container.innerHTML = `
            <div class="recently-viewed-grid">
                ${recentlyViewed.map((product, index) => {
                    const safeTitle = sanitizeHTML(product.title);
                    const safeCategory = sanitizeHTML(product.category);
                    const safePrice = sanitizeHTML(product.price);
                    const safeImage = sanitizeURL(product.image);
                    // Rating contains ion-icon HTML from our own rendering, keep it
                    const safeRating = product.rating || '';
                    return `
                    <div class="recently-viewed-item" data-index="${index}">
                        <div class="item-banner">
                            <img src="${safeImage}" alt="${safeTitle}">
                            <button class="quick-view-btn" data-action="view" data-index="${index}" aria-label="Quick view ${safeTitle}">
                                <ion-icon name="eye-outline"></ion-icon>
                            </button>
                        </div>
                        <div class="item-content">
                            <a href="#" class="item-category">${safeCategory}</a>
                            <h4 class="item-title">${safeTitle}</h4>
                            <div class="item-rating">${safeRating}</div>
                            <p class="item-price">${safePrice}</p>
                        </div>
                    </div>
                `;}).join('')}
            </div>
        `;

        // Use event delegation for quick view buttons
        container.addEventListener('click', (e) => {
            const viewBtn = e.target.closest('[data-action="view"]');
            if (viewBtn) {
                const index = parseInt(viewBtn.dataset.index, 10);
                if (recentlyViewed[index]) {
                    createProductModal(recentlyViewed[index]);
                }
            }
        });
    }

    window.viewRecentProduct = function(title) {
        const product = recentlyViewed.find(p => p.title === title);
        if (product) {
            createProductModal(product);
        }
    };

    // Override the eye button click to track recently viewed
    document.addEventListener('click', function(e) {
        const eyeIcon = e.target.closest('.btn-action ion-icon[name="eye-outline"]');
        if (eyeIcon) {
            const showcase = e.target.closest('.showcase');
            if (showcase) {
                const product = {
                    title: showcase.querySelector('.showcase-title')?.textContent || 'Unknown',
                    price: showcase.querySelector('.price')?.textContent || '$0.00',
                    category: showcase.querySelector('.showcase-category')?.textContent || 'General',
                    image: showcase.querySelector('.product-img.default')?.src || '',
                    oldPrice: showcase.querySelector('del')?.textContent || '',
                    badge: showcase.querySelector('.showcase-badge')?.textContent || '',
                    rating: showcase.querySelector('.showcase-rating')?.innerHTML || ''
                };
                addToRecentlyViewed(product);
            }
        }
    });

    // Initial render
    renderRecentlyViewed();
});

// Make functions globally available
window.loginUser = loginUser;
window.registerUser = registerUser;
window.logoutUser = logoutUser;
