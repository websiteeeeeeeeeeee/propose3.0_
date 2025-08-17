// Background music functionality
const backgroundMusic = {
    audio: null,
    isPlaying: false,
    currentTime: 0,

    init() {
        // Create audio element
        this.audio = new Audio('music.mp3');
        this.audio.loop = true;
        
        // Load saved state
        const savedTime = localStorage.getItem('musicTime');
        const wasPlaying = localStorage.getItem('musicPlaying') === 'true';
        
        if (savedTime) {
            this.audio.currentTime = parseFloat(savedTime);
        }
        
        // Save state before page unload
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('musicTime', this.audio.currentTime);
            localStorage.setItem('musicPlaying', this.isPlaying);
        });

        // Start playing if it was playing before
        if (wasPlaying) {
            this.play();
        }
    },

    play() {
        if (this.audio) {
            this.audio.play();
            this.isPlaying = true;
            localStorage.setItem('musicPlaying', 'true');
        }
    },

    pause() {
        if (this.audio) {
            this.audio.pause();
            this.isPlaying = false;
            localStorage.setItem('musicPlaying', 'false');
        }
    },

    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    backgroundMusic.init();
}); 