document.addEventListener('DOMContentLoaded', () => {
    const toursData = [
        {
            id: 1,
            title: "Ring-Bearer's Journey",
            description: "Follow Frodo and Sam's path from the Shire to Mount Doom, including Rivendell, Moria, and Lothlórien.",
            duration: "21 Days",
            region: "Shire, Rivendell, Mordor",
            difficulty: "Challenging",
            price: "2999",
            image: "assets/images/frodo.png"
        },
        {
            id: 2,
            title: "Quest for Erebor",
            description: "Travel with Thorin's company through the wild lands to reclaim the Lonely Mountain. Visit Laketown, Dale, and the Mountain stronghold.",
            duration: "18 Days",
            region: "Wilderland, Erebor",
            difficulty: "Moderate",
            price: "2599",
            image: "assets/images/erebor_company.png"
        },
        {
            id: 3,
            title: "Aragorn's Path to Kingship",
            description: "Trace Aragorn's steps from the wilds of Eriador to his coronation in Gondor. Explore Rohan, Helm's Deep, and Minas Tirith.",
            duration: "24 Days",
            region: "Eriador, Rohan, Gondor",
            difficulty: "Moderate",
            price: "3499",
            image: "assets/images/aragorn.png"
        },
        {
            id: 4,
            title: "Paths of the Rohirrim",
            description: "Ride with the horse lords through the plains of Rohan, visiting Edoras, Isengard, and Helm's Deep.",
            duration: "14 Days",
            region: "Rohan",
            difficulty: "Moderate",
            price: "2699",
            image: "assets/images/rohirrim.png"
        },
        {
            id: 5,
            title: "Elven Havens Experience",
            description: "Visit the elven realms of Rivendell and Lothlórien in this peaceful journey through Elrond and Galadriel's domains.",
            duration: "12 Days",
            region: "Rivendell, Lothlórien",
            difficulty: "Easy",
            price: "2199",
            image: "assets/images/rivendell.png"
        },
        {
            id: 6,
            title: "Shire Retreat",
            description: "A peaceful getaway in the rolling green hills of the Shire. Enjoy hobbit holes, second breakfast, and the simple pleasures of hobbit life.",
            duration: "7 Days",
            region: "The Shire",
            difficulty: "Easy",
            price: "1299",
            image: "assets/images/shire.png"
        },
        {
            id: 7,
            title: "Isengard's Dark Legacy",
            description: "Explore Saruman's fallen stronghold and witness the aftermath of industrial destruction. Visit the flooded circle, the tower of Orthanc, and the Ent-infested ruins.",
            duration: "10 Days",
            region: "Isengard, Fangorn",
            difficulty: "Moderate",
            price: "1899",
            image: "assets/images/isengard.jpg"
        },
        {
            id: 8,
            title: "Moria: Halls of the Dwarves",
            description: "Brave the ancient mines of Khazad-dûm with expert dwarf guides. See the Chamber of Mazarbul, cross the Bridge of Khazad-dûm, and learn about the lost kingdom's glory.",
            duration: "15 Days",
            region: "Moria, Misty Mountains",
            difficulty: "Challenging",
            price: "2799",
            image: "assets/images/moria.png"
        },
        {
            id: 9,
            title: "Eagles of the Misty Mountains",
            description: "Soar with the Great Eagles above Middle-Earth! Experience aerial views of major landmarks, visit the Eyrie, and learn the ancient bond between eagles and wizards. Weather permitting - no fear of heights required!",
            duration: "5 Days",
            region: "Misty Mountains, Eyrie",
            difficulty: "Challenging",
            price: "3799",
            image: "assets/images/eagles.png"
        },
        {
            id: 10,
            title: "Dead Marshes Ghost Walk",
            description: "A haunting nighttime journey through the spectral marshlands where ancient warriors still roam. Witness the phantom lights and learn the tragic history of this eerie battlefield. Includes protective talismans and expert spirit guides.",
            duration: "3 Days",
            region: "Dead Marshes, Emyn Muil",
            difficulty: "Challenging",
            price: "1499",
            image: "assets/images/dead_marshes.png"
        },
        {
            id: 11,
            title: "Minas Tirith: City of Kings",
            description: "Ascend the seven levels of the White City! Tour the Citadel, witness the coronation chamber, and explore the Houses of Healing. Experience the grandeur of Gondor's greatest fortress and learn about its thousand-year history as the beacon of the West.",
            duration: "12 Days",
            region: "Gondor, Pelennor Fields",
            difficulty: "Moderate",
            price: "2599",
            image: "assets/images/minastirith.jpg"
        },
        {
            id: 12,
            title: "Ent Shepherd Experience",
            description: "Join the ancient Ents of Fangorn Forest in their eternal vigil over the trees. Learn the Old Entish language, participate in Entmoots, and help tend to the ancient woods. Includes tree-speaking lessons and slow-motion hiking!",
            duration: "20 Days",
            region: "Fangorn Forest",
            difficulty: "Moderate",
            price: "2299",
            image: "assets/images/ents.png"
        },
    ];
    
    const tourGrid = document.getElementById('tour-results');
    let allTours = [...toursData];
    
    // Create difficulty filter
    function createDifficultyFilter() {
        const filterContainer = document.querySelector('.filter-container');
        const filterHTML = `
            <div class="difficulty-filters">
                <button class="filter-btn active" data-difficulty="all">All Adventures</button>
                <button class="filter-btn" data-difficulty="Easy">🌿 Easy</button>
                <button class="filter-btn" data-difficulty="Moderate">⚔️ Moderate</button>
                <button class="filter-btn" data-difficulty="Challenging">🗻 Challenging</button>
            </div>
        `;
        filterContainer.innerHTML += filterHTML;
        
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {

                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const difficulty = button.dataset.difficulty;
                const filteredTours = difficulty === 'all' 
                    ? allTours 
                    : allTours.filter(tour => tour.difficulty === difficulty);
                
                renderTours(filteredTours);
            });
        });
    }
    
    function renderTours(tourList) {
        if (!tourGrid) return;
        tourGrid.innerHTML = '';
        
        tourList.forEach(tour => {
            const card = document.createElement('div');
            card.className = 'tour-card';
            card.innerHTML = `
                <div class="tour-image" style="background-image: url('${tour.image}')">
                    <div class="tour-overlay"></div>
                </div>
                <div class="tour-content">
                    <h4 class="tour-title">${tour.title}</h4>
                    <div class="tour-details">
                        <span class="tour-duration">${tour.duration}</span>
                        <span class="tour-price">${tour.price} 💰</span>
                    </div>
                    <div class="tour-region">
                        📍 ${tour.region}
                    </div>
                    <div class="tour-difficulty">
                        ⛰️ ${tour.difficulty}
                    </div>
                    <p class="tour-description">${tour.description}</p>
                    <button class="tour-btn" data-tour-id="${tour.id}" data-tour-title="${tour.title}" data-tour-price="${tour.price}">Book Journey</button>
                </div>
            `;
            tourGrid.appendChild(card);
        });
    }
    
    // Initialize
    createDifficultyFilter();
    renderTours(allTours);

    // Booking functionality
    if (tourGrid) {
        tourGrid.addEventListener('click', async (event) => {
            if (event.target.classList.contains('tour-btn')) {
                const tourId = event.target.dataset.tourId;
                const tourTitle = event.target.dataset.tourTitle;
                const tourPrice = event.target.dataset.tourPrice;
                
                // Find the tour data to get the region
                const tour = allTours.find(t => t.id == tourId);
                const tourRegion = tour ? tour.region : '';
                
                if (typeof handleBooking === 'function') {
                    const success = await handleBooking(tourId, tourTitle, tourPrice, tourRegion);
                    if (success) {
                        alert(`"${tourTitle}" added to your upcoming journeys! Check your profile.`);
                    }
                } else {
                    console.error('handleBooking function not found.');
                    alert('Booking system error. Please try again later.');
                }
            }
        });
    }
});