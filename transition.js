document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a:not([target="_blank"])');
    const staticOverlay = document.querySelector('.static-transition');
    
    // Function to handle the transition effect
    function triggerTransition(duration = 500) {
        staticOverlay.classList.add('active');
        
        // Create a less intense effect that runs for a shorter time
        const glitchInterval = setInterval(() => {
            staticOverlay.style.transform = `
                translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px) 
                scale(${1 + Math.random() * 0.05})
            `;
        }, 50);

        // Clean up after the specified duration
        setTimeout(() => {
            clearInterval(glitchInterval);
            staticOverlay.classList.remove('active');
        }, duration);
    }

    // Handle clicking links
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('http')) return;
            
            e.preventDefault();
            triggerTransition(500); // Shortened from 1000ms

            setTimeout(() => {
                window.location.href = href;
            }, 400); // Navigate slightly before effect ends
        });
    });

    // Handle back/forward navigation
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            // Page was loaded from back/forward cache
            staticOverlay.classList.remove('active');
        }
    });
});