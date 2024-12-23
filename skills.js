document.addEventListener('DOMContentLoaded', () => {
    // Skills data
    const skillsData = {
        dev: [
            { id: 1, name: 'JavaScript', level: '04/20', desc: 'Advanced proficiency in modern JavaScript development including ES6+ features.' },
            { id: 2, name: 'Python', level: '15/20', desc: 'Expertise in Python programming for various applications including data analysis and automation.' },
            { id: 3, name: 'C++', level: '05/20', desc: 'Strong foundation in C++ for systems programming and game development.' },
            { id: 4, name: 'PHP', level: '08/20', desc: 'Server-side web development and database integration.' },
            { id: 5, name: 'HTML', level: '16/20', desc: 'Advanced web development and responsive design.' },
            { id: 6, name: 'CSS', level: '12/20', desc: 'Advanced web development and responsive design.' }
        ],
    
        gamedev: [
            { id: 7, name: 'Unity', level: '02/20', desc: 'Game development with C# in Unity, including 2D and 3D game creation.' },
            { id: 8, name: 'Unreal', level: '02/20', desc: 'Game development using Unreal Engine with Blueprint and C++.' },
            { id: 9, name: 'Godot', level: '03/20', desc: 'Open-source game development with GDScript.' },
            { id: 10, name: 'Tiled', level: '13/20', desc: 'Level design and tile map creation for 2D games.' }
        ],
    
        db: [
            { id: 11, name: 'MySQL', level: '12/20', desc: 'Database design and complex query optimization.' },
            { id: 12, name: 'SQLite', level: '12/20', desc: 'Lightweight database management for mobile and desktop applications.' }
        ],
    
        tools: [
            { id: 13, name: 'Visual Studio Code', level: '18/20', desc: 'Advanced usage of VS Code for web and general development.' },
            { id: 14, name: 'Visual Studio 2022', level: '15/20', desc: 'Professional IDE for C++ and .NET development.' }
        ],
    
        art: [
            { id: 15, name: 'Blender', level: '08/20', desc: '3D modeling, animation, and rendering.' },
            { id: 16, name: 'Krita', level: '15/20', desc: 'Digital painting and 2D art creation.' },
            { id: 17, name: 'Ibis Paint X', level: '15/20', desc: 'Digital illustration and mobile art creation.' }
        ],

        music: [
            { id: 18, name: 'FL Studio', level:'10/20', desc: 'blablabla.'},
        ]
    };

    // DOM Elements
    const skillsGrid = document.getElementById('skillsGrid');
    const skillInfo = document.getElementById('skillInfo');
    const categoryBtns = document.querySelectorAll('.category-btn');

    // Current state
    let currentCategory = 'dev';

    // Functions
    function displaySkills(category) {
        skillsGrid.innerHTML = '';
        skillsData[category].forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.className = 'skill-item';
            skillElement.setAttribute('data-skill-id', skill.id);
            skillElement.innerHTML = `
                <img src="../assets/images/icons/${skill.name.toLowerCase()}.png" alt="${skill.name}" title="${skill.name}">
                <div class="skill-level">Level : ${skill.level}</div>
            `;
            
            skillElement.addEventListener('click', () => showSkillDetails(skill));
            skillsGrid.appendChild(skillElement);
        });
    }

    function showSkillDetails(skill) {
        // Remove active class from all skills
        document.querySelectorAll('.skill-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to selected skill
        const selectedSkill = document.querySelector(`[data-skill-id="${skill.id}"]`);
        if (selectedSkill) selectedSkill.classList.add('active');

        // Update details panel
        skillInfo.innerHTML = `
            <h1>${skill.name}</h1>
            <h2>${skill.name}</h2>

            <div class="skill-level">♥ ${skill.level}</div>
            <p class="skill-description">${skill.desc}</p>
        `;
    }

    // Event Listeners
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active category
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update displayed skills
            currentCategory = btn.getAttribute('data-category');
            displaySkills(currentCategory);
        });
    });


    // Sorting state
    let sortState = {
        type: 'name', // 'name' or 'level'
        ascending: true
    };

    // Sort Function
    function handleSort() {
        const sortBtn = document.querySelector('.sort-btn');
        
        // Toggle sort type
        sortState.type = sortState.type === 'name' ? 'level' : 'name' ;
        sortState.ascending = true;

        // Update button text
        sortBtn.textContent = `Sort by ${sortState.type === 'name' ? 'Level' : 'Name'} (Y)`;
        sortBtn.classList.toggle('active');

        // Sort current category skills
        const sortedSkills = [...skillsData[currentCategory]].sort((a, b) => {
            if (sortState.type === 'name') {
                return a.name.localeCompare(b.name);
            } else {
                // Extract numbers from level string for comparison
                const levelA = parseInt(a.level.split('/')[0]);
                const levelB = parseInt(b.level.split('/')[0]);
                return levelB - levelA; // Sort by level in descending order
            }
        });

        // Update skillsData and redisplay
        skillsData[currentCategory] = sortedSkills;
        displaySkills(currentCategory);
    }

    // Back Function
    function handleBack() {
        // Add glitch effect before navigating
        const staticOverlay = document.createElement('div');
        staticOverlay.className = 'static-transition active';
        document.body.appendChild(staticOverlay);

        setTimeout(() => {
            window.location.href = '../pages';
        }, 500);
    }

    // Rotate Function - Let's make it rotate the skill icons for fun
    function handleRotate() {
        const skills = document.querySelectorAll('.skill-item');
        skills.forEach(skill => {
            skill.style.transition = 'transform 0.5s ease';
            skill.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            // Reset rotation after animation
            setTimeout(() => {
                skill.style.transform = 'rotate(0deg)';
            }, 500);
        });
    }

    // Keyboard Controls
    document.addEventListener('keydown', (e) => {
        switch(e.key.toLowerCase()) {
            case 'y':
                handleSort();
                break;
            case 'b':
                handleBack();
                break;
            case 'r':
                handleRotate();
                break;
        }
    });

    // Attach functions to window so they can be called from HTML
    window.handleSort = handleSort;
    window.handleBack = handleBack;
    window.handleRotate = handleRotate;

    // Initial display
    displaySkills(currentCategory);

});

