// Custom slider 1 + swaiper
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.hero-slider');
    const dotsContainer = document.querySelector('.slider-dots');
    const slides = document.querySelectorAll('.hero-slider__item');
    const totalSlides = slides.length;
    let currentSlide = 0;
    let startX = 0;
    let isSwiping = false;
  
    // Create dots
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dotsContainer.appendChild(dot);
      dot.addEventListener('click', () => showSlide(i));
    }
  
    // Show initial slide
    showSlide(currentSlide);
  
    // Event listeners for swipe
    slider.addEventListener('touchstart', touchStart);
    slider.addEventListener('touchmove', touchMove);
    slider.addEventListener('touchend', touchEnd);
  
    function touchStart(e) {
      startX = e.touches[0].clientX;
      isSwiping = true;
    }
  
    function touchMove(e) {
      if (!isSwiping) return;
  
      const currentX = e.touches[0].clientX;
      const deltaX = currentX - startX;
  
      // Prevent vertical scrolling
      if (Math.abs(deltaX) > 10) {
        e.preventDefault();
      }
    }
  
    function touchEnd(e) {
      if (!isSwiping) return;
  
      const endX = e.changedTouches[0].clientX;
      const deltaX = endX - startX;
  
      if (deltaX > 50) {
        // Swipe right
        showSlide(currentSlide - 1);
      } else if (deltaX < -50) {
        // Swipe left
        showSlide(currentSlide + 1);
      }
  
      isSwiping = false;
    }
  
    function showSlide(index) {
      if (index < 0) {
        index = totalSlides - 1;
      } else if (index >= totalSlides) {
        index = 0;
      }
  
      const slideWidth = slides[0].offsetWidth;
      slider.style.transform = `translateX(-${index * slideWidth}px)`;
  
      // Update active dot
      const dots = document.querySelectorAll('.dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
  
      currentSlide = index;
    }
  });