document.addEventListener('DOMContentLoaded', () => {
    const projects = [
        {
            id: 1,
            title: "Portfolio Website",
            description: "A personal portfolio website inspired by The Legend of Zelda series.",
            image: "../assets/images/projects/portfolio.png",
            technologies: ["html", "css", "javascript", "php"],
            link: "https://github.com/kodzukye/portfolio",
            date: "2024-12-04"
        },

        {
            id: 1,
            title: "Portfolio Website",
            description: "A personal portfolio website inspired by The Legend of Zelda series.",
            image: "../assets/images/projects/portfolio.png",
            technologies: ["html", "css", "javascript", "php"],
            link: "https://drive.google.com/your-link-here",
            date: "2024-12-04"
        },

        {
            id: 1,
            title: "Portfolio Website",
            description: "A personal portfolio website inspired by The Legend of Zelda series.",
            image: "../assets/images/projects/portfolio.png",
            technologies: ["html", "css", "javascript", "php"],
            link: "https://drive.google.com/your-link-here",
            date: "2024-12-04"
        },

        {
            id: 1,
            title: "Portfolio Website",
            description: "A personal portfolio website inspired by The Legend of Zelda series.",
            image: "../assets/images/projects/portfolio.png",
            technologies: ["html", "css", "javascript", "php"],
            link: "https://drive.google.com/your-link-here",
            date: "2024-12-04"
        },

        {
            id: 1,
            title: "Portfolio Website",
            description: "A personal portfolio website inspired by The Legend of Zelda series.",
            image: "../assets/images/projects/portfolio.png",
            technologies: ["html", "css", "javascript", "php"],
            link: "https://drive.google.com/your-link-here",
            date: "2024-12-04"
        },
        // Add more projects...
    ];

    const projectsContainer = document.querySelector('.project-cards');
    const registeredCounter = document.querySelector('.registered');
    const sortBtn = document.querySelector('.sort-btn');
    
    let currentSort = 'id';
    let isDragging = false;
    let startX;
    let scrollLeft;
    let momentumID;
    let velocity = 0;
    let lastX;
    let lastTimestamp;

    // Function to update the registration counter
    function updateCounter() {
        registeredCounter.textContent = `Registered ${projects.length}/${projects.length}`;
    }

    // Function to create project cards
    function createProjectCard(project) {
        return `
            <div class="project-card" onclick="handleCardClick(event, '${project.link}')">
                <div class="project-number">${project.id}</div>
                <h2 class="project-title">${project.title}</h2>
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => 
                        `<img src="../assets/images/icons/${tech}.png" alt="${tech}" class="tech-icon">`
                    ).join('')}
                </div>
            </div>
        `;
    }

    // Sorting function
    function handleSort() {
        // Cycle through sort types: id -> name -> date
        switch(currentSort) {
            case 'id':
                currentSort = 'name';
                sortBtn.textContent = 'Sort by Date (Y)';
                projects.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'name':
                currentSort = 'date';
                sortBtn.textContent = 'Sort by ID (Y)';
                projects.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'date':
                currentSort = 'id';
                sortBtn.textContent = 'Sort by Name (Y)';
                projects.sort((a, b) => a.id - b.id);
                break;
        }
        
        // Refresh display
        projectsContainer.innerHTML = projects.map(createProjectCard).join('');
    }

    // Dragging functionality
    function handleDragStart(e) {
        isDragging = true;
        const wrapper = projectsContainer.parentElement;
        
        // Record the initial position and time
        startX = e.pageX - projectsContainer.offsetLeft;
        scrollLeft = wrapper.scrollLeft;
        lastX = e.pageX;
        lastTimestamp = Date.now();
        velocity = 0;
        
        // Stop any ongoing momentum or snap animation
        cancelAnimationFrame(momentumID);
        
        // Add visual feedback for grabbing
        projectsContainer.classList.add('dragging');
        
        // Prevent default dragging behavior
        e.preventDefault();
    }

    function handleDragEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        projectsContainer.classList.remove('dragging');
        
        // Apply momentum and then snap to nearest card
        applyMomentumAndSnap(velocity);
    }

    function handleDragMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        const wrapper = projectsContainer.parentElement;
        const x = e.pageX - projectsContainer.offsetLeft;
        const walk = (x - startX);
        
        // Calculate velocity for momentum
        const currentTimestamp = Date.now();
        const timeElapsed = currentTimestamp - lastTimestamp;
        velocity = (e.pageX - lastX) / timeElapsed;
        
        // Update last position and time
        lastX = e.pageX;
        lastTimestamp = currentTimestamp;
        
        // Apply the movement
        wrapper.scrollLeft = scrollLeft - walk;
    }

    function applyMomentumAndSnap(initialVelocity) {
        const wrapper = projectsContainer.parentElement;
        let currentVelocity = initialVelocity * 50; // Amplify the velocity for more noticeable momentum
        
        function momentumLoop() {
            // Apply friction
            currentVelocity *= 0.95;
            
            // Update scroll position based on velocity
            wrapper.scrollLeft -= currentVelocity;
            
            // Continue momentum until velocity is very low
            if (Math.abs(currentVelocity) > 0.1) {
                momentumID = requestAnimationFrame(momentumLoop);
            } else {
                // When momentum ends, snap to nearest card
                snapToNearestCard();
            }
        }
        
        momentumID = requestAnimationFrame(momentumLoop);
    }

    function snapToNearestCard() {
        const wrapper = projectsContainer.parentElement;
        const cards = document.querySelectorAll('.project-card');
        const wrapperCenter = wrapper.getBoundingClientRect().left + (wrapper.offsetWidth / 2);
        
        let closestCard;
        let minDistance = Infinity;
        
        // Find the card closest to center
        cards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + (cardRect.width / 2);
            const distance = Math.abs(cardCenter - wrapperCenter);
            
            if (distance < minDistance) {
                minDistance = distance;
                closestCard = card;
            }
        });
        
        // Smoothly snap to the closest card
        if (closestCard) {
            closestCard.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    // Back button function
    function handleBack() {
        const staticOverlay = document.querySelector('.static-transition');
        staticOverlay.classList.add('active');
        setTimeout(() => {
            window.location.href = '../pages';
        }, 500);
    }

    // Initialize dragging events
    projectsContainer.addEventListener('mousedown', handleDragStart);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('mouseleave', handleDragEnd);

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        switch(e.key.toLowerCase()) {
            case 'y':
                handleSort();
                break;
            case 'b':
                handleBack();
                break;
        }
    });

    // Prevent card click when dragging
    window.handleCardClick = function(e, link) {
        if (!isDragging) {
            window.location.href = link;
        }
    };

    // Attach functions to window so they can be called from HTML
    window.handleSort = handleSort;
    window.handleBack = handleBack;

    // Initial setup
    projectsContainer.innerHTML = projects.map(createProjectCard).join('');
    updateCounter();

    
});