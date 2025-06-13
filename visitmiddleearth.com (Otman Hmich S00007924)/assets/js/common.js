document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const profileNavItem = document.getElementById('profile-nav-item');

    function updateAuthUI() {
        const loggedInUsername = localStorage.getItem('loggedInUser');
        if (loggedInUsername) {
            document.body.classList.add('logged-in');
            if (loginBtn) loginBtn.textContent = 'Logout';
            if (signupBtn) signupBtn.style.display = 'none';
        } else {
            document.body.classList.remove('logged-in');
            if (loginBtn) loginBtn.textContent = 'Login';
            if (signupBtn) signupBtn.style.display = 'inline-block';
        }
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            const loggedInUsername = localStorage.getItem('loggedInUser');
            if (loggedInUsername) {
                localStorage.removeItem('loggedInUser');
                updateAuthUI();
                if (window.location.pathname.includes('profile.html') || window.location.pathname.includes('login.html')) {
                    window.location.href = 'home.html';
                } else {
                    window.location.reload();
                }
            } else {
                window.location.href = 'login.html';
            }
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            if (window.location.pathname.includes('login.html')) {
                window.location.href = 'login.html#signup';
                const signupFormContainer = document.getElementById('signup-form');
                const loginFormContainer = document.getElementById('login-form');
                if (signupFormContainer && loginFormContainer) {
                    signupFormContainer.style.display = 'block';
                    loginFormContainer.style.display = 'none';
                }
            } else {
                window.location.href = 'login.html#signup';
            }
        });
    }

    updateAuthUI();

    const header = document.querySelector('header');
    const scrollThreshold = 100;

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > scrollThreshold) {
                header.classList.add('sticky-header');
            } else {
                header.classList.remove('sticky-header');
            }
        });
    }
});

async function handleBooking(tourId, tourTitle, tourPrice, tourRegion = '') {
    const loggedInUsername = localStorage.getItem('loggedInUser');
    if (!loggedInUsername) {
        alert('Please login to book a tour.');
        window.location.href = 'login.html';
        return false;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.username === loggedInUsername);

    if (userIndex === -1) {
        alert('Error: User not found. Please login again.');
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
        return false;
    }

    // Show weather information before confirming booking
    if (tourRegion && window.weatherService) {
        const confirmed = await showWeatherModal(tourTitle, tourRegion, tourPrice);
        if (!confirmed) {
            return false; // User cancelled booking
        }
    }

    const currentUser = users[userIndex];

    if (!currentUser.bookings) {
        currentUser.bookings = { upcoming: [], past: [] };
    }
    if (!currentUser.bookings.upcoming) {
        currentUser.bookings.upcoming = [];
    }

    const newBooking = {
        id: tourId + '-' + Date.now(),
        title: tourTitle,
        date: "Scheduled (TBD)",
        price: tourPrice,
        status: "upcoming"
    };

    currentUser.bookings.upcoming.push(newBooking);
    users[userIndex] = currentUser;
    localStorage.setItem('users', JSON.stringify(users));

    return true;
}

async function showWeatherModal(tourTitle, tourRegion, tourPrice) {
    return new Promise(async (resolve) => {
        // Create modal HTML
        const modalHTML = `
            <div class="weather-modal" id="weather-modal">
                <div class="weather-modal-content">
                    <div class="weather-loading" id="weather-loading">
                        <i class="fas fa-spinner"></i>
                        <p>Checking weather conditions for your journey...</p>
                    </div>
                    <div id="weather-content" style="display: none;"></div>
                </div>
            </div>
        `;

        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        const modal = document.getElementById('weather-modal');
        const loadingDiv = document.getElementById('weather-loading');
        const contentDiv = document.getElementById('weather-content');

        // Show modal
        setTimeout(() => modal.classList.add('show'), 10);

        try {
            // Fetch weather data
            const weatherData = await window.weatherService.getWeatherForRegion(tourRegion);
            
            // Hide loading and show content
            loadingDiv.style.display = 'none';
            contentDiv.style.display = 'block';
            
            // Generate weather tips based on conditions
            const weatherTips = generateWeatherTips(weatherData, tourRegion);
            
            contentDiv.innerHTML = `
                <h3 style="text-align: center; color: var(--secondary); margin-bottom: 20px;">
                    🌤️ Weather Forecast for "${tourTitle}"
                </h3>
                ${window.weatherService.formatWeatherInfo(weatherData)}
                ${weatherTips}
                <div class="weather-actions">
                    <button class="weather-btn primary" id="confirm-booking">
                        Confirm Booking (${tourPrice} 💰)
                    </button>
                    <button class="weather-btn secondary" id="cancel-booking">
                        Cancel
                    </button>
                </div>
            `;

            // Add event listeners
            document.getElementById('confirm-booking').addEventListener('click', () => {
                closeModal();
                resolve(true);
            });

            document.getElementById('cancel-booking').addEventListener('click', () => {
                closeModal();
                resolve(false);
            });

        } catch (error) {
            console.error('Weather fetch error:', error);
            loadingDiv.style.display = 'none';
            contentDiv.style.display = 'block';
            contentDiv.innerHTML = `
                <div class="weather-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Unable to fetch weather data. Would you like to proceed with booking anyway?</p>
                </div>
                <div class="weather-actions">
                    <button class="weather-btn primary" id="confirm-booking">
                        Book Anyway (${tourPrice} 💰)
                    </button>
                    <button class="weather-btn secondary" id="cancel-booking">
                        Cancel
                    </button>
                </div>
            `;

            document.getElementById('confirm-booking').addEventListener('click', () => {
                closeModal();
                resolve(true);
            });

            document.getElementById('cancel-booking').addEventListener('click', () => {
                closeModal();
                resolve(false);
            });
        }

        function closeModal() {
            modal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
                resolve(false);
            }
        });
    });
}

function generateWeatherTips(weatherData, region) {
    let tips = [];
    const temp = parseInt(weatherData.temperature);
    const description = weatherData.description.toLowerCase();

    // Temperature-based tips
    if (temp < 0) {
        tips.push("❄️ Very cold conditions! Pack extra warm clothing and consider postponing if traveling to exposed areas.");
    } else if (temp < 10) {
        tips.push("🧥 Cold weather expected. Bring warm layers, especially for mountain regions.");
    } else if (temp > 30) {
        tips.push("☀️ Hot weather! Stay hydrated and consider early morning starts for outdoor activities.");
    }

    // Weather condition tips
    if (description.includes('rain') || description.includes('drizzle')) {
        tips.push("🌧️ Rain expected. Pack waterproof gear and be prepared for muddy paths.");
    } else if (description.includes('snow')) {
        tips.push("❄️ Snow conditions may affect travel. Check road conditions and pack appropriate gear.");
    } else if (description.includes('clear') || description.includes('sunny')) {
        tips.push("☀️ Perfect weather for sightseeing! Don't forget sunscreen and water.");
    } else if (description.includes('cloud')) {
        tips.push("☁️ Overcast conditions - good for hiking without strong sun exposure.");
    }

    // Region-specific tips
    if (region.includes('Mordor')) {
        tips.push("🌋 Mordor's volcanic activity may affect local weather. Extra caution advised.");
    } else if (region.includes('Shire')) {
        tips.push("🌿 The Shire's mild climate is perfect for leisurely walks and outdoor dining.");
    } else if (region.includes('Misty Mountains') || region.includes('Erebor')) {
        tips.push("⛰️ Mountain weather can change quickly. Pack layers and check for altitude effects.");
    }

    if (tips.length === 0) {
        tips.push("🎒 Check local weather conditions before departure and pack accordingly.");
    }

    return `
        <div class="weather-tip">
            <h5><i class="fas fa-lightbulb"></i> Travel Tips</h5>
            <p>${tips.join(' ')}</p>
        </div>
    `;
}