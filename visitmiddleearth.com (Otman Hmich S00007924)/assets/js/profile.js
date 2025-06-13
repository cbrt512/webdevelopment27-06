document.addEventListener('DOMContentLoaded', () => {
    const loggedInUsername = localStorage.getItem('loggedInUser');

    if (!loggedInUsername) {
        alert('Please login to view your profile.');
        window.location.href = 'login.html';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find(user => user.username === loggedInUsername);

    if (!currentUser) {
        alert('User data not found. Please login again.');
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('profile-name').textContent = currentUser.username;
    document.getElementById('profile-email').textContent = currentUser.email;
    
    const profileInfoContainer = document.querySelector('.profile-card .profile-info');
    if (profileInfoContainer) {
        profileInfoContainer.innerHTML = `
            <div class="info-item">
                <span>Account Status:</span>
                <span class="info-value">Active Traveler</span>
            </div>
            <div class="info-item">
                <span>Member Since:</span>
                <span class="info-value">${currentUser.memberSince || 'A long time ago'}</span>
            </div>
            <div class="info-item">
                <span>Loyalty Tier:</span>
                <span class="info-value">${currentUser.loyaltyTier || 'Valued Guest'}</span>
            </div>
            <div class="info-item">
                <span>Journeys Completed:</span>
                <span class="info-value">${currentUser.bookings && currentUser.bookings.past ? currentUser.bookings.past.length : 0} Adventures</span>
            </div>
            <div class="info-item">
                <span>Current Location:</span>
                <span class="info-value">${currentUser.currentLocation || 'Exploring Middle-Earth'}</span>
            </div>
        `;
    }

    function renderBookings() {
        const upcomingBookingsEl = document.getElementById('upcoming-bookings');
        const pastBookingsEl = document.getElementById('past-bookings');
        
        if (!upcomingBookingsEl || !pastBookingsEl) return;

        const bookings = currentUser.bookings || { upcoming: [], past: [] };

        upcomingBookingsEl.innerHTML = bookings.upcoming.length === 0 
            ? '<li>No upcoming journeys. Time for an adventure!</li>'
            : bookings.upcoming.map(booking => `
                <li class="booking-item">
                    <div class="booking-info">
                        <h4>${booking.title}</h4>
                        <div class="booking-meta">
                            <span>📅 ${booking.date}</span>
                            <span class="booking-status status-upcoming">Upcoming</span>
                        </div>
                    </div>
                    <div class="booking-price">${booking.price} 💰</div>
                </li>
            `).join('');

        pastBookingsEl.innerHTML = bookings.past.length === 0 
            ? '<li>No past journeys recorded.</li>'
            : bookings.past.map(booking => `
                <li class="booking-item">
                    <div class="booking-info">
                        <h4>${booking.title}</h4>
                        <div class="booking-meta">
                            <span>📅 ${booking.date}</span>
                            <span class="booking-status status-completed">Completed</span>
                        </div>
                    </div>
                    <div class="booking-price">${booking.price} 💰</div>
                </li>
            `).join('');
    }

    renderBookings();
});
