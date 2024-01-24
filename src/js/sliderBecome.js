// Custom slider 2 + swiper
document.addEventListener('DOMContentLoaded', function () {
  
  const slider2 = document.querySelector('.become-slider');
  const dotsContainer2 = document.querySelector('.slider-2-dots');
  const slides2 = document.querySelectorAll('.become-slider__item');
  const totalSlides2 = slides2.length;
  let currentSlide2 = 0;
  let startX2 = 0;
  let isSwiping2 = false;

  for (let i = 0; i < totalSlides2; i++) {
    const dot2 = document.createElement('div');
    dot2.classList.add('dot-2');
    dotsContainer2.appendChild(dot2);
    dot2.addEventListener('click', () => showSlide2(i));
  }

  showSlide2(currentSlide2);

  slider2.addEventListener('touchstart', touchStart2);
  slider2.addEventListener('touchmove', touchMove2);
  slider2.addEventListener('touchend', touchEnd2);

  function touchStart2(e) {
    startX2 = e.touches[0].clientX;
    isSwiping2 = true;
  }

  function touchMove2(e) {
    if (!isSwiping2) return;

    const currentX2 = e.touches[0].clientX;
    const deltaX2 = currentX2 - startX2;

    if (Math.abs(deltaX2) > 10) {
      e.preventDefault();
    }
  }

  function touchEnd2(e) {
    if (!isSwiping2) return;

    const endX2 = e.changedTouches[0].clientX;
    const deltaX2 = endX2 - startX2;

    if (deltaX2 > 50) {
      // Swipe right
      showSlide2(currentSlide2 - 1);
    } else if (deltaX2 < -50) {
      // Swipe left
      showSlide2(currentSlide2 + 1);
    }

    isSwiping2 = false;
  }

  function showSlide2(index) {
    if (index < 0) {
      index = totalSlides2 - 1;
    } else if (index >= totalSlides2) {
      index = 0;
    }

    const slideWidth2 = slides2[0].offsetWidth;
    slider2.style.transform = `translateX(-${index * slideWidth2}px)`;

    const dots2 = document.querySelectorAll('.dot-2');
    dots2.forEach((dot2, i) => {
      dot2.classList.toggle('active', i === index);
    });

    currentSlide2 = index;
  }
});