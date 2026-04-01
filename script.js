// store the previous scroll position
let lastScrollTop = 0;

// Move and flip the pixel cat based on scroll direction
window.addEventListener('scroll', function () {
    // get the cat element
    const pixelCat = document.getElementById('pixel-cat');

    // stop if the cat element is missing
    if (!pixelCat) return;

    // get the current vertical scroll position
    const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

    // calculate total scrollable height
    const totalScrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    // prevent division by zero
    if (totalScrollableHeight <= 0) return;

    // calculate scroll progress across the page
    const scrollPercentage = currentScrollTop / totalScrollableHeight;

    // calculate how far the cat should move horizontally
    const maxTravelDistance = window.innerWidth - pixelCat.offsetWidth;
    const currentMoveDistance = scrollPercentage * maxTravelDistance;

    // determine cat direction based on scroll direction
    let scaleX = 1;

    if (currentScrollTop > lastScrollTop) {
        // Scrolling down: keep original direction
        scaleX = 1;
    } else {
        // Scrolling up: flip the cat horizontally
        scaleX = -1;
    }

    // Apply movement and direction flip
    pixelCat.style.transform =
        `translateX(-${currentMoveDistance}px) scaleX(${scaleX})`;

    // Save current scroll position for the next scroll event
    lastScrollTop = currentScrollTop;
});
// =========================
// NIGHT MODE TOGGLE
// =========================

// Get the night mode button
const nightModeBtn = document.getElementById("night-mode-toggle");

// Add click event to toggle night mode
nightModeBtn.addEventListener("click", function () {
    // Toggle class on body
    document.body.classList.toggle("night-mode");

    // Optional: change button text
    if (document.body.classList.contains("night-mode")) {
        nightModeBtn.textContent = "AM Mode";
    } else {
        nightModeBtn.textContent = "PM Mode";
    }
});
// =========================
// MUSIC TOGGLE
// =========================

// Get the music button and audio element
const musicToggleBtn = document.getElementById("musicToggleBtn");
const bgMusic = document.getElementById("bgMusic");

// Check both elements exist before running
if (musicToggleBtn && bgMusic) {
    musicToggleBtn.addEventListener("click", function () {
        // If music is paused, play it
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggleBtn.textContent = "Music: ON";
            musicToggleBtn.classList.remove("music-off");
            musicToggleBtn.classList.add("music-on");
        } else {
            // If music is already playing, pause it
            bgMusic.pause();
            musicToggleBtn.textContent = "Music: OFF";
            musicToggleBtn.classList.remove("music-on");
            musicToggleBtn.classList.add("music-off");
        }
    });
}