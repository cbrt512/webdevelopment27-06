document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert("Your message to Middle-Earth has been sent! We'll respond via carrier eagle shortly.");
            this.reset();
        });
    }
});