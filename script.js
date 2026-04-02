/* =========================
PIXEL CAT SCROLL ANIMATION : my intention was to make the pixel cat move across
 the screen as the user scrolls down, and flip its direction when the user scrolls up. 
 the cat's horizontal position is determined by how far down the page the user has scrolled.
 with javascript, I have the help of chatGPT to explain and give example about how these code works, then I made adjustments to achieve the effect I want.
   ========================= */

// store the previous scroll position
let lastScrollTop = 0;

// this function move and flip the pixel cat based on scroll direction
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
        // scrolling down: keep original direction
        scaleX = 1;
    } else {
        // scrolling up: flip the cat horizontally
        scaleX = -1;
    }

    // apply movement and direction flip
    pixelCat.style.transform =
        `translateX(-${currentMoveDistance}px) scaleX(${scaleX})`;

    // Save current scroll position for the next scroll event
    lastScrollTop = currentScrollTop;
});


// =========================
// SWITCHING BETWEEN A.M MODE AND P.M MODE
// =========================

// get the night mode button
const nightModeBtn = document.getElementById("night-mode-toggle");

// Add click event to toggle night mode
nightModeBtn.addEventListener("click", function () {
    // Toggle class on body
    document.body.classList.toggle("night-mode");

    // change button text from a.m to p.m and vice versa
    if (document.body.classList.contains("night-mode")) {
        nightModeBtn.textContent = "A.M Mode";
    } else {
        nightModeBtn.textContent = "P.M Mode";
    }
});

//= =========================
// MAKE THE MUSIC PLAY AND PAUSE
// =========================

// Get the music button and audio element
const musicToggleBtn = document.getElementById("musicToggleBtn");
const bgMusic = document.getElementById("bgMusic");

// Check both elements exist 
if (musicToggleBtn && bgMusic) {
    musicToggleBtn.addEventListener("click", function () {
        // when music is paused, play.
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggleBtn.textContent = "Music: ON";
            musicToggleBtn.classList.remove("music-off");
            musicToggleBtn.classList.add("music-on");
        } else {
            // when music is already playing, pause.
            bgMusic.pause();
            musicToggleBtn.textContent = "Music: OFF";
            musicToggleBtn.classList.remove("music-on");
            musicToggleBtn.classList.add("music-off");
        }
    });

/* =========================
 BLOB EFFECTS FLOATING IN THE BACKGROUND: i use a canvas element to create a
 layer of blob floating in the background, as i want to add movement (as a indication of time always running) to
 the experience. however i dont want them to be too distracting so i kept them soft with blur and gradient effects.
 ========================= */

 // I resize the canvas to always match the full screen size.
}
const canvas = document.getElementById("blob-canvas");
const ctx = canvas.getContext("2d");

let blobs = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
 // generate particle with random position, size, opacity, and speed. 
function createBlobs() {
  blobs = [];

  for (let i = 0; i < 13; i++) {
    blobs.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 35 + 5, 
      alpha: Math.random() * 0.05 + 0.01,
      speedX: (Math.random() - 0.5) * 1.2, 
      speedY: (Math.random() - 0.5) * 1.2
    });
  }
}
//I draw each blob using a radial gradient to match the soft aesthetic.
function drawBlob(blob) {
  const gradient = ctx.createRadialGradient(
    blob.x, blob.y, 0,
    blob.x, blob.y, blob.radius
  );

  gradient.addColorStop(0, `rgba(0, 0, 0, ${blob.alpha})`);
  gradient.addColorStop(0.1, `rgba(0, 0, 0, ${blob.alpha * 0.4})`);
  gradient.addColorStop(1, `rgba(195, 241, 209, 0.98)`);

  ctx.beginPath();
  ctx.fillStyle = gradient;
  ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
  ctx.fill();
}
/* This function animates the particles. I clear the canvas each frame, update the position of each blob, and redraw them to create continuous movement.
If a blob moves outside the screen, I reposition it to the opposite side
to create an infinite looping effect. */

function animateBlobs() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  blobs.forEach(blob => {
    blob.x += blob.speedX;
    blob.y += blob.speedY;

    if (blob.x < -20) blob.x = canvas.width + 20;
    if (blob.x > canvas.width + 20) blob.x = -20;
    if (blob.y < -20) blob.y = canvas.height + 20;
    if (blob.y > canvas.height + 20) blob.y = -20;

    drawBlob(blob);
  });

  requestAnimationFrame(animateBlobs);
}

resizeCanvas();
createBlobs();
animateBlobs();

window.addEventListener("resize", () => {
  resizeCanvas();
  createBlobs();
});