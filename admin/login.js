const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const loginBtn = document.getElementById('loginBtn');
const loginText = document.getElementById('loginText');
const loginLoader = document.getElementById('loginLoader');

// Storage keys (must match dashboard.js)
const STORE_KEYS = {
    ADMIN_USER: 'tarix_admin_user',
    ADMIN_SESSION: 'tarix_admin_session'
};

// Hash password using SHA-256
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
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

// Check if already logged in
function checkExistingSession() {
    const session = JSON.parse(localStorage.getItem(STORE_KEYS.ADMIN_SESSION));
    if (session && session.username && Date.now() < session.expiresAt) {
        window.location.href = 'dashboard.html';
    }
}

// Initialize
(async function init() {
    await seedDefaultAdmin();
    checkExistingSession();
})();

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Reset error message
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';

    // Show loading state
    loginBtn.disabled = true;
    loginText.style.display = 'none';
    loginLoader.style.display = 'block';

    try {
        const adminUser = JSON.parse(localStorage.getItem(STORE_KEYS.ADMIN_USER));
        const hashedInput = await hashPassword(password);

        if (adminUser && adminUser.username === username && adminUser.password === hashedInput) {
            // Login successful - create session
            const session = {
                username: username,
                loginTime: Date.now(),
                expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
            };
            localStorage.setItem(STORE_KEYS.ADMIN_SESSION, JSON.stringify(session));

            // Redirect after short delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 100);
        } else {
            // Login failed
            errorMessage.textContent = 'Invalid username or password.';
            errorMessage.classList.add('show');

            // Reset button
            loginBtn.disabled = false;
            loginText.style.display = 'block';
            loginLoader.style.display = 'none';
        }
    } catch (error) {
        console.error('Login error:', error);
        errorMessage.textContent = 'An error occurred. Please try again.';
        errorMessage.classList.add('show');

        // Reset button
        loginBtn.disabled = false;
        loginText.style.display = 'block';
        loginLoader.style.display = 'none';
    }
});
