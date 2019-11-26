let index = 0;
const slides = document.querySelectorAll('figure');
const btnPrev = document.querySelector('.prev');
const btnNext = document.querySelector('.next');
btnPrev.addEventListener('click', function() {
  plusSlides(-1);
});
btnNext.addEventListener('click', function() {
  plusSlides(1);
});

window.addEventListener('keydown', function(e) {
  if (e.keyCode == '37') {
    plusSlides(-1);
  } else if (e.keyCode == '39') {
    plusSlides(1);
  }
});

let playing = true; // Slideshow is playing by default
const pauseButton = document.querySelector('.btnPause');

showSlides();

// Reveal hidden slide
function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slides[index].style.display = 'block';
}

// Next/previous controls
function plusSlides(n) {
  index += n;
  if (index >= slides.length) {
    index = 0;
  }
  if (index < 0) {
    index = slides.length - 1;
  }
  showSlides();
}

// Automatic Slideshow
playSlideshow();

function playSlideshow() {
  pauseButton.classList.replace('fa-play-circle', 'fa-pause-circle');
  playing = true;
  slideInterval = setInterval(function() {
    plusSlides(1);
  }, 5000); // Change image every 5 seconds
}

// Play/Pause controls
function pauseSlideshow() {
  pauseButton.classList.replace('fa-pause-circle', 'fa-play-circle');
  playing = false;
  clearInterval(slideInterval);
}

pauseButton.onclick = function() {
  if (playing) {
    pauseSlideshow();
  } else {
    playSlideshow();
  }
};

// let t1 = test;
// let t2 = test(2);
// console.log(t1);
// console.log('---');
// console.log(t2);
// function test(n) {
//   return n * 2;
// }
