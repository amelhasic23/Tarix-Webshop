document.addEventListener('DOMContentLoaded', function() {
    // ==========================================
    // SWIPER SLIDERS
    // ==========================================

    // Initialize Testimonials Swiper
    window.testimonialSwiper = new Swiper('.testimonial-cards-wrapper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 25,
        centeredSlides: true,
        autoHeight: false,
        pagination: {
            el: '.testimonial-cards-wrapper .swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: false,
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
                centeredSlides: false,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 25,
                centeredSlides: false,
            },
            1400: {
                slidesPerView: 3,
                spaceBetween: 30,
                centeredSlides: false,
            }
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        effect: 'slide',
        speed: 600,
        watchSlidesProgress: true,
        observer: true,
        observeParents: true,
        resizeObserver: true,
    });

    // Force Swiper to recalculate slide widths after the full page
    // layout is settled (fonts, images, CSS grid all resolved).
    window.addEventListener('load', () => window.testimonialSwiper.update());

    // ==========================================
    // MODAL FUNCTIONALITY
    // ==========================================
    const modal = document.querySelector('[data-modal]');
    const modalCloseBtn = document.querySelector('[data-button-close]');
    const modalCloseOverlay = document.querySelector('[data-modal-overlay]');
    const overlay = document.querySelector('[data-overlay]');

    function closeModal() {
        modal.classList.add('closed');
        overlay.classList.add('hidden');
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalCloseOverlay) modalCloseOverlay.addEventListener('click', closeModal);

    // ==========================================
    // NOTIFICATION TOAST
    // ==========================================
    const toast = document.querySelector('[data-toast]');
    const toastCloseBtn = document.querySelector('[data-toast-close]');

    if (toastCloseBtn) {
        toastCloseBtn.addEventListener('click', function() {
            toast.classList.add('closed');
        });
    }

    // ==========================================
    // MOBILE MENU
    // ==========================================
    const mobileMenuOpenBtns = document.querySelectorAll('[data-mobile-menu-open-btn]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    const mobileMenuCloseBtn = document.querySelector('[data-mobile-menu-close-btn]');

    function openMobileMenu() {
        mobileMenu.classList.add('open');
        overlay.classList.remove('hidden');
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('open');
        overlay.classList.add('hidden');
    }

    mobileMenuOpenBtns.forEach(btn => {
        btn.addEventListener('click', openMobileMenu);
    });

    if (mobileMenuCloseBtn) mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
    if (overlay) overlay.addEventListener('click', closeMobileMenu);

    // ==========================================
    // ACCORDION MENU (Mobile)
    // ==========================================
    const accordionBtns = document.querySelectorAll('[data-accordion-btn]');

    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const accordion = this.nextElementSibling;
            this.classList.toggle('active');
            accordion.classList.toggle('active');
        });
    });

    // ==========================================
    // CATEGORY DROPDOWN
    // ==========================================
    const categoryDropdownBtn = document.querySelector('.category-dropdown-btn');
    const categoryDropdownContent = document.querySelector('.category-dropdown-content');

    if (categoryDropdownBtn) {
        // Handle both click and touch events for mobile compatibility
        const toggleDropdown = function(e) {
            e.preventDefault();
            e.stopPropagation();
            categoryDropdownBtn.classList.toggle('active');
            categoryDropdownContent.classList.toggle('active');
        };

        categoryDropdownBtn.addEventListener('click', toggleDropdown);
        categoryDropdownBtn.addEventListener('touchend', toggleDropdown);

        // Close dropdown when clicking/tapping outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.category-dropdown')) {
                categoryDropdownBtn.classList.remove('active');
                categoryDropdownContent.classList.remove('active');
            }
        });
    }

    // ==========================================
    // CATEGORY BAR + FILTER
    // ==========================================
    const categoryBarItems = document.querySelectorAll('.category-bar-item[data-filter-category]');
    const categoryFilterSelect = document.getElementById('categoryFilter');

    categoryBarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.dataset.filterCategory;

            // Update active state on bar
            categoryBarItems.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');

            // Sync with the toolbar select
            if (categoryFilterSelect) {
                categoryFilterSelect.value = category;
                categoryFilterSelect.dispatchEvent(new Event('change'));
            }

            // Scroll to products
            const productsSection = document.getElementById('new-products');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Also sync bar when toolbar select changes
    if (categoryFilterSelect) {
        categoryFilterSelect.addEventListener('change', function() {
            const val = this.value;
            categoryBarItems.forEach(item => {
                item.classList.toggle('active', item.dataset.filterCategory === val);
            });
        });
    }

    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    closeMobileMenu();
                }
            }
        });
    });

});
