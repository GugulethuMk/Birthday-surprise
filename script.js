const correctPassword = "guy with a fro";

let slideIndex = 0;
let slides, bgMusic;

function checkPassword() {
  const input = document.getElementById("passwordInput").value.toLowerCase();
  const error = document.getElementById("loginError");

  if (input === correctPassword.toLowerCase()) {
    sessionStorage.setItem("birthdayAccess", "true");
    showTapPage();
  } else {
    error.textContent = "Oops! Try again, handsome 👀";
  }
}

function showTapPage() {
  document.getElementById("loginPage").classList.remove("active");
  document.getElementById("tapPage").classList.add("active");
}

function goToNext() {
  // Hide the letter page
  document.getElementById('letterPage').classList.remove('active');
  document.getElementById('letterPage').classList.add('hidden');
  
  // Show the slideshow container and start slideshow
  const slideshow = document.querySelector('.slideshow-container');
  slideshow.style.display = 'block';
    
  // Start slideshow
  startManualSlideshow();
}

document.addEventListener("DOMContentLoaded", () => {
  // Assign DOM elements
  slides = document.getElementsByClassName("slide");
  bgMusic = document.getElementById("bgMusic");

  const tapCard = document.getElementById("tapCard");
  const bigPopup = document.getElementById("bigPopup");
  const letterPage = document.getElementById("letterPage");
  const loveLetter = document.getElementById("loveLetter");
  const passwordInput = document.getElementById("passwordInput");

  // Show tapPage if already accessed
  if (sessionStorage.getItem("birthdayAccess") === "true") {
    showTapPage();
  }

  // Enter key on password input triggers check
  passwordInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      checkPassword();
    }
  });

  // tapCard click moves to letter page and triggers confetti
  tapCard.addEventListener("click", () => {
    document.getElementById("tapPage").classList.remove("active");
    letterPage.classList.add("active");

    setTimeout(() => {
      bigPopup.classList.remove("hidden");
      bigPopup.classList.add("show");
      launchConfetti();
    }, 800);

    setTimeout(() => {
      bigPopup.classList.remove("show");
      bigPopup.classList.add("hidden");
      loveLetter.classList.remove("hidden");
    }, 3500);
  });
    
// Add prev/next button listeners safely insidie DOMContentLoaded
document.getElementById("prevBtn").addEventListener("click", () =>{
    showSlide(slideIndex - 1);
})

document.getElementById("nextBtn").addEventListener("click", () =>{
    showSlide(slideIndex + 1);
})
    
// Pause all videos initially
  for (let i = 0; i < slides.length; i++) {
    const vid = slides[i].querySelector("video");
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
    }
  }
});

// Confetti animation function (no change)
function launchConfetti() {
  const wrapper = document.querySelector(".confetti-wrapper");
  if (!wrapper) return;

  for (let i = 0; i < 60; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDelay = Math.random() * 2 + "s";
    confetti.style.width = Math.random() * 8 + 4 + "px";
    confetti.style.height = Math.random() * 8 + 4 + "px";
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

    wrapper.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
  }
}

function getRandomColor() {
  const colors = ["#ff5c8a", "#fcb045", "#9c27b0", "#4caf50", "#03a9f4"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Slideshow and other functions unchanged, make sure they exist
function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }

  const currentSlide = slides[slideIndex - 1];
  currentSlide.style.display = "block";

  if (currentSlide.classList.contains("final-video")) {
    fadeOutMusic();
  }

  const video = currentSlide.querySelector("video");
  if (!video) {
    setTimeout(showSlides, 10000);
  } else {
    video.onended = () => {
    };
  }
}

function fadeOutMusic() {
  let volume = 1.0;
  const fadeInterval = setInterval(() => {
    if (volume > 0.05) {
      volume -= 0.05;
      bgMusic.volume = volume;
    } else {
      bgMusic.volume = 0;
      clearInterval(fadeInterval);
      bgMusic.pause();
    }
  }, 200);
}

// Add rest of slideshow controls, next/prev buttons, startManualSlideshow, etc.

function showSlide(index) {
  if (index >= slides.length) slideIndex = slides.length - 1;  // Don't go past last
  else if (index < 0) slideIndex = 0;                         // Don't go before first
  else slideIndex = index;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
      
  // Update buttons
  document.getElementById("prevBtn").disabled = slideIndex === 0;
  document.getElementById("nextBtn").disabled = slideIndex === slides.length - 1;
  }
    
const finalButtons = document.getElementById("finalButtons");
if (slideIndex === slides.length - 1) {
  finalButtons.style.display = "block";
} else {
  finalButtons.style.display = "none";
}


  const currentSlide = slides[slideIndex];
  currentSlide.style.display = "block";

  // Handle music fade if last slide is final video
  if (currentSlide.classList.contains("final-video")) {
    fadeOutMusic();
  } else {
    // Reset music volume if not on last slide
    if (bgMusic.paused) {
      bgMusic.play();
    }
    bgMusic.volume = 1;
  }

  // If current slide is a video, autoplay it (optional)
  const video = currentSlide.querySelector("video");
  if (video) {
    video.currentTime = 0;
    video.play();
    video.onended = () => {
      // Optional: disable next button or do something when video ends
    };
  }
}

// Initialize slideshow on showing slideshow container
function startManualSlideshow() {
  slideIndex = 0;
  showSlide(slideIndex);
  bgMusic.volume = 1;
  bgMusic.play();
}

function showFinalMessage() {
  document.getElementById("finalMessage").style.display = "block";
  document.getElementById("finalButtons").style.display = "none";
}
