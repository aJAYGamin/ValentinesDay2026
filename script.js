// --- AUDIO PERSISTENCE LOGIC ---
const audio = document.getElementById("myAudio");

window.addEventListener("load", () => {
    // 1. Check if we are on the home page (index.html)
    // If we are, we want to start the song over!
    if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
        localStorage.setItem("audioTime", "0"); 
    }

    // 2. Now check for the saved timestamp
    const savedTime = localStorage.getItem("audioTime");
    if (savedTime && audio) {
        audio.currentTime = parseFloat(savedTime);
        
        // Try to resume automatically (works on sub-pages)
        audio.play().catch(() => {
            console.log("Music waiting for user interaction on first page...");
        });
    }
});

// Save the current time of the song every second
if (audio) {
    setInterval(() => {
        localStorage.setItem("audioTime", audio.currentTime);
    }, 1000);
}

// Function used on index.html to start everything
function startStory(nextPage) {
    if (audio) {
        audio.play().then(() => {
            window.location.href = nextPage;
        }).catch(error => {
            // If play fails, still navigate to the next page
            window.location.href = nextPage;
        });
    } else {
        window.location.href = nextPage;
    }
}

// --- FALLING HEARTS LOGIC ---
function createHearts() {
    const container = document.getElementById('hearts-container');
    if (!container) return;

    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        container.appendChild(heart);
    }
}

// Trigger hearts on every page
document.addEventListener('DOMContentLoaded', createHearts);