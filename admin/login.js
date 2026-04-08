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
            errorMessage.textContent = data.error || 'Invalid username or password.';
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
