// Store the previous scroll position
let lastScrollTop = 0;

// Move and flip the pixel cat based on scroll direction
window.addEventListener('scroll', function () {
    // Get the cat element
    const pixelCat = document.getElementById('pixel-cat');

    // Stop if the cat element is missing
    if (!pixelCat) return;

    // Get the current vertical scroll position
    const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

    // Calculate total scrollable height
    const totalScrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    // Prevent division by zero
    if (totalScrollableHeight <= 0) return;

    // Calculate scroll progress across the page
    const scrollPercentage = currentScrollTop / totalScrollableHeight;

    // Calculate how far the cat should move horizontally
    const maxTravelDistance = window.innerWidth - pixelCat.offsetWidth;
    const currentMoveDistance = scrollPercentage * maxTravelDistance;

    // Determine cat direction based on scroll direction
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
