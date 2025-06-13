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
        button.addEventListener('click',function () {
            window.location.href = 'tours.html';
        });
    });
});
