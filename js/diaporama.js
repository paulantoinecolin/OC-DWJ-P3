class Diaporama {
  constructor(idContainer) {
    this.index = 0;
    this.container = document.getElementById(idContainer);
    this.slides = this.container.querySelectorAll('figure');
    this.btnPrev = this.container.querySelector('.prev');
    this.btnNext = this.container.querySelector('.next');

    this.playing = true; // Slideshow is playing by default
    this.pauseButton = this.container.querySelector('.btnPause');

    this.setListeners();
    this.showSlides();
    // this.playSlideshow(); // <-ENLEVER LES COMMENTAIRES POUR RELANCER LE SLIDESHOW AUTO
  }

  setListeners() {
    this.btnPrev.addEventListener('click', () => {
      this.plusSlides(-1);
    });
    this.btnNext.addEventListener('click', () => {
      this.plusSlides(1);
    });

    window.addEventListener('keydown', e => {
      if (e.keyCode == '37') {
        this.plusSlides(-1);
      } else if (e.keyCode == '39') {
        this.plusSlides(1);
      }
    });

    this.pauseButton.addEventListener('click', () => {
      this.playing ? this.pauseSlideshow() : this.playSlideshow();
    });
  }

  // this.pauseButton.addEventListener('click', () => {
  //   if (this.playing) {
  //     this.pauseSlideshow();
  //   } else {
  //     this.playSlideshow();
  //   }
  // });

  // Reveal hidden slide
  showSlides() {
    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].style.display = 'none';
    }
    this.slides[this.index].style.display = 'block';
  }

  // Automatic Slideshow
  playSlideshow() {
    this.pauseButton.classList.replace('fa-play-circle', 'fa-pause-circle');
    this.playing = true;
    this.slideInterval = setInterval(() => {
      this.plusSlides(1);
    }, 5000); // Change image every 5 seconds
  }

  // Next/previous controls
  plusSlides(n) {
    this.index += n;
    if (this.index >= this.slides.length) {
      this.index = 0;
    }
    if (this.index < 0) {
      this.index = this.slides.length - 1;
    }
    this.showSlides();
  }

  // Play/Pause controls
  pauseSlideshow() {
    this.pauseButton.classList.replace('fa-pause-circle', 'fa-play-circle');
    this.playing = false;
    clearInterval(this.slideInterval);
  }
}
