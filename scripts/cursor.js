document.addEventListener('DOMContentLoaded', () => {
    // Create references to elements we'll need
    const cursorGlow = document.querySelector('.cursor-glow');
    
    // Variables for smooth movement
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    
    // Update the target position when the mouse moves
    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });
    
    // Optional: Change glow effect when hovering over links
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursorGlow.classList.add('hover');
        });
        
        link.addEventListener('mouseleave', () => {
            cursorGlow.classList.remove('hover');
        });
    });
    
    // Animation function for smooth movement
    function animate() {
        // Calculate the distance to move
        const dx = targetX - currentX;
        const dy = targetY - currentY;
        
        // Move a percentage of the distance each frame
        currentX += dx * 0.1;
        currentY += dy * 0.1;
        
        // Update the cursor position
        cursorGlow.style.transform = `translate(${currentX}px, ${currentY}px)`;
        
        // Request the next frame
        requestAnimationFrame(animate);
    }
    
    // Start the animation
    animate();
    
    // Hide the cursor when it leaves the window
    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursorGlow.style.opacity = '0.8';
    });
});
