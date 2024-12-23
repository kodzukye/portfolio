let player;
let videoLoaded = false;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-background', {
        videoId: '4HlEiocsR8M', // YouTube video ID
        playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 1,
            iv_load_policy: 3,
            loop: 1,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            showinfo: 0,
            mute: 1,
            vq: 'hd1080'
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onPlaybackQualityChange': onQualityChange
        }
    });
}

function onPlayerReady(event) {
    player.setPlaybackQuality('hd1080');
    event.target.playVideo();
    
    player.loadPlaylist({
        playlist: ['4HlEiocsR8M'],
        listType: 'playlist'
    });
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

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Create script tag for YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // Add a loading indicator if needed
    const videoContainer = document.querySelector('.video-container');
    videoContainer.insertAdjacentHTML('beforeend', '<div class="loading">Loading...</div>');
});
