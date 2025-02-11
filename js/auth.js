// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Form Validation and Submission Handler
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    if (!form) return;

    // Form Validation
    const validateForm = () => {
        let isValid = true;
        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        const userType = document.getElementById('userType');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');

        // Reset previous error states
        [firstName, lastName, email, userType, password, confirmPassword].forEach(field => {
            field.classList.remove('error');
        });

        // Validate First Name
        if (!firstName.value.trim()) {
            firstName.classList.add('error');
            isValid = false;
        }

        // Validate Last Name
        if (!lastName.value.trim()) {
            lastName.classList.add('error');
            isValid = false;
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value)) {
            email.classList.add('error');
            isValid = false;
        }

        // Validate User Type
        if (!userType.value) {
            userType.classList.add('error');
            isValid = false;
        }

        // Validate Password
        if (password.value.length < 8) {
            password.classList.add('error');
            isValid = false;
        }

        // Validate Confirm Password
        if (password.value !== confirmPassword.value) {
            confirmPassword.classList.add('error');
            isValid = false;
        }

        return isValid;
    };

    // Handle Form Submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const submitButton = form.querySelector('.auth-btn');
        submitButton.classList.add('loading');

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
            
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken
                },
                body: JSON.stringify({
                    username: document.getElementById('phoneNumber').value, 
                    email: `${document.getElementById('phoneNumber').value}@farmconnect.com`, 
                    password: document.getElementById('password').value,
                    role: document.getElementById('userType').value
                })
            });
            
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            
            window.location.href = 'login.html';
        } catch (error) {
            showError('An error occurred. Please try again.');
        } finally {
            submitButton.classList.remove('loading');
        }
    });

    // Add input event listeners for real-time validation
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('error');
        });
    });
});

// Password Visibility Toggle
document.addEventListener('DOMContentLoaded', () => {
    const passwordFields = document.querySelectorAll('input[type="password"]');
    
    passwordFields.forEach(field => {
        const toggleIcon = document.createElement('i');
        toggleIcon.className = 'fas fa-eye password-toggle';
        field.parentElement.appendChild(toggleIcon);

        toggleIcon.addEventListener('click', () => {
            const type = field.getAttribute('type');
            field.setAttribute('type', type === 'password' ? 'text' : 'password');
            toggleIcon.className = `fas fa-eye${type === 'password' ? '' : '-slash'} password-toggle`;
        });
    });
});

// Handle Login Form
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const phoneNumber = loginForm.querySelector('input[type="tel"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;

            try {
                const response = await fetch(`${API_BASE_URL}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: phoneNumber, 
                        password
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    // Store the token
                    localStorage.setItem('token', data.accessToken); 
                    localStorage.setItem('username', phoneNumber); 
                    // Redirect to dashboard based on user type
                    window.location.href = '/index.html'; 
                } else {
                    alert(data.message || 'Login failed. Please try again.');
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('An error occurred during login. Please try again.');
            }
        });
    }
});
