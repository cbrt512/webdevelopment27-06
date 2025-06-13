document.addEventListener('DOMContentLoaded', () => {
    const icons = document.querySelectorAll('.fa, .fas');
    
    icons.forEach(icon => {
        const iconContainer = document.createElement('span');
        iconContainer.classList.add('fa-proxy-icon');

        let iconClass = '';
        for (let i = 0; i < icon.classList.length; i++) {
            if (icon.classList[i].startsWith('fa-') && icon.classList[i] !== 'fa') {
                iconClass = icon.classList[i];
                break;
            }
        }
        
        switch(iconClass) {
            case 'fa-user':           iconContainer.textContent = '👤'; break;
            case 'fa-map-marked-alt': iconContainer.textContent = '🗺️📍'; break;
            case 'fa-history':        iconContainer.textContent = '📜'; break;
            case 'fa-calendar-day':   iconContainer.textContent = '📅'; break;
            case 'fa-coins':          iconContainer.textContent = '💰'; break;
            case 'fa-ring':           iconContainer.textContent = '💍'; break;
            case 'fa-hiking':         iconContainer.textContent = '🚶'; break;
            case 'fa-shield-alt':     iconContainer.textContent = '🛡️'; break;
            case 'fa-star':           iconContainer.textContent = '⭐'; break;
            case 'fa-users':          iconContainer.textContent = '👥'; break;
            case 'fa-map-marker-alt': iconContainer.textContent = '📍'; break;
            case 'fa-envelope':       iconContainer.textContent = '✉️'; break;
            case 'fa-clock':          iconContainer.textContent = '🕒'; break;
            case 'fa-paper-plane':    iconContainer.textContent = '✈️'; break;
            case 'fa-map':            iconContainer.textContent = '🗺️'; break;
            default:
                iconContainer.textContent = icon.textContent || '❔';
        }
        
        if (icon.parentNode) {
            icon.parentNode.replaceChild(iconContainer, icon);
        }
    });
});