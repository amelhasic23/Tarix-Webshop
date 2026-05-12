const loginTranslations = {
    en: {
        loginTitle: 'Tarix Admin',
        loginSubtitle: 'Sign in to manage your store',
        usernameLabel: 'Username',
        passwordLabel: 'Password',
        signInBtn: 'Sign In',
        loginError: 'Invalid username or password.',
        loginNetworkError: 'An error occurred. Please try again.',
        loginRateLimitError: 'Too many login attempts. Please try again in 15 minutes.',
        loginCopyright: '© 2026 Tarix. All rights reserved.'
    },
    de: {
        loginTitle: 'Tarix Admin',
        loginSubtitle: 'Melden Sie sich an, um Ihren Shop zu verwalten',
        usernameLabel: 'Benutzername',
        passwordLabel: 'Passwort',
        signInBtn: 'Anmelden',
        loginError: 'Ungültiger Benutzername oder Passwort.',
        loginNetworkError: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
        loginRateLimitError: 'Zu viele Anmeldeversuche. Bitte warten Sie 15 Minuten.',
        loginCopyright: '© 2026 Tarix. Alle Rechte vorbehalten.'
    },
    bs: {
        loginTitle: 'Tarix Admin',
        loginSubtitle: 'Prijavite se da upravljate trgovinom',
        usernameLabel: 'Korisničko ime',
        passwordLabel: 'Lozinka',
        signInBtn: 'Prijava',
        loginError: 'Neispravno korisničko ime ili lozinka.',
        loginNetworkError: 'Došlo je do greške. Molimo pokušajte ponovo.',
        loginRateLimitError: 'Previše pokušaja prijave. Molimo pokušajte za 15 minuta.',
        loginCopyright: '© 2026 Tarix. Sva prava zadržana.'
    }
};

let loginLang = localStorage.getItem('adminLanguage') || 'en';

function applyLoginTranslations(lang) {
    const tr = loginTranslations[lang] || loginTranslations['en'];
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (tr[key]) el.textContent = tr[key];
    });
    const select = document.getElementById('loginLangSelect');
    if (select) select.value = lang;
    document.documentElement.lang = lang;
}

function tLogin(key) {
    return (loginTranslations[loginLang] || loginTranslations['en'])[key] || key;
}

// Language switcher
const langSelect = document.getElementById('loginLangSelect');
if (langSelect) {
    langSelect.value = loginLang;
    langSelect.addEventListener('change', () => {
        loginLang = langSelect.value;
        localStorage.setItem('adminLanguage', loginLang);
        applyLoginTranslations(loginLang);
    });
}

// Apply on page load
applyLoginTranslations(loginLang);

const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const loginBtn = document.getElementById('loginBtn');
const loginText = document.getElementById('loginText');
const loginLoader = document.getElementById('loginLoader');

// API Base URL - same origin since served from same server
const API_BASE = '/api';

// Check if already logged in
async function checkExistingSession() {
    try {
        const response = await fetch(`${API_BASE}/auth/check`, {
            credentials: 'include'
        });
        const data = await response.json();

        if (data.authenticated) {
            window.location.href = 'dashboard.html';
        }
    } catch (error) {
        console.error('Session check error:', error);
    }
}

// Initialize
checkExistingSession();

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
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            // Login successful - redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 100);
        } else {
            // Login failed
            if (response.status === 429) {
                errorMessage.textContent = tLogin('loginRateLimitError');
            } else {
                errorMessage.textContent = data.error || tLogin('loginError');
            }
            errorMessage.classList.add('show');

            // Reset button
            loginBtn.disabled = false;
            loginText.style.display = 'block';
            loginLoader.style.display = 'none';
        }
    } catch (error) {
        console.error('Login error:', error);
        errorMessage.textContent = tLogin('loginNetworkError');
        errorMessage.classList.add('show');

        // Reset button
        loginBtn.disabled = false;
        loginText.style.display = 'block';
        loginLoader.style.display = 'none';
    }
});
