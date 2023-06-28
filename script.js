var scrollableDiv = document.getElementById('othertexts');

scrollableDiv.addEventListener('scroll', function() {
    console.log('logging')
  var navbar = document.getElementById('navbar');
  var scrollPosition = scrollableDiv.scrollTop;

  if (scrollPosition > 0) {
    navbar.classList.add('headerscrolled');
  } else {
    navbar.classList.remove('headerscrolled');
  }
});


const swiper = new Swiper(".swiper-slider", {
    // Optional parameters
    centeredSlides: true,
    slidesPerView: 1,
    grabCursor: true,
    freeMode: false,
    loop: true,
    mousewheel: false,
    keyboard: {
        enabled: true
    },

    // Enabled autoplay mode
    autoplay: {
        delay: 4000,
        disableOnInteraction: false
    },

    // If we need pagination
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: false,
        clickable: true
    },

    // If we need navigation
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },

    // Responsive breakpoints
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 10
        },
        1024: {
            slidesPerView: 1,
            spaceBetween: 10
        }
    }
});




  window.addEventListener('DOMContentLoaded', function() {
    const toggleMode = document.getElementById('toggle-mode');
  
    // Set initial mode based on local storage
    const savedMode = localStorage.getItem('mode');
    if (savedMode === 'dark') {
      enableDarkMode();
    } else {
      enableLightMode();
    }
  
    // Toggle mode when the switch is clicked
    toggleMode.addEventListener('change', function() {
      if (this.checked) {
        enableDarkMode();
        localStorage.setItem('mode', 'dark');
      } else {
        enableLightMode();
        localStorage.setItem('mode', 'light');
      }
    });
  
    function enableDarkMode() {
      document.documentElement.classList.add('dark');
    }
  
    function enableLightMode() {
      document.documentElement.classList.remove('dark');
    }
  });
  


  const audioPlayer = document.getElementById('audioPlayer');
  const playlistItems = document.querySelectorAll('#playlist li');
  const playPauseButton = document.getElementById('playPauseButton');
  const vinylSpinner = document.getElementById('vinylSpinner');
  const seeker = document.getElementById('seeker');
  const seekerProgress = document.getElementById('seekerProgress');
  const currentTime = document.getElementById('currentTime');
  const duration = document.getElementById('duration');
  const volumeRange = document.getElementById('volumeRange');
  let isPlaying = false;
  let currentTrack = 0;

    function myFunction() {
  alert('ske');
}


function playTracks() {
    
    audioPlayer.play();
    isPlaying = true;
    playPauseButton.classList.remove('play');
    playPauseButton.classList.add('pause');
    vinylSpinner.classList.add('spinner');

   
  }

  function pauseTrack() {
    console.log('clicked')
    audioPlayer.pause();
    isPlaying = false;
    playPauseButton.classList.remove('pause');
    playPauseButton.classList.add('play');
   
  }

window.addEventListener('DOMContentLoaded', function() {





  function playTrack(index) {
    const track = playlistItems[index];
    const trackSource = track.getAttribute('data-src');
    const trackName = track.textContent;

    audioPlayer.src = trackSource;
    audioPlayer.load();
    audioPlayer.play();
    isPlaying = true;
    playPauseButton.classList.remove('play');
    playPauseButton.classList.add('pause');
    vinylSpinner.classList.add('spinner');

    document.getElementById('trackName').textContent = trackName;
    document.getElementById('stitle').textContent = trackName;
  }

  function playTracks() {
    
    audioPlayer.play();
    isPlaying = true;
    playPauseButton.classList.remove('play');
    playPauseButton.classList.add('pause');
    vinylSpinner.classList.add('spinner');

    document.getElementById('trackName').textContent = trackName;
    document.getElementById('stitle').textContent = trackName;
  }

  function pauseTrack() {
    console.log('clicked')
    audioPlayer.pause();
    isPlaying = false;
    playPauseButton.classList.remove('pause');
    playPauseButton.classList.add('play');
  
  }


  function togglePlayPause() {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTracks();
  }
}


playPauseButton.addEventListener('click', togglePlayPause);

const volumeRange = document.getElementById('volumeRange');

volumeRange.addEventListener('input', function() {
  audioPlayer.volume = volumeRange.value;
});

audioPlayer.volume = volumeRange.value;

  function playNextTrack() {
    currentTrack = (currentTrack + 1) % playlistItems.length;
    playTrack(currentTrack);
  }

  function playPreviousTrack() {
    currentTrack = (currentTrack - 1 + playlistItems.length) % playlistItems.length;
    playTrack(currentTrack);
  }

  function updateSeeker() {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    seekerProgress.style.width = `${progress}%`;
    currentTime.textContent = formatTime(audioPlayer.currentTime);
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  audioPlayer.addEventListener('ended', playNextTrack);
  audioPlayer.addEventListener('timeupdate', updateSeeker);
  audioPlayer.addEventListener('pause', pauseTrack);

  playPauseButton.addEventListener('click', function() {
    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack(currentTrack);
    }
  });

  seeker.addEventListener('click', function(e) {
    const rect = seeker.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = offsetX / rect.width;
    const seekTime = percentage * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
    updateSeeker();
  });

  document.getElementById('prevButton').addEventListener('click', playPreviousTrack);
  document.getElementById('nextButton').addEventListener('click', playNextTrack);

  for (let i = 0; i < playlistItems.length; i++) {
    playlistItems[i].addEventListener('click', function() {
      currentTrack = i;
      playTrack(currentTrack);
    });
  }

  function updateDuration() {
    duration.textContent = formatTime(audioPlayer.duration);
  }

  audioPlayer.addEventListener('loadedmetadata', updateDuration);

  playTrack(currentTrack);
});




const sliders = [...document.querySelectorAll(".slider__container")];
const sliderControlPrev = [...document.querySelectorAll(".slider__control.prev")];
const sliderControlNext = [...document.querySelectorAll(".slider__control.next")];

sliders.forEach((slider, i) => {
  let isDragStart = false,
      isDragging = false,
      isSlide = false,
      prevPageX,
      prevScrollLeft,
      positionDiff;

  const sliderItem = slider.querySelector(".slider__item");
  var isMultislide = (slider.dataset.multislide === 'true');

  sliderControlPrev[i].addEventListener('click', () => {
    if (isSlide) return;
    isSlide = true;
    let slideWidth = isMultislide ? slider.clientWidth : sliderItem.clientWidth;
    slider.scrollLeft += -slideWidth;
    setTimeout(function(){ isSlide = false; }, 700);
  });

  sliderControlNext[i].addEventListener('click', () => {
    if (isSlide) return;
    isSlide = true;
    let slideWidth = isMultislide ? slider.clientWidth : sliderItem.clientWidth ;
    slider.scrollLeft += slideWidth;
    setTimeout(function(){ isSlide = false; }, 700);
  });

  function autoSlide() {
    if(slider.scrollLeft - (slider.scrollWidth - slider.clientWidth) > -1 || slider.scrollLeft <= 0) return;
    positionDiff = Math.abs(positionDiff);
    let slideWidth = isMultislide ? slider.clientWidth : sliderItem.clientWidth;
    let valDifference = slideWidth - positionDiff;
    if(slider.scrollLeft > prevScrollLeft) {
        return slider.scrollLeft += positionDiff > slideWidth / 5 ? valDifference : -positionDiff;
    }
    slider.scrollLeft -= positionDiff > slideWidth / 5 ? valDifference : -positionDiff;
  }

  function dragStart(e) {
    if (isSlide) return;
    isSlide = true;
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = slider.scrollLeft;
    setTimeout(function(){ isSlide = false; }, 700);
  }

  function dragging(e) {
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    slider.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    slider.scrollLeft = prevScrollLeft - positionDiff;
  }

  function dragStop() {
    isDragStart = false;
    slider.classList.remove("dragging");
    if(!isDragging) return;
    isDragging = false;
    autoSlide();
  }

  addEventListener("resize", autoSlide);
  slider.addEventListener("mousedown", dragStart);
  slider.addEventListener("touchstart", dragStart);
  slider.addEventListener("mousemove", dragging);
  slider.addEventListener("touchmove", dragging);
  slider.addEventListener("mouseup", dragStop);
  slider.addEventListener("touchend", dragStop);
  slider.addEventListener("mouseleave", dragStop);
});