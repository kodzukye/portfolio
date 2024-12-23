const skillsData = {
    frontend: [
        {
            name: 'React',
            icon: '⚛️',
            level: 4,
            projects: 12,
            description: 'Advanced proficiency in React...'
        },
        // Add more skills
    ],
    backend: [
        // Backend skills
    ],
    // More categories
};

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.skills-grid');
    const categoryButtons = document.querySelectorAll('.category-icon');

    function displaySkills(category) {
        grid.innerHTML = skillsData[category]
            .map(skill => `
                <div class="skill-item" data-skill="${skill.name}">
                    <div class="skill-icon">${skill.icon}</div>
                    <div class="skill-name">${skill.name}</div>
                </div>
            `).join('');
    }

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            displaySkills(button.dataset.category);
        });
    });

    // Initially display frontend skills
    displaySkills('frontend');
});

document.addEventListener('DOMContentLoaded', () => {
    // Apply saved language preference
    const currentLang = localStorage.getItem('preferred-language') || 'en';
    
    // Update page content
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.dataset.translate;
        if (translations[currentLang] && translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });
    
    // Apply saved sound preference
    const soundEnabled = localStorage.getItem('sound-enabled') !== 'false';
    if (typeof updateSoundState === 'function') {
        updateSoundState(soundEnabled);
    }
});