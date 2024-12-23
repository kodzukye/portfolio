let player;
let videoLoaded = false;
const VIDEO_ASPECT_RATIO = 16/9;

// This function is called automatically by YouTube API
function onYouTubeIframeAPIReady() {
    // Detect mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    player = new YT.Player('youtube-background', {
        videoId: '4HlEiocsR8M',
        playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            loop: 1,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            showinfo: 0,
            mute: 1,
            vq: isMobile ? 'hd720' : 'hd1080'
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onPlaybackQualityChange': onQualityChange
        }
    });
}

function onPlayerReady(event) {
    // Force highest quality
    player.setPlaybackQuality('hd1080');
    event.target.playVideo();
    
    // Create a playlist for true looping
    player.loadPlaylist({
        playlist: ['4HlEiocsR8M'],
        listType: 'playlist'
    });
    
    // Handle video sizing
    resizeVideo();
    window.addEventListener('resize', debounce(resizeVideo, 250));
}

function onPlayerStateChange(event) {
    // If video is playing and not shown title yet
    if (event.data === YT.PlayerState.PLAYING && !videoLoaded) {
        videoLoaded = true;
        // Wait a short moment to ensure video is visible
        setTimeout(showTitleScreen, 1000);
    }
    
    // If video ends, restart it
    if (event.data === YT.PlayerState.ENDED) {
        player.playVideo();
    }
}

function onQualityChange(event) {
    // If not highest quality, try to force it
    if (event.data !== 'hd1080') {
        player.setPlaybackQuality('hd1080');
    }
}

function showTitleScreen() {
    // Show the title screen with a fade effect
    const titleScreen = document.querySelector('.title-screen');
    titleScreen.classList.add('visible');
    
    // Now enable key press detection
    document.addEventListener('keydown', handleKeyPress);
}

function handleKeyPress(e) {
    if (!gameStarted) {
        startGame();
    }
}

function resizeVideo() {
    const container = document.querySelector('.video-container');
    const iframe = document.querySelector('#youtube-background iframe');
    
    if (!container || !iframe) return;

    // Get the container's dimensions
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const containerAspectRatio = containerWidth / containerHeight;

    let width, height, scale;

    // If container is wider than video aspect ratio
    if (containerAspectRatio > VIDEO_ASPECT_RATIO) {
        width = containerWidth;
        height = containerWidth / VIDEO_ASPECT_RATIO;
        // Calculate how much we need to scale up to cover any gaps
        scale = (containerHeight / height) * 1.1; // Add 10% to ensure no gaps
    } else {
        height = containerHeight;
        width = containerHeight * VIDEO_ASPECT_RATIO;
        // Calculate how much we need to scale up to cover any gaps
        scale = (containerWidth / width) * 1.1; // Add 10% to ensure no gaps
    }

    // Apply the calculated dimensions and scale
    iframe.style.width = `${width}px`;
    iframe.style.height = `${height}px`;
    iframe.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

// Update our YouTube player initialization to include resize handling
function onPlayerReady(event) {
    // Previous initialization code remains the same
    player.setPlaybackQuality('hd1080');
    event.target.playVideo();
    
    // Initial resize
    resizeVideo();
    
    // Add resize listener
    window.addEventListener('resize', debounce(resizeVideo, 250));
}

// Debounce function to prevent too many resize calculations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Load YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // Add loading indicator
    const videoContainer = document.querySelector('.video-container');
    videoContainer.insertAdjacentHTML('beforeend', '<div class="loading">Loading...</div>');

    // Handle mobile orientation changes
    window.addEventListener('orientationchange', () => {
        setTimeout(resizeVideo, 100);
    });
});
