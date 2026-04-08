// ===== API CONFIGURATION =====
const API_BASE = '/api';

// API Helper function
async function api(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const config = {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    };

    if (options.body && typeof options.body === 'object') {
        config.body = JSON.stringify(options.body);
    }

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'API request failed');
    }

    return data;
}

// ===== LOCALSTORAGE KEYS (kept for backward compatibility) =====
const STORE_KEYS = {
    ADMIN_USER: 'tarix_admin_user',
    ADMIN_SESSION: 'tarix_admin_session',
    BANNERS: 'tarix_banners',
    CATEGORIES: 'tarix_categories',
    PRODUCTS: 'tarix_products',
    TESTIMONIALS: 'tarix_testimonials',
    CTA: 'tarix_cta',
    NEWSLETTER: 'tarix_newsletter',
    ORDERS: 'tarix_orders'
};

// ===== SECURITY: Escape HTML to prevent XSS =====
function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// ===== SAFE JSON PARSE =====
function safeJsonParse(str, fallback = null) {
    try {
        return JSON.parse(str);
    } catch (e) {
        console.warn('JSON parse error:', e);
        return fallback;
    }
}

// ===== LOCALIZATION =====
const translations = {
    en: {
        dashboard: 'Dashboard',
        banners: 'Banners',
        categories: 'Categories',
        products: 'Products',
        testimonials: 'Testimonials',
        ctaContent: 'CTA Content',
        newsletter: 'Newsletter',
        orders: 'Orders',
        logout: 'Logout',
        totalProducts: 'Total Products',
        totalOrders: 'Total Orders',
        newsletterSubscribers: 'Newsletter Subscribers',
        recentOrders: 'Recent Orders',
        addNewBanner: 'Add New Banner',
        addNewCategory: 'Add New Category',
        addNewProduct: 'Add New Product',
        addNewTestimonial: 'Add New Testimonial',
        edit: 'Edit',
        delete: 'Delete',
        save: 'Save',
        cancel: 'Cancel',
        active: 'Active',
        inactive: 'Inactive',
        name: 'Name',
        price: 'Price',
        stock: 'Stock',
        category: 'Category',
        description: 'Description',
        image: 'Image',
        subtitle: 'Subtitle',
        title: 'Title',
        text: 'Text',
        role: 'Role',
        rating: 'Rating',
        email: 'Email',
        status: 'Status',
        actions: 'Actions',
        orderNumber: 'Order #',
        customer: 'Customer',
        date: 'Date',
        total: 'Total',
        pending: 'Pending',
        processing: 'Processing',
        shipped: 'Shipped',
        delivered: 'Delivered',
        cancelled: 'Cancelled',
        view: 'View',
        updateStatus: 'Update Status',
        giveDiscount: 'Give Discount',
        subscribedDate: 'Subscribed Date',
        discountGiven: 'Discount Given',
        discountAmount: 'Discount Amount',
        heading: 'Heading',
        subheading: 'Subheading',
        buttonText: 'Button Text',
        customerName: 'Customer Name',
        customerRole: 'Customer Role',
        testimonialText: 'Testimonial Text',
        oldPrice: 'Old Price',
        discount: 'Discount %',
        featured: 'Featured',
        bestSeller: 'Best Seller',
        uncategorized: 'Uncategorized',
        noItemsFound: 'No items found',
        areYouSure: 'Are you sure?',
        successfullySaved: 'Successfully saved!',
        successfullyDeleted: 'Successfully deleted!',
        errorOccurred: 'An error occurred',
        allOrders: 'All Orders',
        enterDiscountPercentage: 'Enter discount percentage (e.g., 15):',
        discountAssigned: 'Discount assigned successfully!',
        noOrdersFound: 'No orders found',
        orderDetails: 'Order Details',
        customerInformation: 'Customer Information',
        phone: 'Phone',
        address: 'Address',
        orderItems: 'Order Items',
        orderSummary: 'Order Summary',
        subtotal: 'Subtotal',
        shipping: 'Shipping',
        tax: 'Tax',
        orderDate: 'Order Date',
        updateOrderStatusTo: 'Update order status to',
        options: 'Options',
        current: 'Current',
        orderStatusUpdated: 'Order status updated successfully!',
        yes: 'Yes',
        no: 'No',
        noSubscribers: 'No subscribers yet.',
        backgroundImage: 'Background Image',
        saveCTAContent: 'Save CTA Content',
        ctaContentUpdated: 'CTA content updated successfully!',
        failedToUpdateCTA: 'Failed to update CTA',
        errorSavingCTA: 'Error saving CTA',
        cannotDeleteCategoryWithProducts: 'Cannot delete category with existing products. Please reassign or delete products first.'
    },
    de: {
        dashboard: 'Dashboard',
        banners: 'Banner',
        categories: 'Kategorien',
        products: 'Produkte',
        testimonials: 'Bewertungen',
        ctaContent: 'CTA-Inhalt',
        newsletter: 'Newsletter',
        orders: 'Bestellungen',
        logout: 'Abmelden',
        totalProducts: 'Produkte Gesamt',
        totalOrders: 'Bestellungen Gesamt',
        newsletterSubscribers: 'Newsletter-Abonnenten',
        recentOrders: 'Letzte Bestellungen',
        addNewBanner: 'Neues Banner hinzufügen',
        addNewCategory: 'Neue Kategorie hinzufügen',
        addNewProduct: 'Neues Produkt hinzufügen',
        addNewTestimonial: 'Neue Bewertung hinzufügen',
        edit: 'Bearbeiten',
        delete: 'Löschen',
        save: 'Speichern',
        cancel: 'Abbrechen',
        active: 'Aktiv',
        inactive: 'Inaktiv',
        name: 'Name',
        price: 'Preis',
        stock: 'Lagerbestand',
        category: 'Kategorie',
        description: 'Beschreibung',
        image: 'Bild',
        subtitle: 'Untertitel',
        title: 'Titel',
        text: 'Text',
        role: 'Rolle',
        rating: 'Bewertung',
        email: 'E-Mail',
        status: 'Status',
        actions: 'Aktionen',
        orderNumber: 'Bestellung #',
        customer: 'Kunde',
        date: 'Datum',
        total: 'Gesamt',
        pending: 'Ausstehend',
        processing: 'In Bearbeitung',
        shipped: 'Versandt',
        delivered: 'Zugestellt',
        cancelled: 'Storniert',
        view: 'Ansehen',
        updateStatus: 'Status aktualisieren',
        giveDiscount: 'Rabatt geben',
        subscribedDate: 'Anmeldedatum',
        discountGiven: 'Rabatt gegeben',
        discountAmount: 'Rabattbetrag',
        heading: 'Überschrift',
        subheading: 'Unterüberschrift',
        buttonText: 'Button-Text',
        customerName: 'Kundenname',
        customerRole: 'Kundenrolle',
        testimonialText: 'Bewertungstext',
        oldPrice: 'Alter Preis',
        discount: 'Rabatt %',
        featured: 'Hervorgehoben',
        bestSeller: 'Bestseller',
        uncategorized: 'Ohne Kategorie',
        noItemsFound: 'Keine Artikel gefunden',
        areYouSure: 'Sind Sie sicher?',
        successfullySaved: 'Erfolgreich gespeichert!',
        successfullyDeleted: 'Erfolgreich gelöscht!',
        errorOccurred: 'Ein Fehler ist aufgetreten',
        allOrders: 'Alle Bestellungen',
        enterDiscountPercentage: 'Rabatt in Prozent eingeben (z.B. 15):',
        discountAssigned: 'Rabatt erfolgreich zugewiesen!',
        noOrdersFound: 'Keine Bestellungen gefunden',
        orderDetails: 'Bestelldetails',
        customerInformation: 'Kundeninformationen',
        phone: 'Telefon',
        address: 'Adresse',
        orderItems: 'Bestellte Artikel',
        orderSummary: 'Bestellübersicht',
        subtotal: 'Zwischensumme',
        shipping: 'Versand',
        tax: 'Steuer',
        orderDate: 'Bestelldatum',
        updateOrderStatusTo: 'Bestellstatus aktualisieren auf',
        options: 'Optionen',
        current: 'Aktuell',
        orderStatusUpdated: 'Bestellstatus erfolgreich aktualisiert!',
        yes: 'Ja',
        no: 'Nein',
        noSubscribers: 'Noch keine Abonnenten.',
        backgroundImage: 'Hintergrundbild',
        saveCTAContent: 'CTA-Inhalt speichern',
        ctaContentUpdated: 'CTA-Inhalt erfolgreich aktualisiert!',
        failedToUpdateCTA: 'CTA konnte nicht aktualisiert werden',
        errorSavingCTA: 'Fehler beim Speichern des CTA',
        cannotDeleteCategoryWithProducts: 'Kategorie kann nicht gelöscht werden, da Produkte existieren. Bitte zuerst Produkte verschieben oder löschen.'
    },
    bs: {
        dashboard: 'Kontrolna tabla',
        banners: 'Baneri',
        categories: 'Kategorije',
        products: 'Proizvodi',
        testimonials: 'Recenzije',
        ctaContent: 'CTA Sadržaj',
        newsletter: 'Newsletter',
        orders: 'Narudžbe',
        logout: 'Odjava',
        totalProducts: 'Ukupno Proizvoda',
        totalOrders: 'Ukupno Narudžbi',
        newsletterSubscribers: 'Newsletter Pretplatnici',
        recentOrders: 'Nedavne Narudžbe',
        addNewBanner: 'Dodaj Novi Baner',
        addNewCategory: 'Dodaj Novu Kategoriju',
        addNewProduct: 'Dodaj Novi Proizvod',
        addNewTestimonial: 'Dodaj Novu Recenziju',
        edit: 'Uredi',
        delete: 'Obriši',
        save: 'Sačuvaj',
        cancel: 'Otkaži',
        active: 'Aktivan',
        inactive: 'Neaktivan',
        name: 'Naziv',
        price: 'Cijena',
        stock: 'Zaliha',
        category: 'Kategorija',
        description: 'Opis',
        image: 'Slika',
        subtitle: 'Podnaslov',
        title: 'Naslov',
        text: 'Tekst',
        role: 'Uloga',
        rating: 'Ocjena',
        email: 'Email',
        status: 'Status',
        actions: 'Akcije',
        orderNumber: 'Narudžba #',
        customer: 'Kupac',
        date: 'Datum',
        total: 'Ukupno',
        pending: 'Na čekanju',
        processing: 'U obradi',
        shipped: 'Poslano',
        delivered: 'Dostavljeno',
        cancelled: 'Otkazano',
        view: 'Pogledaj',
        updateStatus: 'Ažuriraj Status',
        giveDiscount: 'Daj Popust',
        subscribedDate: 'Datum Pretplate',
        discountGiven: 'Popust Dat',
        discountAmount: 'Iznos Popusta',
        heading: 'Naslov',
        subheading: 'Podnaslov',
        buttonText: 'Tekst Dugmeta',
        customerName: 'Ime Kupca',
        customerRole: 'Uloga Kupca',
        testimonialText: 'Tekst Recenzije',
        oldPrice: 'Stara Cijena',
        discount: 'Popust %',
        featured: 'Istaknuto',
        bestSeller: 'Najprodavanije',
        uncategorized: 'Bez Kategorije',
        noItemsFound: 'Nema pronađenih stavki',
        areYouSure: 'Da li ste sigurni?',
        successfullySaved: 'Uspješno sačuvano!',
        successfullyDeleted: 'Uspješno obrisano!',
        errorOccurred: 'Došlo je do greške',
        allOrders: 'Sve Narudžbe',
        enterDiscountPercentage: 'Unesite procenat popusta (npr. 15):',
        discountAssigned: 'Popust uspješno dodijeljen!',
        noOrdersFound: 'Nema pronađenih narudžbi',
        orderDetails: 'Detalji Narudžbe',
        customerInformation: 'Informacije o Kupcu',
        phone: 'Telefon',
        address: 'Adresa',
        orderItems: 'Naručene Stavke',
        orderSummary: 'Pregled Narudžbe',
        subtotal: 'Međuzbir',
        shipping: 'Dostava',
        tax: 'Porez',
        orderDate: 'Datum Narudžbe',
        updateOrderStatusTo: 'Ažuriraj status narudžbe na',
        options: 'Opcije',
        current: 'Trenutno',
        orderStatusUpdated: 'Status narudžbe uspješno ažuriran!',
        yes: 'Da',
        no: 'Ne',
        noSubscribers: 'Još nema pretplatnika.',
        backgroundImage: 'Pozadinska Slika',
        saveCTAContent: 'Sačuvaj CTA Sadržaj',
        ctaContentUpdated: 'CTA sadržaj uspješno ažuriran!',
        failedToUpdateCTA: 'Greška pri ažuriranju CTA',
        errorSavingCTA: 'Greška pri čuvanju CTA',
        cannotDeleteCategoryWithProducts: 'Kategorija se ne može obrisati jer postoje proizvodi. Molimo prvo premjestite ili obrišite proizvode.'
    }
};

let currentLanguage = localStorage.getItem('adminLanguage') || 'en';

function t(key) {
    return translations[currentLanguage][key] || translations['en'][key] || key;
}

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('adminLanguage', lang);
    location.reload();
}

// ===== UTILITY FUNCTIONS =====

// Convert file to Base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Compress image before storing
async function compressImage(file, maxWidth = 800, quality = 0.8) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', quality));
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

// Safe localStorage set with error handling
function safeSetItem(key, value) {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            showNotification('Storage limit reached. Please delete some items.', true);
        }
        console.error('Storage error:', e);
        return false;
    }
}

// Hash password using SHA-256
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// ===== AUTH CHECK (server API based) =====
async function checkAuth() {
    console.log('[Admin] Checking auth via server API...');
    try {
        const data = await api('/auth/check');

        if (!data.authenticated) {
            console.log('[Admin] Not authenticated, redirecting to login');
            window.location.href = 'login.html';
            return;
        }

        console.log('[Admin] Authenticated as:', data.admin.username);
        // Valid session - show admin username and init
        const usernameEl = document.getElementById('adminUsername');
        if (usernameEl) usernameEl.textContent = data.admin.username;
        init();
    } catch (error) {
        console.error('[Admin] Auth check error:', error);
        window.location.href = 'login.html';
    }
}

// Seed default admin if none exists
async function seedDefaultAdmin() {
    const adminUser = localStorage.getItem(STORE_KEYS.ADMIN_USER);
    if (!adminUser) {
        const hashedPassword = await hashPassword('admin123');
        localStorage.setItem(STORE_KEYS.ADMIN_USER, JSON.stringify({
            username: 'admin',
            password: hashedPassword,
            created_at: new Date().toISOString()
        }));
        // Default admin seeded (credentials not logged for security)
    }
}

// Seed default data if localStorage is empty or invalid
function seedDefaultData() {
    console.log('[Admin] Seeding default data...');

    // Helper to check if data exists and is valid array
    const isValidArray = (key) => {
        try {
            const data = JSON.parse(localStorage.getItem(key));
            return Array.isArray(data);
        } catch {
            return false;
        }
    };

    // Seed categories - also seed if empty array
    const existingCategories = safeJsonParse(localStorage.getItem(STORE_KEYS.CATEGORIES), null);
    if (!existingCategories || (Array.isArray(existingCategories) && existingCategories.length === 0)) {
        const defaultCategories = [
            { id: 1, name: 'Dress & frock', icon_path: './assets/images/icons/dress.svg', product_count: 53, order_position: 0 },
            { id: 2, name: 'Winter wear', icon_path: './assets/images/icons/coat.svg', product_count: 58, order_position: 1 },
            { id: 3, name: 'Glasses & lens', icon_path: './assets/images/icons/glasses.svg', product_count: 68, order_position: 2 },
            { id: 4, name: 'Shorts & jeans', icon_path: './assets/images/icons/shorts.svg', product_count: 84, order_position: 3 },
            { id: 5, name: 'T-shirts', icon_path: './assets/images/icons/tee.svg', product_count: 35, order_position: 4 },
            { id: 6, name: 'Jacket', icon_path: './assets/images/icons/jacket.svg', product_count: 16, order_position: 5 },
            { id: 7, name: 'Watch', icon_path: './assets/images/icons/watch.svg', product_count: 27, order_position: 6 },
            { id: 8, name: 'Hat & caps', icon_path: './assets/images/icons/hat.svg', product_count: 39, order_position: 7 }
        ];
        localStorage.setItem(STORE_KEYS.CATEGORIES, JSON.stringify(defaultCategories));
        console.log('[Admin] Seeded default categories:', defaultCategories.length);
    }

    // Seed testimonials - also seed if empty array
    const existingTestimonials = safeJsonParse(localStorage.getItem(STORE_KEYS.TESTIMONIALS), null);
    if (!existingTestimonials || (Array.isArray(existingTestimonials) && existingTestimonials.length === 0)) {
        const defaultTestimonials = [
            {
                id: 1,
                customer_name: 'Sarah Johnson',
                customer_role: 'Fashion Blogger',
                text: 'Tarix has become my go-to destination for quality fashion. The variety is incredible and the prices are unbeatable!',
                rating: 5,
                image_path: './assets/images/testimonial-1.jpg',
                active: 1,
                order_position: 0,
                created_at: new Date().toISOString()
            }
        ];
        localStorage.setItem(STORE_KEYS.TESTIMONIALS, JSON.stringify(defaultTestimonials));
        console.log('[Admin] Seeded default testimonials');
    }

    // Seed CTA
    if (!localStorage.getItem(STORE_KEYS.CTA)) {
        const defaultCTA = {
            id: 1,
            heading: 'Summer Collection',
            subheading: '25% Discount',
            text: 'Starting @ <b>18 BAM</b>',
            button_text: 'Shop Now',
            image_path: './assets/images/cta-banner.jpg',
            active: 1,
            updated_at: new Date().toISOString()
        };
        localStorage.setItem(STORE_KEYS.CTA, JSON.stringify(defaultCTA));
        console.log('[Admin] Seeded default CTA');
    }

    // Initialize empty arrays if not present or invalid
    // Seed banners if empty
    const existingBanners = safeJsonParse(localStorage.getItem(STORE_KEYS.BANNERS), null);
    if (!existingBanners || (Array.isArray(existingBanners) && existingBanners.length === 0)) {
        const defaultBanners = [
            {
                id: 1,
                subtitle: 'Trending Item',
                title: 'Women\'s Latest Fashion Sale',
                text: 'Up to 50% off on selected items',
                price: 'Starting at 29 BAM',
                image_path: './assets/images/banner-1.jpg',
                active: 1,
                created_at: new Date().toISOString()
            },
            {
                id: 2,
                subtitle: 'Trending Accessories',
                title: 'Modern Sunglasses',
                text: 'New collection available',
                price: 'Starting at 19 BAM',
                image_path: './assets/images/banner-2.jpg',
                active: 1,
                created_at: new Date().toISOString()
            },
            {
                id: 3,
                subtitle: 'Sale Offer',
                title: 'New Fashion Summer Sale',
                text: 'Limited time offer',
                price: 'Starting at 39 BAM',
                image_path: './assets/images/banner-3.jpg',
                active: 1,
                created_at: new Date().toISOString()
            }
        ];
        localStorage.setItem(STORE_KEYS.BANNERS, JSON.stringify(defaultBanners));
        console.log('[Admin] Seeded default banners:', defaultBanners.length);
    }

    // Seed products if empty
    const existingProducts = safeJsonParse(localStorage.getItem(STORE_KEYS.PRODUCTS), null);
    if (!existingProducts || (Array.isArray(existingProducts) && existingProducts.length === 0)) {
        const defaultProducts = [
            {
                id: 1,
                name: 'Relaxed Short Full Sleeve T-Shirt',
                category_id: 5, // T-shirts
                price: 45.00,
                old_price: 75.00,
                discount_percentage: 15,
                description: 'Comfortable relaxed fit t-shirt perfect for casual wear.',
                stock: 50,
                featured: 1,
                best_seller: 1,
                rating: 5,
                image_path: './assets/images/products/clothes-1.jpg',
                created_at: new Date().toISOString()
            },
            {
                id: 2,
                name: 'Girls Pink Embro Design Top',
                category_id: 1, // Dress & frock
                price: 61.00,
                old_price: null,
                discount_percentage: 0,
                description: 'Beautiful embroidered top for girls with premium quality fabric.',
                stock: 30,
                featured: 1,
                best_seller: 0,
                rating: 4,
                image_path: './assets/images/products/clothes-2.jpg',
                created_at: new Date().toISOString()
            },
            {
                id: 3,
                name: 'Pure Garment Dyed Cotton Shirt',
                category_id: 5, // T-shirts
                price: 56.00,
                old_price: 78.00,
                discount_percentage: 20,
                description: 'High quality pure cotton shirt with garment dye finish.',
                stock: 45,
                featured: 0,
                best_seller: 1,
                rating: 5,
                image_path: './assets/images/products/clothes-3.jpg',
                created_at: new Date().toISOString()
            },
            {
                id: 4,
                name: 'Mens Winter Leather Jacket',
                category_id: 6, // Jacket
                price: 150.00,
                old_price: 200.00,
                discount_percentage: 25,
                description: 'Premium leather jacket for winter with warm inner lining.',
                stock: 20,
                featured: 1,
                best_seller: 1,
                rating: 5,
                image_path: './assets/images/products/jacket-1.jpg',
                created_at: new Date().toISOString()
            },
            {
                id: 5,
                name: 'Men Yarn Fleece Full-Zip Jacket',
                category_id: 6, // Jacket
                price: 89.00,
                old_price: 120.00,
                discount_percentage: 10,
                description: 'Soft yarn fleece jacket with full zip closure.',
                stock: 35,
                featured: 0,
                best_seller: 0,
                rating: 4,
                image_path: './assets/images/products/jacket-5.jpg',
                created_at: new Date().toISOString()
            },
            {
                id: 6,
                name: 'Baby Fabric Shoes',
                category_id: 1, // Dress & frock (closest category)
                price: 29.00,
                old_price: 45.00,
                discount_percentage: 35,
                description: 'Soft and comfortable fabric shoes for babies.',
                stock: 100,
                featured: 1,
                best_seller: 1,
                rating: 5,
                image_path: './assets/images/products/1.jpg',
                created_at: new Date().toISOString()
            }
        ];
        localStorage.setItem(STORE_KEYS.PRODUCTS, JSON.stringify(defaultProducts));
        console.log('[Admin] Seeded default products:', defaultProducts.length);
    }

    if (!isValidArray(STORE_KEYS.NEWSLETTER)) {
        localStorage.setItem(STORE_KEYS.NEWSLETTER, JSON.stringify([]));
    }
    if (!isValidArray(STORE_KEYS.ORDERS)) {
        localStorage.setItem(STORE_KEYS.ORDERS, JSON.stringify([]));
    }

    console.log('[Admin] Data seeding complete');
}

// Main initialization function
async function initializeApp() {
    console.log('[Admin] Initializing admin panel...');
    try {
        // Note: seedDefaultAdmin and seedDefaultData removed - server handles all data
        setupEventListeners();
        await checkAuth();
    } catch (error) {
        console.error('[Admin] Initialization error:', error);
    }
}

// Setup all event listeners after DOM is ready
function setupEventListeners() {
    console.log('[Admin] Setting up event listeners...');

    // Modal close handlers
    const modalClose = document.getElementById('modalClose');
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    const modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) closeModal();
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('modal');
            if (modal && modal.classList.contains('active')) {
                closeModal();
            }
        }
    });

    // Navigation menu
    const menuItems = document.querySelectorAll('.menu-item:not(.logout-btn)');
    const sections = document.querySelectorAll('.section');

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.getAttribute('data-section');

            menuItems.forEach(m => m.classList.remove('active'));
            item.classList.add('active');

            sections.forEach(s => s.classList.remove('active'));
            const sectionEl = document.getElementById(`${section}-section`);
            if (sectionEl) sectionEl.classList.add('active');

            const pageTitle = document.getElementById('pageTitle');
            if (pageTitle) pageTitle.textContent = t(section);

            currentSection = section;
            loadSectionData(section);
        });
    });

    // Add buttons
    const addBannerBtn = document.getElementById('addBannerBtn');
    if (addBannerBtn) {
        addBannerBtn.addEventListener('click', () => showBannerForm());
        console.log('[Admin] Banner button listener attached');
    } else {
        console.warn('[Admin] addBannerBtn not found');
    }

    const addCategoryBtn = document.getElementById('addCategoryBtn');
    if (addCategoryBtn) {
        addCategoryBtn.addEventListener('click', () => showCategoryForm());
        console.log('[Admin] Category button listener attached');
    } else {
        console.warn('[Admin] addCategoryBtn not found');
    }

    const addProductBtn = document.getElementById('addProductBtn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', () => showProductForm());
        console.log('[Admin] Product button listener attached');
    } else {
        console.warn('[Admin] addProductBtn not found');
    }

    const addTestimonialBtn = document.getElementById('addTestimonialBtn');
    if (addTestimonialBtn) {
        addTestimonialBtn.addEventListener('click', () => showTestimonialForm());
        console.log('[Admin] Testimonial button listener attached');
    } else {
        console.warn('[Admin] addTestimonialBtn not found');
    }

    // Order filter
    const orderStatusFilter = document.getElementById('orderStatusFilter');
    if (orderStatusFilter) {
        orderStatusFilter.addEventListener('change', loadOrders);
        console.log('[Admin] Order filter listener attached');
    } else {
        console.warn('[Admin] orderStatusFilter not found');
    }

    console.log('[Admin] Event listeners setup complete');
}

// Only run after DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// ===== GLOBAL VARIABLES =====
let currentSection = 'dashboard';
let categoriesCache = [];

// ===== UTILITY FUNCTIONS =====
function showNotification(message, isError = false) {
    const notification = document.getElementById('notification');
    if (!notification) {
        console.error('[Admin] Notification element not found');
        return;
    }
    notification.textContent = message;
    notification.className = 'notification show';
    if (isError) notification.classList.add('error');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function openModal(content) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    if (!modal || !modalBody) {
        console.error('[Admin] Modal elements not found');
        return;
    }
    modalBody.innerHTML = content;
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.classList.remove('active');
}

// NOTE: Event listeners are now attached in setupEventListeners()

// ===== LOGOUT =====
function setupLogout() {
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await api('/auth/logout', { method: 'POST' });
            } catch (error) {
                console.error('Logout error:', error);
            }
            window.location.href = 'login.html';
        });
    }
}

// ===== INIT =====
async function init() {
    console.log('[Admin] Running init()...');
    try {
        translateUI();
        setupLanguageSelector();
        setupLogout();
        await loadCategories();
        loadSectionData('dashboard');
        console.log('[Admin] Init completed successfully');
    } catch (error) {
        console.error('[Admin] Init error:', error);
    }
}

function setupLanguageSelector() {
    const selector = document.getElementById('languageSelector');
    if (selector) {
        selector.value = currentLanguage;
        selector.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }
}

function translateUI() {
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        el.textContent = t(key);
    });

    const activeMenuItem = document.querySelector('.menu-item.active');
    if (activeMenuItem) {
        const section = activeMenuItem.getAttribute('data-section');
        document.getElementById('pageTitle').textContent = t(section);
    }
}

async function loadSectionData(section) {
    switch(section) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'banners':
            loadBanners();
            break;
        case 'categories':
            loadCategories();
            break;
        case 'products':
            loadProducts();
            break;
        case 'testimonials':
            loadTestimonials();
            break;
        case 'cta':
            loadCTA();
            break;
        case 'newsletter':
            loadNewsletter();
            break;
        case 'orders':
            loadOrders();
            break;
    }
}

// ===== DASHBOARD =====
async function loadDashboard() {
    console.log('[Admin] Loading dashboard...');
    try {
        // Fetch all data in parallel from API
        const [products, orders, subscribers, categories, banners] = await Promise.all([
            api('/products'),
            api('/orders'),
            api('/newsletter/subscribers'),
            api('/categories'),
            api('/banners')
        ]);

        console.log('[Admin] Stats:', {
            products: products.length,
            orders: orders.length,
            subscribers: subscribers.length,
            categories: categories.length,
            banners: banners.length
        });

        const totalProductsEl = document.getElementById('totalProducts');
        const totalOrdersEl = document.getElementById('totalOrders');
        const totalSubscribersEl = document.getElementById('totalSubscribers');
        const totalCategoriesEl = document.getElementById('totalCategories');
        const totalBannersEl = document.getElementById('totalBanners');

        if (totalProductsEl) totalProductsEl.textContent = products.length;
        if (totalOrdersEl) totalOrdersEl.textContent = orders.length;
        if (totalSubscribersEl) totalSubscribersEl.textContent = subscribers.length;
        if (totalCategoriesEl) totalCategoriesEl.textContent = categories.length;
        if (totalBannersEl) totalBannersEl.textContent = banners.length;

    // Show recent orders
    const recentOrders = orders.slice(0, 10);
    const ordersHTML = recentOrders.length > 0 ? `
        <div class="data-table">
            <table>
                <thead>
                    <tr>
                        <th>${t('orderNumber')}</th>
                        <th>${t('customer')}</th>
                        <th>${t('date')}</th>
                        <th>${t('total')}</th>
                        <th>${t('status')}</th>
                    </tr>
                </thead>
                <tbody>
                    ${recentOrders.map(order => `
                        <tr>
                            <td>${escapeHTML(order.order_number)}</td>
                            <td>${escapeHTML(order.customer_data?.firstName || '')} ${escapeHTML(order.customer_data?.lastName || '')}</td>
                            <td>${new Date(order.created_at).toLocaleDateString()}</td>
                            <td>${order.total} BAM</td>
                            <td><span class="status-badge status-${order.status}">${t(order.status)}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    ` : `<p>${t('noItemsFound')}</p>`;

        const recentOrdersEl = document.getElementById('recentOrdersList');
        if (recentOrdersEl) recentOrdersEl.innerHTML = ordersHTML;

        console.log('[Admin] Dashboard loaded successfully');
    } catch (error) {
        console.error('[Admin] Error loading dashboard:', error);
        showNotification('Failed to load dashboard data', true);
    }
}

// ===== BANNERS =====
async function loadBanners() {
    try {
        const banners = await api('/banners');

        const bannersHTML = banners.map(banner => `
            <div class="item-card">
                <img src="${escapeHTML(banner.image_path)}" alt="${escapeHTML(banner.title)}">
                <div class="item-card-content">
                    <h3>${escapeHTML(banner.title)}</h3>
                    <p><strong>${t('subtitle')}:</strong> ${escapeHTML(banner.subtitle)}</p>
                    <p><strong>${t('price')}:</strong> ${escapeHTML(banner.price) || 'N/A'}</p>
                    <p><strong>${t('status')}:</strong> ${banner.active ? t('active') : t('inactive')}</p>
                    <div class="item-actions">
                        <button class="btn-success" onclick="editBanner(${banner.id})">${t('edit')}</button>
                        <button class="btn-danger" onclick="deleteBanner(${banner.id})">${t('delete')}</button>
                    </div>
                </div>
            </div>
        `).join('');

        document.getElementById('bannersListContainer').innerHTML = bannersHTML || `<p>${t('noItemsFound')}</p>`;
    } catch (error) {
        console.error('Error loading banners:', error);
        showNotification('Failed to load banners', true);
    }
}

// Event listener attached in setupEventListeners()

function showBannerForm(banner = null) {
    const formHTML = `
        <h2>${banner ? t('edit') : t('addNewBanner')}</h2>
        <form id="bannerForm">
            <input type="hidden" id="bannerId" value="${banner ? banner.id : ''}">

            <div class="form-group">
                <label>${t('subtitle')}</label>
                <input type="text" id="bannerSubtitle" value="${banner ? banner.subtitle : ''}" required>
            </div>

            <div class="form-group">
                <label>${t('title')}</label>
                <input type="text" id="bannerTitle" value="${banner ? banner.title : ''}" required>
            </div>

            <div class="form-group">
                <label>${t('text')}</label>
                <input type="text" id="bannerText" value="${banner ? banner.text || '' : ''}">
            </div>

            <div class="form-group">
                <label>${t('price')}</label>
                <input type="text" id="bannerPrice" value="${banner ? banner.price || '' : ''}">
            </div>

            <div class="form-group">
                <label>${t('image')}</label>
                <input type="file" id="bannerImage" accept="image/*" ${banner ? '' : 'required'}>
                ${banner ? `<div class="image-preview"><img src="${banner.image_path}"></div>` : ''}
            </div>

            <div class="form-checkbox">
                <input type="checkbox" id="bannerActive" ${!banner || banner.active ? 'checked' : ''}>
                <label for="bannerActive">${t('active')}</label>
            </div>

            <button type="submit" class="btn-primary" style="margin-top: 15px;">${t('save')}</button>
        </form>
    `;

    openModal(formHTML);

    document.getElementById('bannerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await saveBanner();
    });
}

async function saveBanner() {
    const bannerId = document.getElementById('bannerId').value;

    const formData = new FormData();
    formData.append('subtitle', document.getElementById('bannerSubtitle').value);
    formData.append('title', document.getElementById('bannerTitle').value);
    formData.append('text', document.getElementById('bannerText').value || '');
    formData.append('price', document.getElementById('bannerPrice').value || '');
    formData.append('active', document.getElementById('bannerActive').checked ? '1' : '0');

    const imageFile = document.getElementById('bannerImage').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    } else if (!bannerId) {
        showNotification('Please select an image', true);
        return;
    }

    try {
        const url = bannerId ? `/api/banners/${bannerId}` : '/api/banners';
        const method = bannerId ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            credentials: 'include',
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to save banner');
        }

        showNotification(t('successfullySaved'));
        closeModal();
        loadBanners();
    } catch (error) {
        console.error('Error saving banner:', error);
        showNotification(error.message || 'Failed to save banner', true);
    }
}

async function editBanner(id) {
    try {
        const banner = await api(`/banners/${id}`);
        if (banner) showBannerForm(banner);
    } catch (error) {
        console.error('Error loading banner:', error);
        showNotification('Failed to load banner', true);
    }
}

async function deleteBanner(id) {
    if (!confirm(t('areYouSure'))) return;

    try {
        await api(`/banners/${id}`, { method: 'DELETE' });
        showNotification(t('successfullyDeleted'));
        loadBanners();
    } catch (error) {
        console.error('Error deleting banner:', error);
        showNotification('Failed to delete banner', true);
    }
}

// ===== CATEGORIES =====
async function loadCategories() {
    try {
        const categories = await api('/categories');
        categoriesCache = categories;

        if (currentSection === 'categories') {
            const categoriesHTML = categories.map(category => `
                <div class="item-card">
                    ${category.icon_path ? `<img src="${escapeHTML(category.icon_path)}" alt="${escapeHTML(category.name)}">` : '<div style="height:200px;background:#f0f0f0;display:flex;align-items:center;justify-content:center;">No Icon</div>'}
                    <div class="item-card-content">
                        <h3>${escapeHTML(category.name)}</h3>
                        <p><strong>Products:</strong> ${category.product_count || 0}</p>
                        <div class="item-actions">
                            <button class="btn-success" onclick="editCategory(${category.id})">Edit</button>
                            <button class="btn-danger" onclick="deleteCategory(${category.id})">Delete</button>
                        </div>
                    </div>
                </div>
            `).join('');

            document.getElementById('categoriesListContainer').innerHTML = categoriesHTML || '<p>No categories found.</p>';
        }
    } catch (error) {
        console.error('Error loading categories:', error);
        showNotification('Failed to load categories', true);
    }
}

// Event listener attached in setupEventListeners()

function showCategoryForm(category = null) {
    const formHTML = `
        <h2>${category ? 'Edit' : 'Add'} Category</h2>
        <form id="categoryForm">
            <input type="hidden" id="categoryId" value="${category ? category.id : ''}">

            <div class="form-group">
                <label>Name</label>
                <input type="text" id="categoryName" value="${category ? category.name : ''}" required>
            </div>

            <div class="form-group">
                <label>Icon</label>
                <input type="file" id="categoryIcon" accept="image/*">
                ${category && category.icon_path ? `<div class="image-preview"><img src="${category.icon_path}"></div>` : ''}
            </div>

            <button type="submit" class="btn-primary" style="margin-top: 15px;">Save Category</button>
        </form>
    `;

    openModal(formHTML);

    document.getElementById('categoryForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await saveCategory();
    });
}

async function saveCategory() {
    const categoryId = document.getElementById('categoryId').value;

    const formData = new FormData();
    formData.append('name', document.getElementById('categoryName').value);

    const iconFile = document.getElementById('categoryIcon').files[0];
    if (iconFile) {
        formData.append('icon', iconFile);
    }

    try {
        const url = categoryId ? `/api/categories/${categoryId}` : '/api/categories';
        const method = categoryId ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            credentials: 'include',
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to save category');
        }

        showNotification(t('successfullySaved'));
        closeModal();
        loadCategories();
    } catch (error) {
        console.error('Error saving category:', error);
        showNotification(error.message || 'Failed to save category', true);
    }
}

async function editCategory(id) {
    try {
        const category = await api(`/categories/${id}`);
        if (category) showCategoryForm(category);
    } catch (error) {
        console.error('Error loading category:', error);
        showNotification('Failed to load category', true);
    }
}

async function deleteCategory(id) {
    if (!confirm(t('areYouSure'))) return;

    try {
        await api(`/categories/${id}`, { method: 'DELETE' });
        showNotification(t('successfullyDeleted'));
        loadCategories();
    } catch (error) {
        console.error('Error deleting category:', error);
        showNotification(error.message || 'Failed to delete category', true);
    }
}

// ===== PRODUCTS =====
async function loadProducts() {
    try {
        const products = await api('/products');
        const categories = await api('/categories');

        const productsHTML = products.map(product => {
            const category = categories.find(c => c.id === product.category_id);
            return `
            <div class="item-card">
                <img src="${product.image_path}" alt="${escapeHTML(product.name)}">
                <div class="item-card-content">
                    <h3>${escapeHTML(product.name)}</h3>
                    <p><strong>Category:</strong> ${escapeHTML(category?.name || 'Uncategorized')}</p>
                    <p><strong>Price:</strong> ${product.price} BAM ${product.old_price ? `<del>${product.old_price} BAM</del>` : ''}</p>
                    <p><strong>Stock:</strong> ${product.stock}</p>
                    <p>${product.best_seller ? '<span class="status-badge status-delivered">Best Seller</span>' : ''} ${product.featured ? '<span class="status-badge status-processing">Featured</span>' : ''}</p>
                    <div class="item-actions">
                        <button class="btn-success" onclick="editProduct(${product.id})">Edit</button>
                        <button class="btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                    </div>
                </div>
            </div>
        `;
        }).join('');

        document.getElementById('productsListContainer').innerHTML = productsHTML || '<p>No products found.</p>';
    } catch (error) {
        console.error('Error loading products:', error);
        showNotification('Failed to load products', true);
    }
}

// Event listener attached in setupEventListeners()

function showProductForm(product = null) {
    const categoriesOptions = categoriesCache.map(cat =>
        `<option value="${cat.id}" ${product && product.category_id === cat.id ? 'selected' : ''}>${cat.name}</option>`
    ).join('');

    const formHTML = `
        <h2>${product ? 'Edit' : 'Add'} Product</h2>
        <form id="productForm">
            <input type="hidden" id="productId" value="${product ? product.id : ''}">

            <div class="form-group">
                <label>Name</label>
                <input type="text" id="productName" value="${product ? product.name : ''}" required>
            </div>

            <div class="form-group">
                <label>Category</label>
                <select id="productCategory">
                    <option value="">Uncategorized</option>
                    ${categoriesOptions}
                </select>
            </div>

            <div class="form-group">
                <label>Price (BAM)</label>
                <input type="number" step="0.01" min="0" id="productPrice" value="${product ? product.price : ''}" required>
            </div>

            <div class="form-group">
                <label>Old Price (BAM) - Optional</label>
                <input type="number" step="0.01" min="0" id="productOldPrice" value="${product ? product.old_price || '' : ''}">
            </div>

            <div class="form-group">
                <label>Discount %</label>
                <input type="number" min="0" max="100" id="productDiscount" value="${product ? product.discount_percentage : 0}">
            </div>

            <div class="form-group">
                <label>Description</label>
                <textarea id="productDescription">${product ? escapeHTML(product.description) || '' : ''}</textarea>
            </div>

            <div class="form-group">
                <label>Stock</label>
                <input type="number" min="0" id="productStock" value="${product ? product.stock : 0}" required>
            </div>

            <div class="form-group">
                <label>Image</label>
                <input type="file" id="productImage" accept="image/*" ${product ? '' : 'required'}>
                ${product ? `<div class="image-preview"><img src="${product.image_path}"></div>` : ''}
            </div>

            <div class="form-checkbox">
                <input type="checkbox" id="productFeatured" ${product && product.featured ? 'checked' : ''}>
                <label for="productFeatured">Featured</label>
            </div>

            <div class="form-checkbox">
                <input type="checkbox" id="productBestSeller" ${product && product.best_seller ? 'checked' : ''}>
                <label for="productBestSeller">Best Seller</label>
            </div>

            <button type="submit" class="btn-primary" style="margin-top: 15px;">Save Product</button>
        </form>
    `;

    openModal(formHTML);

    document.getElementById('productForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await saveProduct();
    });
}

async function saveProduct() {
    const productId = document.getElementById('productId').value;

    const formData = new FormData();
    formData.append('name', document.getElementById('productName').value);
    formData.append('category_id', document.getElementById('productCategory').value || '');
    formData.append('price', document.getElementById('productPrice').value);
    formData.append('old_price', document.getElementById('productOldPrice').value || '');
    formData.append('discount_percentage', document.getElementById('productDiscount').value || '0');
    formData.append('description', document.getElementById('productDescription').value || '');
    formData.append('stock', document.getElementById('productStock').value || '0');
    formData.append('featured', document.getElementById('productFeatured').checked ? '1' : '0');
    formData.append('best_seller', document.getElementById('productBestSeller').checked ? '1' : '0');

    const imageFile = document.getElementById('productImage').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    } else if (!productId) {
        showNotification('Please select an image', true);
        return;
    }

    try {
        const url = productId ? `/api/products/${productId}` : '/api/products';
        const method = productId ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            credentials: 'include',
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to save product');
        }

        showNotification(t('successfullySaved'));
        closeModal();
        loadProducts();
    } catch (error) {
        console.error('Error saving product:', error);
        showNotification(error.message || 'Failed to save product', true);
    }
}

function updateCategoryProductCounts() {
    const products = JSON.parse(localStorage.getItem(STORE_KEYS.PRODUCTS)) || [];
    const categories = JSON.parse(localStorage.getItem(STORE_KEYS.CATEGORIES)) || [];

    categories.forEach(cat => {
        cat.product_count = products.filter(p => p.category_id === cat.id).length;
    });

    localStorage.setItem(STORE_KEYS.CATEGORIES, JSON.stringify(categories));
    categoriesCache = categories;
}

async function editProduct(id) {
    try {
        const product = await api(`/products/${id}`);
        if (product) showProductForm(product);
    } catch (error) {
        console.error('Error loading product:', error);
        showNotification('Failed to load product', true);
    }
}

async function deleteProduct(id) {
    if (!confirm(t('areYouSure'))) return;

    try {
        await api(`/products/${id}`, { method: 'DELETE' });
        showNotification(t('successfullyDeleted'));
        loadProducts();
    } catch (error) {
        console.error('Error deleting product:', error);
        showNotification('Failed to delete product', true);
    }
}

// ===== TESTIMONIALS =====
function loadTestimonials() {
    api('/testimonials').then(testimonials => {
        const testimonialsHTML = testimonials.map(testimonial => `
            <div class="item-card">
                ${testimonial.image_path ? `<img src="${escapeHTML(testimonial.image_path)}" alt="${escapeHTML(testimonial.customer_name)}">` : '<div style="height:200px;background:#f0f0f0;display:flex;align-items:center;justify-content:center;">No Image</div>'}
                <div class="item-card-content">
                    <h3>${escapeHTML(testimonial.customer_name)}</h3>
                    <p><strong>Role:</strong> ${escapeHTML(testimonial.customer_role) || 'Customer'}</p>
                    <p>${escapeHTML(testimonial.text?.substring(0, 100))}...</p>
                    <p><strong>Rating:</strong> ${testimonial.rating}/5</p>
                    <p><strong>Status:</strong> ${testimonial.active ? 'Active' : 'Inactive'}</p>
                    <div class="item-actions">
                        <button class="btn-success" onclick="editTestimonial(${testimonial.id})">Edit</button>
                        <button class="btn-danger" onclick="deleteTestimonial(${testimonial.id})">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');

        document.getElementById('testimonialsListContainer').innerHTML = testimonialsHTML || '<p>No testimonials found.</p>';
    }).catch(error => {
        console.error('Error loading testimonials:', error);
        showNotification('Failed to load testimonials', true);
    });
}

// Event listener attached in setupEventListeners()

function showTestimonialForm(testimonial = null) {
    const formHTML = `
        <h2>${testimonial ? 'Edit' : 'Add'} Testimonial</h2>
        <form id="testimonialForm">
            <input type="hidden" id="testimonialId" value="${testimonial ? testimonial.id : ''}">

            <div class="form-group">
                <label>Customer Name</label>
                <input type="text" id="testimonialName" value="${testimonial ? testimonial.customer_name : ''}" required>
            </div>

            <div class="form-group">
                <label>Customer Role</label>
                <input type="text" id="testimonialRole" value="${testimonial ? testimonial.customer_role || '' : ''}">
            </div>

            <div class="form-group">
                <label>Testimonial Text</label>
                <textarea id="testimonialText" required>${testimonial ? testimonial.text : ''}</textarea>
            </div>

            <div class="form-group">
                <label>Rating (1-5)</label>
                <input type="number" min="1" max="5" id="testimonialRating" value="${testimonial ? testimonial.rating : 5}" required>
            </div>

            <div class="form-group">
                <label>Customer Image (Optional)</label>
                <input type="file" id="testimonialImage" accept="image/*">
                ${testimonial && testimonial.image_path ? `<div class="image-preview"><img src="${testimonial.image_path}"></div>` : ''}
            </div>

            <div class="form-checkbox">
                <input type="checkbox" id="testimonialActive" ${!testimonial || testimonial.active ? 'checked' : ''}>
                <label for="testimonialActive">Active</label>
            </div>

            <button type="submit" class="btn-primary" style="margin-top: 15px;">Save Testimonial</button>
        </form>
    `;

    openModal(formHTML);

    document.getElementById('testimonialForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await saveTestimonial();
    });
}

async function saveTestimonial() {
    const testimonialId = document.getElementById('testimonialId').value;

    const formData = new FormData();
    formData.append('customer_name', document.getElementById('testimonialName').value);
    formData.append('customer_role', document.getElementById('testimonialRole').value || '');
    formData.append('text', document.getElementById('testimonialText').value);
    formData.append('rating', document.getElementById('testimonialRating').value);
    formData.append('active', document.getElementById('testimonialActive').checked ? '1' : '0');

    const imageFile = document.getElementById('testimonialImage').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }

    try {
        const url = testimonialId ? `/api/testimonials/${testimonialId}` : '/api/testimonials';
        const method = testimonialId ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            credentials: 'include',
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to save testimonial');
        }

        showNotification(t('successfullySaved'));
        closeModal();
        loadTestimonials();
    } catch (error) {
        console.error('Error saving testimonial:', error);
        showNotification(error.message || 'Failed to save testimonial', true);
    }
}

async function editTestimonial(id) {
    try {
        const testimonial = await api(`/testimonials/${id}`);
        if (testimonial) showTestimonialForm(testimonial);
    } catch (error) {
        console.error('Error loading testimonial:', error);
        showNotification('Failed to load testimonial', true);
    }
}

async function deleteTestimonial(id) {
    if (!confirm(t('areYouSure'))) return;

    try {
        await api(`/testimonials/${id}`, { method: 'DELETE' });
        showNotification(t('successfullyDeleted'));
        loadTestimonials();
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        showNotification('Failed to delete testimonial', true);
    }
}

// ===== CTA CONTENT =====
async function loadCTA() {
    try {
        const cta = await api('/cta') || {};

        const formHTML = `
            <h2 data-translate="ctaContent">${t('ctaContent')}</h2>
            <form id="ctaForm">
                <div class="form-group">
                    <label data-translate="heading">${t('heading')}</label>
                    <input type="text" id="ctaHeading" value="${escapeHTML(cta?.heading || '')}" required>
                </div>

                <div class="form-group">
                    <label data-translate="subheading">${t('subheading')}</label>
                    <input type="text" id="ctaSubheading" value="${escapeHTML(cta?.subheading || '')}">
                </div>

                <div class="form-group">
                    <label data-translate="text">${t('text')}</label>
                    <textarea id="ctaText">${escapeHTML(cta?.text || '')}</textarea>
                </div>

                <div class="form-group">
                    <label data-translate="buttonText">${t('buttonText')}</label>
                    <input type="text" id="ctaButtonText" value="${escapeHTML(cta?.button_text || '')}">
                </div>

                <div class="form-group">
                    <label data-translate="backgroundImage">${t('backgroundImage')}</label>
                    <input type="file" id="ctaImage" accept="image/*">
                    ${cta && cta.image_path ? `<div class="image-preview"><img src="${escapeHTML(cta.image_path)}"></div>` : ''}
                </div>

                <div class="form-checkbox">
                    <input type="checkbox" id="ctaActive" ${!cta || cta.active ? 'checked' : ''}>
                    <label for="ctaActive">${t('active')}</label>
                </div>

                <button type="submit" class="btn-primary" data-translate="saveCTAContent">${t('saveCTAContent')}</button>
            </form>
        `;

        document.getElementById('ctaFormContainer').innerHTML = formHTML;

        document.getElementById('ctaForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            await saveCTA();
        });
    } catch (error) {
        console.error('Error loading CTA:', error);
        showNotification('Failed to load CTA content', true);
    }
}

async function saveCTA() {
    const formData = new FormData();
    formData.append('heading', document.getElementById('ctaHeading').value);
    formData.append('subheading', document.getElementById('ctaSubheading').value);
    formData.append('text', document.getElementById('ctaText').value);
    formData.append('button_text', document.getElementById('ctaButtonText').value);

    const imageFile = document.getElementById('ctaImage').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }

    try {
        const response = await fetch('/api/cta', {
            method: 'PUT',
            credentials: 'include',
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to save CTA');
        }

        showNotification(t('ctaContentUpdated'));
        loadCTA();
    } catch (error) {
        console.error('Error saving CTA:', error);
        showNotification(error.message || 'Failed to save CTA', true);
    }
}

// ===== NEWSLETTER =====
async function loadNewsletter() {
    try {
        const subscribers = await api('/newsletter/subscribers');

        const tableHTML = `
            <div class="data-table">
                <table>
                    <thead>
                        <tr>
                            <th data-translate="email">${t('email')}</th>
                            <th data-translate="subscribedDate">${t('subscribedDate')}</th>
                            <th data-translate="discountGiven">${t('discountGiven')}</th>
                            <th data-translate="discountAmount">${t('discountAmount')}</th>
                            <th data-translate="actions">${t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${subscribers.map(sub => `
                            <tr>
                                <td>${escapeHTML(sub.email)}</td>
                                <td>${new Date(sub.subscribed_at).toLocaleDateString()}</td>
                                <td>${sub.discount_given ? t('yes') : t('no')}</td>
                                <td>${sub.discount_amount || 0}%</td>
                                <td>
                                    ${!sub.discount_given ? `<button class="btn-success" onclick="giveDiscount(${sub.id})" data-translate="giveDiscount">${t('giveDiscount')}</button>` : ''}
                                    <button class="btn-danger" onclick="deleteSubscriber(${sub.id})" data-translate="delete">${t('delete')}</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('newsletterListContainer').innerHTML = subscribers.length > 0 ? tableHTML : `<p data-translate="noSubscribers">${t('noSubscribers')}</p>`;
    } catch (error) {
        console.error('Error loading newsletter:', error);
        showNotification('Failed to load newsletter subscribers', true);
    }
}

async function giveDiscount(id) {
    const discount = prompt(t('enterDiscountPercentage'));
    if (!discount) return;

    try {
        await api(`/newsletter/${id}/discount`, {
            method: 'PUT',
            body: JSON.stringify({ discount_amount: parseInt(discount) })
        });
        showNotification(t('discountAssigned'));
        loadNewsletter();
    } catch (error) {
        console.error('Error giving discount:', error);
        showNotification('Failed to assign discount', true);
    }
}

async function deleteSubscriber(id) {
    if (!confirm(t('areYouSure'))) return;

    try {
        await api(`/newsletter/${id}`, { method: 'DELETE' });
        showNotification(t('successfullyDeleted'));
        loadNewsletter();
    } catch (error) {
        console.error('Error deleting subscriber:', error);
        showNotification('Failed to delete subscriber', true);
    }
}

// ===== ORDERS =====
async function loadOrders() {
    try {
        const filter = document.getElementById('orderStatusFilter').value;
        let orders = await api('/orders');

        if (filter) {
            orders = orders.filter(o => o.status === filter);
        }

        const tableHTML = `
            <div class="data-table">
                <table>
                    <thead>
                        <tr>
                            <th data-translate="orderNumber">${t('orderNumber')}</th>
                            <th data-translate="customer">${t('customer')}</th>
                            <th data-translate="email">${t('email')}</th>
                            <th data-translate="date">${t('date')}</th>
                            <th data-translate="total">${t('total')}</th>
                            <th data-translate="status">${t('status')}</th>
                            <th data-translate="actions">${t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${orders.map(order => `
                            <tr>
                                <td>${escapeHTML(order.order_number)}</td>
                                <td>${escapeHTML(order.customer_name || '')}</td>
                                <td>${escapeHTML(order.customer_email || '')}</td>
                                <td>${new Date(order.created_at).toLocaleDateString()}</td>
                                <td>${order.total} BAM</td>
                                <td><span class="status-badge status-${order.status}" data-translate="${order.status}">${t(order.status)}</span></td>
                                <td>
                                    <button class="btn-success" onclick="viewOrder(${order.id})" data-translate="view">${t('view')}</button>
                                    <button class="btn-primary" onclick="updateOrderStatus(${order.id}, '${order.status}')" data-translate="updateStatus">${t('updateStatus')}</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        document.getElementById('ordersListContainer').innerHTML = orders.length > 0 ? tableHTML : `<p data-translate="noOrdersFound">${t('noOrdersFound')}</p>`;
    } catch (error) {
        console.error('Error loading orders:', error);
        showNotification('Failed to load orders', true);
    }
}

// Event listener attached in setupEventListeners()

async function viewOrder(id) {
    try {
        const order = await api(`/orders/${id}`);
        if (!order) return;

        const modalHTML = `
            <h2>${t('orderDetails')} - ${escapeHTML(order.order_number)}</h2>
            <div>
                <h3>${t('customerInformation')}</h3>
                <p><strong>${t('name')}:</strong> ${escapeHTML(order.customer_name || '')}</p>
                <p><strong>${t('email')}:</strong> ${escapeHTML(order.customer_email || '')}</p>
                <p><strong>${t('phone')}:</strong> ${escapeHTML(order.customer_phone || '')}</p>
                <p><strong>${t('address')}:</strong> ${escapeHTML(order.shipping_address || '')}</p>

                <h3>${t('orderSummary')}</h3>
                <p><strong>${t('total')}:</strong> ${order.total} BAM</p>
                <p><strong>${t('status')}:</strong> <span class="status-badge status-${order.status}">${t(order.status)}</span></p>
                <p><strong>${t('orderDate')}:</strong> ${new Date(order.created_at).toLocaleString()}</p>
            </div>
        `;

        openModal(modalHTML);
    } catch (error) {
        console.error('Error loading order:', error);
        showNotification('Failed to load order details', true);
    }
}

async function updateOrderStatus(id, currentStatus) {
    const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

    const modalHTML = `
        <h2>${t('updateStatus')}</h2>
        <form id="statusForm">
            <div class="form-group">
                <label>${t('status')}</label>
                <select id="newStatus" required>
                    ${statuses.map(s => `<option value="${s}" ${s === currentStatus ? 'selected' : ''}>${t(s)}</option>`).join('')}
                </select>
            </div>
            <button type="submit" class="btn-primary" style="margin-top: 15px;">${t('save')}</button>
        </form>
    `;

    openModal(modalHTML);

    document.getElementById('statusForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const newStatus = document.getElementById('newStatus').value;

        try {
            await api(`/orders/${id}/status`, {
                method: 'PUT',
                body: { status: newStatus }
            });
            showNotification(t('orderStatusUpdated'));
            closeModal();
            loadOrders();
        } catch (error) {
            console.error('Error updating order status:', error);
            showNotification('Failed to update order status', true);
        }
    });
}

// Make functions global
window.editBanner = editBanner;
window.deleteBanner = deleteBanner;
window.editCategory = editCategory;
window.deleteCategory = deleteCategory;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.editTestimonial = editTestimonial;
window.deleteTestimonial = deleteTestimonial;
window.giveDiscount = giveDiscount;
window.deleteSubscriber = deleteSubscriber;
window.viewOrder = viewOrder;
window.updateOrderStatus = updateOrderStatus;
