document.addEventListener('DOMContentLoaded', () => {
    function showSignupForm() {
        const loginFormContainer = document.getElementById('login-form');
        const signupFormContainer = document.getElementById('signup-form');
        if (loginFormContainer && signupFormContainer) {
            loginFormContainer.style.display = 'none';
            signupFormContainer.style.display = 'block';
        }
    }

    function showLoginForm() {
        const loginFormContainer = document.getElementById('login-form');
        const signupFormContainer = document.getElementById('signup-form');
        if (loginFormContainer && signupFormContainer) {
            loginFormContainer.style.display = 'block';
            signupFormContainer.style.display = 'none';
        }
    }

    if (window.location.hash === '#signup') {
        showSignupForm();
    }

    const switchLinks = document.querySelectorAll('.switch-form');
    switchLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const loginFormContainer = document.getElementById('login-form');
            if (loginFormContainer && loginFormContainer.style.display === 'none') {
                showLoginForm();
            } else {
                showSignupForm();
            }
        });
    });

    const loginFormElement = document.getElementById('authForm');
    const loginMessage = document.getElementById('login-message');

    if (loginFormElement && loginMessage) {
        loginFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            const identifier = document.getElementById('identifier').value.trim();
            const password = document.getElementById('password').value;
            loginMessage.textContent = ''; 
            loginMessage.className = 'form-message';

            if (!identifier || !password) {
                loginMessage.textContent = 'Please fill in all fields.';
                loginMessage.classList.add('error');
                loginMessage.style.display = 'block';
                return;
            }

            let users = JSON.parse(localStorage.getItem('users')) || [];
            const frodoUsername = "Frodo Baggins";
            const frodoEmail = "shire@middleearth.me";
            const frodoPassword = "baggins123";

            if ((identifier === frodoUsername || identifier === frodoEmail) && password === frodoPassword) {
                let frodoUser = users.find(user => user.username === frodoUsername);
                if (!frodoUser) {
                    frodoUser = {
                        username: frodoUsername,
                        email: frodoEmail,
                        password: frodoPassword,
                        memberSince: "Third Age 3001",
                        loyaltyTier: "Mithril Ringbearer",
                        currentLocation: "Bag End, Hobbiton",
                        bookings: {
                            upcoming: [
                                { id: "rivendell-council-" + Date.now(), title: "Council of Elrond", date: "October 25, 3018", price: "N/A (Invited)", status: "upcoming" },
                                { id: "grey-havens-voyage-" + Date.now(), title: "Voyage to the Grey Havens", date: "September 29, 3021", price: "Priceless", status: "upcoming" }
                            ],
                            past: [
                                { id: "birthday-party-" + Date.now(), title: "Long-expected Party", date: "September 22, 3001", price: "Many Gifts", status: "completed" },
                                { id: "mordor-trek-" + Date.now(), title: "Journey to Mount Doom", date: "March 25, 3019", price: "One Ring", status: "completed" },
                                { id: "shire-restoration-" + Date.now(), title: "Scouring of the Shire", date: "November 1, 3019", price: "Liberty", status: "completed" }
                            ]
                        }
                    };
                    users.push(frodoUser);
                    localStorage.setItem('users', JSON.stringify(users));
                }
                localStorage.setItem('loggedInUser', frodoUser.username);
                loginMessage.textContent = 'Welcome back, Master Frodo! Redirecting...';
                loginMessage.classList.add('success');
                loginMessage.style.display = 'block';
                setTimeout(() => { window.location.href = 'profile.html'; }, 1500);
                return;
            }

            const foundUser = users.find(user => (user.username === identifier || user.email === identifier) && user.password === password);

            if (foundUser) {
                localStorage.setItem('loggedInUser', foundUser.username);
                loginMessage.textContent = 'Login successful! Welcome back.';
                loginMessage.classList.add('success');
                loginMessage.style.display = 'block';
                setTimeout(() => { window.location.href = 'profile.html'; }, 1000);
            } else {
                loginMessage.textContent = 'Invalid username/email or password.';
                loginMessage.classList.add('error');
                loginMessage.style.display = 'block';
            }
        });
    }

    // Registration form submission (registerForm)
    const registerFormElement = document.getElementById('registerForm');
    const registerMessage = document.getElementById('register-message');

    if (registerFormElement && registerMessage) {
        registerFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('fullname').value.trim();
            const email = document.getElementById('new-email').value.trim();
            const password = document.getElementById('new-password').value;
            registerMessage.textContent = '';
            registerMessage.className = 'form-message';

            if (!username || !email || !password) {
                registerMessage.textContent = 'Please fill in all fields.';
                registerMessage.classList.add('error');
                registerMessage.style.display = 'block';
                return;
            }
            if (password.length < 6) {
                registerMessage.textContent = 'Password must be at least 6 characters long.';
                registerMessage.classList.add('error');
                registerMessage.style.display = 'block';
                return;
            }

            let users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.find(user => user.username === username)) {
                registerMessage.textContent = 'Username already taken.';
                registerMessage.classList.add('error');
                registerMessage.style.display = 'block';
                return;
            }
            if (users.find(user => user.email === email)) {
                registerMessage.textContent = 'Email already registered.';
                registerMessage.classList.add('error');
                registerMessage.style.display = 'block';
                return;
            }

            const newUser = {
                username: username,
                email: email,
                password: password,
                memberSince: new Date().toLocaleDateString(),
                loyaltyTier: "Bronze Traveler",
                currentLocation: "The Prancing Pony",
                bookings: { upcoming: [], past: [] }
            };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            registerMessage.textContent = 'Registration successful! Please log in.';
            registerMessage.classList.add('success');
            registerMessage.style.display = 'block';
            setTimeout(() => { showLoginForm(); registerFormElement.reset(); }, 2000);
        });
    }

    const emailLoginInput = document.getElementById('identifier');
    const passwordLoginInput = document.getElementById('password');
    if (emailLoginInput && !emailLoginInput.value) emailLoginInput.value = 'shire@middleearth.me';
    if (passwordLoginInput && !passwordLoginInput.value) passwordLoginInput.value = 'baggins123';
});
