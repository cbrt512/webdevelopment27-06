document.addEventListener('DOMContentLoaded', () => {
    const exploreBtn = document.getElementById('explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            window.location.href = 'tours.html';
        });
    }
    
    const scrollSections = document.querySelectorAll('.scroll-section');
    if (scrollSections.length > 0) {
        function checkVisibility() {
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            scrollSections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top < viewportHeight * 0.90 && rect.bottom > 0) {
                    section.classList.add('visible');
                } else {
                    section.classList.remove('visible');
                }
            });
        }
        window.addEventListener('scroll', checkVisibility);
        checkVisibility();
    }

    const heroCtaButton = document.getElementById('hero-cta');
    if (heroCtaButton) {
        heroCtaButton.addEventListener('click', () => {
            const firstScrollSection = document.querySelector('.scroll-section');
            if (firstScrollSection) {
                firstScrollSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.location.href = 'tours.html';
            }
        });
    }

    document.querySelectorAll('.location-container .tour-btn').forEach(button => {
        button.addEventListener('click', async function() {
            const tourId = this.getAttribute('data-tour-id');
            
            if (!tourId) {
                // If no tour ID, just go to tours page
                window.location.href = 'tours.html';
                return;
            }
            
            // Map tour IDs to tour data
            const tourMap = {
                '1': { title: 'Shire Adventure', price: '1299', region: 'The Shire' },
                '2': { title: 'Quest for Erebor', price: '2599', region: 'Wilderland, Erebor' },
                '3': { title: 'Rivendell Experience', price: '2199', region: 'Rivendell' },
                '4': { title: 'Mordor Expedition', price: '3999', region: 'Mordor' },
                '5': { title: 'Rohan Adventure', price: '2699', region: 'Rohan' }
            };
            
            const tour = tourMap[tourId];
            if (tour && typeof handleBooking === 'function') {
                const success = await handleBooking(tourId, tour.title, tour.price, tour.region);
                if (success) {
                    alert(`"${tour.title}" added to your upcoming journeys! Check your profile.`);
                }
            } else {
                window.location.href = 'tours.html';
            }
        });
    });
});