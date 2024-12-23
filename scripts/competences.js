const competencesData = {
    "Realiser un developpement d'application": {
        subtitles: [
            {
                title: "Implementer des conception simple",
                level: "1/3",
                description: "Blablabla",
                technologies: ["python", "javascript", "c++"]
            },
            {
                title: "Elaborer des conceptions simple",
                level: "1/3",
                description: "Blablabla",
                technologies: ["html", "css", "javascript"]
            },
            {
                title: "Faire des essaies et evaluer leur resultat en regard de specifications",
                level: "1/3",
                description: "Blablabla",
                technologies: ["html", "css", "javascript"]
            },
            {
                title: "Developper des interfaces utilisateurs",
                level: "1/3",
                description: "Blablabla",
                technologies: ["html", "css", "javascript"]
            },
            // Add more subtitles as needed
        ]
    },
    "Optimiser des applications": {
        subtitles: [
            {
                title: "Analyser un probleme avec methodes",
                level: "1/3",
                description: "Blablabla",
                technologies: ["python", "nodejs"]
            },
            {
                title: "Comparer des algorithme pour des probleme classiques",
                level: "1/3",
                description: "Blablabla",
                technologies: ["python", "nodejs"]
            },
            {
                title: "Formaliser et mettre en oeuvre des outils mathematique de l’informatique",
                level: "1/3",
                description: "Blablabla",
                technologies: ["python", "nodejs"]
            },
            // Add more subtitles
        ]
    },
    "Gerer des donnees de l'information": {
        subtitles: [
            {
                title: "Mettre a jour et interroger une base de donnees relationnelles",
                level: "1/3",
                description: "Blablabla",
                technologies: ["python", "javascript", "c++"]
            },
            {
                title: "Visualiser des donnees",
                level: "1/3",
                description: "Blablabla",
                technologies: ["html", "css", "javascript"]
            },
            {
                title: "Concevoir une base de donnees relationnelle a partir d’un cahier des charges",
                level: "1/3",
                description: "Blablabla",
                technologies: ["html", "css", "javascript"]
            },
            // Add more subtitles as needed
        ]
    },
    "Conduire un projet": {
        subtitles: [
            {
                title: "Apprehender les besoins du client et de l’utilisateur",
                level: "1/3",
                description: "Blablabla",
                technologies: ["python", "javascript", "c++"]
            },
            {
                title: "Mettre en place les outils de gestion de projet",
                level: "1/3",
                description: "Blablabla",
                technologies: ["html", "css", "javascript"]
            },
            {
                title: "Identifier les acteurs et les differents phases d’un cycle de developpement",
                level: "1/3",
                description: "Blablabla",
                technologies: ["html", "css", "javascript"]
            },
            // Add more subtitles as needed
        ]
    },
    "Collaborer au sein d'une equipe informatique": {
        subtitles: [
            {
                title: "Apprehender l'ecosysteme numerique",
                level: "1/3",
                description: "Blablabla",
                technologies: ["python", "javascript", "c++"]
            },
            {
                title: "Decouvrir les aptitudes requises selon les differentes secteurs informatiques",
                level: "1/3",
                description: "Blablabla",
                technologies: ["html", "css", "javascript"]
            },
            {
                title: "Identifier les statuts, les fonctions et les roles de chaque membre d’une equipe pluridisciplinaire",
                level: "1/3",
                description: "Blablabla",
                technologies: ["html", "css", "javascript"]
            },
            {
                title: "Acquerir les competences interpersonnelles pour travailler en equipes",
                level: "1/3",
                description: "Blablabla",
                technologies: ["html", "css", "javascript"]
            },
            // Add more subtitles as needed
        ]
    },
    // Add data for other main titles
};

document.addEventListener('DOMContentLoaded', () => {
    const titleNav = document.querySelector('.title-nav');
    const subtitlesSidebar = document.querySelector('.subtitles-sidebar');
    const mainContentArea = document.querySelector('.main-content-area');
    let currentTitle = null;

    // Function to update subtitles when a title is clicked
    function updateSubtitles(titleText) {
        console.log('Attempting to find:', titleText);
        console.log('Available titles:', Object.keys(competencesData));
        
        const titleData = competencesData[titleText];
    
        if (!titleData) {
            console.log('No matching data found for:', titleText);
            console.log('Exact string comparison failed, trying normalized comparison...');
            
            // Try normalized comparison as fallback
            const normalizedTitleText = titleText.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            titleData = Object.entries(competencesData).find(([key]) => 
                key.normalize("NFD").replace(/[\u0300-\u036f]/g, "") === normalizedTitleText
            )?.[1];
        }
    
        if (!titleData) {
            console.log('Still no match found after normalization');
            return;
        }

        // Update active title styling
        document.querySelectorAll('.title-item').forEach(item => {
            item.classList.remove('active');
        });
        event.currentTarget.classList.add('active');

        // Update subtitles
        subtitlesSidebar.innerHTML = titleData.subtitles.map(subtitle => `
            <div class="subtitle-item" data-title="${titleText}" data-subtitle="${subtitle.title}">
                <span>${subtitle.title}</span>
                <span class="level">Level : ${subtitle.level}</span>
            </div>
        `).join('');

        currentTitle = titleText;
    }

    // Function to update main content when a subtitle is clicked
    function updateMainContent(titleText, subtitleText) {
        const titleData = competencesData[titleText];
        const subtitle = titleData.subtitles.find(sub => sub.title === subtitleText);
        if (!subtitle) return;

        // Update active subtitle styling
        document.querySelectorAll('.subtitle-item').forEach(item => {
            item.classList.remove('selected');
        });
        event.currentTarget.classList.add('selected');

        // Update main content area
        mainContentArea.innerHTML = `
            <div class="selected-title">
                <div class="arrow-icon">➜➜➜➜</div>
                <h2>${subtitleText}</h2>
            </div>
            <div class="tech-icons">
                ${subtitle.technologies.map(tech => `
                    <img src="../assets/images/icons/${tech}.png" alt="${tech}" title="${tech}">
                `).join('')}
            </div>
            <div class="description">
                <p>${subtitle.description}</p>
            </div>
        `;
    }

    // Add click event listeners to title buttons
    titleNav.addEventListener('click', (event) => {
        const titleItem = event.target.closest('.title-item');
        if (!titleItem) return;

        const titleText = titleItem.textContent;
        updateSubtitles(titleText);
    });

    // Add click event listener for subtitles (using event delegation)
    subtitlesSidebar.addEventListener('click', (event) => {
        const subtitleItem = event.target.closest('.subtitle-item');
        if (!subtitleItem) return;

        const titleText = subtitleItem.dataset.title;
        const subtitleText = subtitleItem.dataset.subtitle;
        updateMainContent(titleText, subtitleText);
    });

    // Initialize with first title selected
    const firstTitle = Object.keys(competencesData)[0];
    updateSubtitles(firstTitle);
});
