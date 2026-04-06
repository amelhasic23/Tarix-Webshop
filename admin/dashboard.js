// ===== LOCALSTORAGE KEYS =====
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
        errorSavingCTA: 'Error saving CTA'
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
        errorSavingCTA: 'Fehler beim Speichern des CTA'
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
        errorSavingCTA: 'Greška pri čuvanju CTA'
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

// ===== AUTH CHECK (localStorage based) =====
async function checkAuth() {
    const session = JSON.parse(localStorage.getItem(STORE_KEYS.ADMIN_SESSION));

    if (!session || !session.username || Date.now() > session.expiresAt) {
        // No valid session - redirect to login
        window.location.href = 'login.html';
        return;
    }

    // Valid session - show admin username and init
    document.getElementById('adminUsername').textContent = session.username;
    init();
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

// Seed default data if localStorage is empty
function seedDefaultData() {
    // Seed categories
    if (!localStorage.getItem(STORE_KEYS.CATEGORIES)) {
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
    }

    // Seed testimonials
    if (!localStorage.getItem(STORE_KEYS.TESTIMONIALS)) {
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
    }

    // Initialize empty arrays if not present
    if (!localStorage.getItem(STORE_KEYS.BANNERS)) {
        localStorage.setItem(STORE_KEYS.BANNERS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORE_KEYS.PRODUCTS)) {
        localStorage.setItem(STORE_KEYS.PRODUCTS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORE_KEYS.NEWSLETTER)) {
        localStorage.setItem(STORE_KEYS.NEWSLETTER, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORE_KEYS.ORDERS)) {
        localStorage.setItem(STORE_KEYS.ORDERS, JSON.stringify([]));
    }
}

// Only run checkAuth after DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', async () => {
        await seedDefaultAdmin();
        seedDefaultData();
        checkAuth();
    });
} else {
    (async () => {
        await seedDefaultAdmin();
        seedDefaultData();
        checkAuth();
    })();
}

// ===== GLOBAL VARIABLES =====
let currentSection = 'dashboard';
let categoriesCache = [];

// ===== UTILITY FUNCTIONS =====
function showNotification(message, isError = false) {
    const notification = document.getElementById('notification');
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
    modalBody.innerHTML = content;
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
}

document.getElementById('modalClose').addEventListener('click', closeModal);

// Close modal by clicking overlay
document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('modal');
        if (modal && modal.classList.contains('active')) {
            closeModal();
        }
    }
});

// ===== NAVIGATION =====
const menuItems = document.querySelectorAll('.menu-item:not(.logout-btn)');
const sections = document.querySelectorAll('.section');

menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.getAttribute('data-section');

        menuItems.forEach(m => m.classList.remove('active'));
        item.classList.add('active');

        sections.forEach(s => s.classList.remove('active'));
        document.getElementById(`${section}-section`).classList.add('active');

        document.getElementById('pageTitle').textContent = t(section);

        currentSection = section;
        loadSectionData(section);
    });
});

// ===== LOGOUT =====
function setupLogout() {
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem(STORE_KEYS.ADMIN_SESSION);
            window.location.href = 'login.html';
        });
    }
}

// ===== INIT =====
async function init() {
    translateUI();
    setupLanguageSelector();
    setupLogout();
    await loadCategories();
    loadSectionData('dashboard');
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
function loadDashboard() {
    const products = JSON.parse(localStorage.getItem(STORE_KEYS.PRODUCTS)) || [];
    const orders = JSON.parse(localStorage.getItem(STORE_KEYS.ORDERS)) || [];
    const subscribers = JSON.parse(localStorage.getItem(STORE_KEYS.NEWSLETTER)) || [];
    const categories = JSON.parse(localStorage.getItem(STORE_KEYS.CATEGORIES)) || [];

    document.getElementById('totalProducts').textContent = products.length;
    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('totalSubscribers').textContent = subscribers.length;
    document.getElementById('totalCategories').textContent = categories.length;

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
                            <td>${order.order_number}</td>
                            <td>${order.customer_data?.firstName || ''} ${order.customer_data?.lastName || ''}</td>
                            <td>${new Date(order.created_at).toLocaleDateString()}</td>
                            <td>${order.total} BAM</td>
                            <td><span class="status-badge status-${order.status}">${t(order.status)}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    ` : `<p>${t('noItemsFound')}</p>`;

    document.getElementById('recentOrdersList').innerHTML = ordersHTML;
}

// ===== BANNERS =====
function loadBanners() {
    const banners = safeJsonParse(localStorage.getItem(STORE_KEYS.BANNERS), []);

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
}

document.getElementById('addBannerBtn').addEventListener('click', () => showBannerForm());

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
    const banners = JSON.parse(localStorage.getItem(STORE_KEYS.BANNERS)) || [];

    const bannerData = {
        subtitle: document.getElementById('bannerSubtitle').value,
        title: document.getElementById('bannerTitle').value,
        text: document.getElementById('bannerText').value,
        price: document.getElementById('bannerPrice').value,
        active: document.getElementById('bannerActive').checked ? 1 : 0
    };

    const imageFile = document.getElementById('bannerImage').files[0];
    if (imageFile) {
        bannerData.image_path = await compressImage(imageFile, 1200);
    }

    if (bannerId) {
        // Update existing
        const idx = banners.findIndex(b => b.id === parseInt(bannerId));
        if (idx !== -1) {
            banners[idx] = { ...banners[idx], ...bannerData };
        }
    } else {
        // Create new
        bannerData.id = Date.now();
        bannerData.created_at = new Date().toISOString();
        if (!bannerData.image_path) {
            showNotification('Please select an image', true);
            return;
        }
        banners.push(bannerData);
    }

    if (safeSetItem(STORE_KEYS.BANNERS, JSON.stringify(banners))) {
        showNotification(t('successfullySaved'));
        closeModal();
        loadBanners();
    }
}

function editBanner(id) {
    const banners = JSON.parse(localStorage.getItem(STORE_KEYS.BANNERS)) || [];
    const banner = banners.find(b => b.id === id);
    if (banner) showBannerForm(banner);
}

function deleteBanner(id) {
    if (!confirm(t('areYouSure'))) return;

    let banners = JSON.parse(localStorage.getItem(STORE_KEYS.BANNERS)) || [];
    banners = banners.filter(b => b.id !== id);
    localStorage.setItem(STORE_KEYS.BANNERS, JSON.stringify(banners));
    showNotification(t('successfullyDeleted'));
    loadBanners();
}

// ===== CATEGORIES =====
function loadCategories() {
    const categories = safeJsonParse(localStorage.getItem(STORE_KEYS.CATEGORIES), []);
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
}

document.getElementById('addCategoryBtn').addEventListener('click', () => showCategoryForm());

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
    const categories = JSON.parse(localStorage.getItem(STORE_KEYS.CATEGORIES)) || [];

    const categoryData = {
        name: document.getElementById('categoryName').value
    };

    const iconFile = document.getElementById('categoryIcon').files[0];
    if (iconFile) {
        categoryData.icon_path = await compressImage(iconFile, 100);
    }

    if (categoryId) {
        // Update existing
        const idx = categories.findIndex(c => c.id === parseInt(categoryId));
        if (idx !== -1) {
            categories[idx] = { ...categories[idx], ...categoryData };
        }
    } else {
        // Create new
        categoryData.id = Date.now();
        categoryData.product_count = 0;
        categoryData.order_position = categories.length;
        categoryData.created_at = new Date().toISOString();
        categories.push(categoryData);
    }

    if (safeSetItem(STORE_KEYS.CATEGORIES, JSON.stringify(categories))) {
        showNotification(t('successfullySaved'));
        closeModal();
        loadCategories();
    }
}

function editCategory(id) {
    const categories = JSON.parse(localStorage.getItem(STORE_KEYS.CATEGORIES)) || [];
    const category = categories.find(c => c.id === id);
    if (category) showCategoryForm(category);
}

function deleteCategory(id) {
    if (!confirm(t('areYouSure'))) return;

    let categories = JSON.parse(localStorage.getItem(STORE_KEYS.CATEGORIES)) || [];
    categories = categories.filter(c => c.id !== id);
    localStorage.setItem(STORE_KEYS.CATEGORIES, JSON.stringify(categories));
    showNotification(t('successfullyDeleted'));
    loadCategories();
}

// ===== PRODUCTS =====
function loadProducts() {
    const products = JSON.parse(localStorage.getItem(STORE_KEYS.PRODUCTS)) || [];
    const categories = JSON.parse(localStorage.getItem(STORE_KEYS.CATEGORIES)) || [];

    const productsHTML = products.map(product => {
        const category = categories.find(c => c.id === product.category_id);
        return `
            <div class="item-card">
                <img src="${product.image_path}" alt="${product.name}">
                <div class="item-card-content">
                    <h3>${product.name}</h3>
                    <p><strong>Category:</strong> ${category?.name || 'Uncategorized'}</p>
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
}

document.getElementById('addProductBtn').addEventListener('click', () => showProductForm());

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
    const products = JSON.parse(localStorage.getItem(STORE_KEYS.PRODUCTS)) || [];

    const productData = {
        name: document.getElementById('productName').value,
        category_id: document.getElementById('productCategory').value ? parseInt(document.getElementById('productCategory').value) : null,
        price: parseFloat(document.getElementById('productPrice').value),
        old_price: document.getElementById('productOldPrice').value ? parseFloat(document.getElementById('productOldPrice').value) : null,
        discount_percentage: parseInt(document.getElementById('productDiscount').value) || 0,
        description: document.getElementById('productDescription').value,
        stock: parseInt(document.getElementById('productStock').value),
        featured: document.getElementById('productFeatured').checked ? 1 : 0,
        best_seller: document.getElementById('productBestSeller').checked ? 1 : 0
    };

    const imageFile = document.getElementById('productImage').files[0];
    if (imageFile) {
        productData.image_path = await compressImage(imageFile, 600);
    }

    if (productId) {
        // Update existing
        const idx = products.findIndex(p => p.id === parseInt(productId));
        if (idx !== -1) {
            products[idx] = { ...products[idx], ...productData };
        }
    } else {
        // Create new
        productData.id = Date.now();
        productData.rating = 5;
        productData.created_at = new Date().toISOString();
        if (!productData.image_path) {
            showNotification('Please select an image', true);
            return;
        }
        products.push(productData);
    }

    if (safeSetItem(STORE_KEYS.PRODUCTS, JSON.stringify(products))) {
        showNotification(t('successfullySaved'));
        closeModal();
        loadProducts();
        updateCategoryProductCounts();
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

function editProduct(id) {
    const products = JSON.parse(localStorage.getItem(STORE_KEYS.PRODUCTS)) || [];
    const product = products.find(p => p.id === id);
    if (product) showProductForm(product);
}

function deleteProduct(id) {
    if (!confirm(t('areYouSure'))) return;

    let products = JSON.parse(localStorage.getItem(STORE_KEYS.PRODUCTS)) || [];
    products = products.filter(p => p.id !== id);
    localStorage.setItem(STORE_KEYS.PRODUCTS, JSON.stringify(products));
    showNotification(t('successfullyDeleted'));
    loadProducts();
    updateCategoryProductCounts();
}

// ===== TESTIMONIALS =====
function loadTestimonials() {
    const testimonials = JSON.parse(localStorage.getItem(STORE_KEYS.TESTIMONIALS)) || [];

    const testimonialsHTML = testimonials.map(testimonial => `
        <div class="item-card">
            ${testimonial.image_path ? `<img src="${testimonial.image_path}" alt="${testimonial.customer_name}">` : '<div style="height:200px;background:#f0f0f0;display:flex;align-items:center;justify-content:center;">No Image</div>'}
            <div class="item-card-content">
                <h3>${testimonial.customer_name}</h3>
                <p><strong>Role:</strong> ${testimonial.customer_role || 'Customer'}</p>
                <p>${testimonial.text.substring(0, 100)}...</p>
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
}

document.getElementById('addTestimonialBtn').addEventListener('click', () => showTestimonialForm());

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
    const testimonials = JSON.parse(localStorage.getItem(STORE_KEYS.TESTIMONIALS)) || [];

    const testimonialData = {
        customer_name: document.getElementById('testimonialName').value,
        customer_role: document.getElementById('testimonialRole').value,
        text: document.getElementById('testimonialText').value,
        rating: parseInt(document.getElementById('testimonialRating').value),
        active: document.getElementById('testimonialActive').checked ? 1 : 0
    };

    const imageFile = document.getElementById('testimonialImage').files[0];
    if (imageFile) {
        testimonialData.image_path = await compressImage(imageFile, 200);
    }

    if (testimonialId) {
        // Update existing
        const idx = testimonials.findIndex(t => t.id === parseInt(testimonialId));
        if (idx !== -1) {
            testimonials[idx] = { ...testimonials[idx], ...testimonialData };
        }
    } else {
        // Create new
        testimonialData.id = Date.now();
        testimonialData.order_position = testimonials.length;
        testimonialData.created_at = new Date().toISOString();
        testimonials.push(testimonialData);
    }

    if (safeSetItem(STORE_KEYS.TESTIMONIALS, JSON.stringify(testimonials))) {
        showNotification(t('successfullySaved'));
        closeModal();
        loadTestimonials();
    }
}

function editTestimonial(id) {
    const testimonials = JSON.parse(localStorage.getItem(STORE_KEYS.TESTIMONIALS)) || [];
    const testimonial = testimonials.find(t => t.id === id);
    if (testimonial) showTestimonialForm(testimonial);
}

function deleteTestimonial(id) {
    if (!confirm(t('areYouSure'))) return;

    let testimonials = JSON.parse(localStorage.getItem(STORE_KEYS.TESTIMONIALS)) || [];
    testimonials = testimonials.filter(t => t.id !== id);
    localStorage.setItem(STORE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    showNotification(t('successfullyDeleted'));
    loadTestimonials();
}

// ===== CTA CONTENT =====
function loadCTA() {
    const cta = JSON.parse(localStorage.getItem(STORE_KEYS.CTA)) || {};

    const formHTML = `
        <h2 data-translate="ctaContent">${t('ctaContent')}</h2>
        <form id="ctaForm">
            <div class="form-group">
                <label data-translate="heading">${t('heading')}</label>
                <input type="text" id="ctaHeading" value="${cta?.heading || ''}" required>
            </div>

            <div class="form-group">
                <label data-translate="subheading">${t('subheading')}</label>
                <input type="text" id="ctaSubheading" value="${cta?.subheading || ''}">
            </div>

            <div class="form-group">
                <label data-translate="text">${t('text')}</label>
                <textarea id="ctaText">${cta?.text || ''}</textarea>
            </div>

            <div class="form-group">
                <label data-translate="buttonText">${t('buttonText')}</label>
                <input type="text" id="ctaButtonText" value="${cta?.button_text || ''}">
            </div>

            <div class="form-group">
                <label data-translate="backgroundImage">${t('backgroundImage')}</label>
                <input type="file" id="ctaImage" accept="image/*">
                ${cta && cta.image_path ? `<div class="image-preview"><img src="${cta.image_path}"></div>` : ''}
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
}

async function saveCTA() {
    let cta = JSON.parse(localStorage.getItem(STORE_KEYS.CTA)) || { id: 1 };

    cta.heading = document.getElementById('ctaHeading').value;
    cta.subheading = document.getElementById('ctaSubheading').value;
    cta.text = document.getElementById('ctaText').value;
    cta.button_text = document.getElementById('ctaButtonText').value;
    cta.active = document.getElementById('ctaActive').checked ? 1 : 0;
    cta.updated_at = new Date().toISOString();

    const imageFile = document.getElementById('ctaImage').files[0];
    if (imageFile) {
        cta.image_path = await compressImage(imageFile, 1200);
    }

    if (safeSetItem(STORE_KEYS.CTA, JSON.stringify(cta))) {
        showNotification(t('ctaContentUpdated'));
        loadCTA();
    }
}

// ===== NEWSLETTER =====
function loadNewsletter() {
    const subscribers = JSON.parse(localStorage.getItem(STORE_KEYS.NEWSLETTER)) || [];

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
                            <td>${sub.email}</td>
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
}

function giveDiscount(id) {
    const discount = prompt(t('enterDiscountPercentage'));
    if (!discount) return;

    const subscribers = JSON.parse(localStorage.getItem(STORE_KEYS.NEWSLETTER)) || [];
    const idx = subscribers.findIndex(s => s.id === id);
    if (idx !== -1) {
        subscribers[idx].discount_given = true;
        subscribers[idx].discount_amount = parseInt(discount);
        localStorage.setItem(STORE_KEYS.NEWSLETTER, JSON.stringify(subscribers));
        showNotification(t('discountAssigned'));
        loadNewsletter();
    }
}

function deleteSubscriber(id) {
    if (!confirm(t('areYouSure'))) return;

    let subscribers = JSON.parse(localStorage.getItem(STORE_KEYS.NEWSLETTER)) || [];
    subscribers = subscribers.filter(s => s.id !== id);
    localStorage.setItem(STORE_KEYS.NEWSLETTER, JSON.stringify(subscribers));
    showNotification(t('successfullyDeleted'));
    loadNewsletter();
}

// ===== ORDERS =====
function loadOrders() {
    const filter = document.getElementById('orderStatusFilter').value;
    let orders = JSON.parse(localStorage.getItem(STORE_KEYS.ORDERS)) || [];

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
                            <td>${order.order_number}</td>
                            <td>${order.customer_data?.firstName || ''} ${order.customer_data?.lastName || ''}</td>
                            <td>${order.customer_data?.email || ''}</td>
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
}

document.getElementById('orderStatusFilter').addEventListener('change', loadOrders);

function viewOrder(id) {
    const orders = JSON.parse(localStorage.getItem(STORE_KEYS.ORDERS)) || [];
    const order = orders.find(o => o.id === id);
    if (!order) return;

    const modalHTML = `
        <h2>${t('orderDetails')} - ${order.order_number}</h2>
        <div>
            <h3>${t('customerInformation')}</h3>
            <p><strong>${t('name')}:</strong> ${order.customer_data?.firstName || ''} ${order.customer_data?.lastName || ''}</p>
            <p><strong>${t('email')}:</strong> ${order.customer_data?.email || ''}</p>
            <p><strong>${t('phone')}:</strong> ${order.customer_data?.phone || ''}</p>
            <p><strong>${t('address')}:</strong> ${order.customer_data?.address || ''}, ${order.customer_data?.city || ''} ${order.customer_data?.zipCode || ''}</p>

            <h3>${t('orderItems')}</h3>
            ${(order.items || []).map(item => `
                <p>${item.title} x ${item.quantity} - ${(parseFloat(item.price) * item.quantity).toFixed(2)} BAM</p>
            `).join('')}

            <h3>${t('orderSummary')}</h3>
            <p><strong>${t('subtotal')}:</strong> ${order.subtotal} BAM</p>
            <p><strong>${t('shipping')}:</strong> ${order.shipping} BAM</p>
            <p><strong>${t('tax')}:</strong> ${order.tax} BAM</p>
            <p><strong>${t('total')}:</strong> ${order.total} BAM</p>
            <p><strong>${t('status')}:</strong> <span class="status-badge status-${order.status}">${t(order.status)}</span></p>
            <p><strong>${t('orderDate')}:</strong> ${new Date(order.created_at).toLocaleString()}</p>
        </div>
    `;

    openModal(modalHTML);
}

function updateOrderStatus(id, currentStatus) {
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

    document.getElementById('statusForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const newStatus = document.getElementById('newStatus').value;

        const orders = safeJsonParse(localStorage.getItem(STORE_KEYS.ORDERS), []);
        const idx = orders.findIndex(o => o.id === id);
        if (idx !== -1) {
            orders[idx].status = newStatus;
            localStorage.setItem(STORE_KEYS.ORDERS, JSON.stringify(orders));
            showNotification(t('orderStatusUpdated'));
            closeModal();
            loadOrders();
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
