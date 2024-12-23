document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const titleScreen = document.querySelector('.title-screen');
    const menuContainer = document.querySelector('.menu-container');
    const pressPrompt = document.querySelector('.press-prompt');
    const optionsMenu = document.querySelector('.options-menu');
    const creditsScreen = document.querySelector('.credits-screen');
    const buttons = document.querySelectorAll('.menu-button');
    
    // Audio elements (you'll need to add your own audio files)
    const sounds = {
        start: new Audio('assets/sounds/start.mp3'),
        select: new Audio('assets/sounds/select.mp3'),
        back: new Audio('assets/sounds/back.mp3')
    };

    // Initial state
    let gameStarted = false;
    
    // Handle initial key press
    document.addEventListener('keydown', (e) => {
        if (!gameStarted) {
            startGame();
        }
    });

    // Start game function
    function startGame() {
        gameStarted = true;
        pressPrompt.style.display = 'none';
        menuContainer.classList.add('active');
    }

    // Button hover sound effects
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            if (gameStarted) {
                sounds.select.currentTime = 0;
                sounds.select.play();
            }
        });
    });

    // Button click handlers
    document.querySelector('.start-btn').addEventListener('click', () => {
        if (!gameStarted) return;
        
        sounds.start.play();
        titleScreen.style.opacity = '0';
        
        setTimeout(() => {
            window.location.href = 'pages/';
        }, 1000);
    });

    // Update these lines in your existing click handlers
document.querySelector('.options-btn').addEventListener('click', () => {
    if (!gameStarted) return;
    optionsMenu.classList.remove('hidden');
    optionsMenu.classList.add('active'); // Add active class for animation
});

document.querySelector('.credits-btn').addEventListener('click', () => {
    if (!gameStarted) return;
    creditsScreen.classList.remove('hidden');
    creditsScreen.classList.add('active'); // Add active class for animation
});

// Update the back button handlers
document.querySelectorAll('.back-button').forEach(button => {
    button.addEventListener('click', () => {
        sounds.back.play();
        const menu = button.closest('.options-menu, .credits-screen');
        menu.classList.remove('active');
        // Add hidden class after animation completes
        setTimeout(() => {
            menu.classList.add('hidden');
        }, 500);
    });
});

    // Volume control
    const volumeSlider = document.querySelector('.volume-slider');
    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        Object.values(sounds).forEach(sound => {
            sound.volume = volume;
        });
    });

    // Sound effects toggle
    const sfxToggle = document.querySelector('.sfx-toggle');
    sfxToggle.addEventListener('change', (e) => {
        const muted = !e.target.checked;
        Object.values(sounds).forEach(sound => {
            sound.muted = muted;
        });
    });

    function createPageTransition() {
        // Create transition overlay
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        document.body.appendChild(overlay);
    
        // Add the necessary CSS
        const style = document.createElement('style');
        style.textContent = `
            .page-transition-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: black;
                z-index: 1000;
                transform: translateY(100%);
                transition: transform 0.5s ease-in-out;
            }
    
            .page-transition-overlay.active {
                transform: translateY(0);
            }
    
            .page-transition-overlay.fade-out {
                transform: translateY(-100%);
            }
        `;
        document.head.appendChild(style);
    
        return overlay;
    }
    
    function handlePageTransition(url) {
        const overlay = createPageTransition();
        
        // Transition in
        overlay.classList.add('active');
        
        // After transition completes, navigate to new page
        setTimeout(() => {
            window.location.href = url;
        }, 500);
    }
    
    // Modify your start button click handler
    document.querySelector('.start-btn').addEventListener('click', () => {
        if (!gameStarted) return;
        
        sounds.start.play();
        handlePageTransition('pages/');
    });
    
    // Add language handling
    const languageSelect = document.querySelector('.language-select');
    languageSelect.addEventListener('change', (e) => {
        const selectedLanguage = e.target.value;
        // Store the selected language
        localStorage.setItem('preferred-language', selectedLanguage);
        
        // You can implement language switching logic here
        // This might involve loading different text content
        // based on the selected language
    });
    
    // Check for stored language preference on page load
    document.addEventListener('DOMContentLoaded', () => {
        const storedLanguage = localStorage.getItem('preferred-language');
        if (storedLanguage) {
            languageSelect.value = storedLanguage;
            // Apply the stored language settings
        }
    });

    function initializePageTransitions() {
        // Create transition element
        const transition = document.createElement('div');
        transition.className = 'page-transition';
        document.body.appendChild(transition);
    
        // Handle all navigation
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link) {
                e.preventDefault();
                const href = link.getAttribute('href');
                
                // Trigger transition
                transition.classList.add('active');
                
                // Navigate after transition
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            }
        });
    }
    
    // Language content updates
    function updateLanguage(lang) {
        const translations = {
            en: {
                start: 'Start',
                options: 'Options',
                credits: 'Credits',
                // Add more translations
            },
            fr: {
                start: 'Commencer',
                options: 'Options',
                credits: 'Crédits',
                // Add more translations
            },
            // Add more languages
        };
    
        // Update text content throughout the page
        Object.entries(translations[lang]).forEach(([key, value]) => {
            const elements = document.querySelectorAll(`[data-translate="${key}"]`);
            elements.forEach(el => el.textContent = value);
        });
    }
    
    // Initialize everything
    document.addEventListener('DOMContentLoaded', () => {
        initializePageTransitions();
        initializeLanguageSystem();
        
        // Load preferred language if set
        const savedLang = localStorage.getItem('preferred-language');
        if (savedLang) {
            updateLanguage(savedLang);
            document.querySelector(`[data-lang="${savedLang}"]`).classList.add('active');
        }
    });

    // Language handling
    function initializeLanguageSystem() {
        const languageButtons = document.querySelectorAll('.language-btn');
        
        // Load saved language preference
        const currentLang = localStorage.getItem('preferred-language') || 'en';
        updateLanguage(currentLang);
        
        // Update active button
        document.querySelector(`[data-lang="${currentLang}"]`)?.classList.add('active');
        
        languageButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                languageButtons.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Get and save selected language
                const lang = btn.dataset.lang;
                localStorage.setItem('preferred-language', lang);
                
                // Update page content
                updateLanguage(lang);
            });
        });
    }

    // Update page content based on selected language
    function updateLanguage(lang) {
        const elements = document.querySelectorAll('[data-translate]');
        
        elements.forEach(element => {
            const key = element.dataset.translate;
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    }

    // Sound effects handling
    function initializeSoundSystem() {
        const sfxToggle = document.getElementById('sfx-toggle');
        
        // Load saved sound preference
        const soundEnabled = localStorage.getItem('sound-enabled') !== 'false';
        sfxToggle.checked = soundEnabled;
        updateSoundState(soundEnabled);
        
        sfxToggle.addEventListener('change', (e) => {
            const enabled = e.target.checked;
            localStorage.setItem('sound-enabled', enabled);
            updateSoundState(enabled);
        });
    }

    function updateSoundState(enabled) {
        // Update all sound elements
        Object.values(sounds).forEach(sound => {
            sound.muted = !enabled;
        });
    }

    // Initialize both systems
    document.addEventListener('DOMContentLoaded', () => {
        initializeLanguageSystem();
        initializeSoundSystem();
    });
});