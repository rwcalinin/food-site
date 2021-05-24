function slider() {
    const totalCount = document.querySelector('#total'),
    currentCount = document.querySelector('#current'),
    prevButton = document.querySelector('.offer__slider-prev'),
    nextButton = document.querySelector('.offer__slider-next'),
    slides = document.querySelectorAll('.offer__slide'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(slidesWrapper).width;
let   offset = 0,
    currentSlide = 0;

    function calcPasteCurrentCount() {
       currentSlide = (offset / +width.slice(0, width.length - 2)) + 1;
       if (currentSlide < 10) {
          currentCount.textContent = `0${currentSlide}`;
       } else {
          currentCount.textContent = currentSlide;
       }
    }
 
    function calcPasteTotalCount() {
       if (slides.length < 10) {
          totalCount.textContent = `0${slides.length}`;
       } else {
          totalCount.textContent = slides.length;
       }
    }

    function changeDotsOpacity() {
       dotsArr.forEach(dot => dot.style.opacity = '.5');
       dotsArr[currentSlide - 1].style.opacity = 1;
    }

// ? init block ------------------------

calcPasteCurrentCount();
calcPasteTotalCount();
slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';
slidesWrapper.style.overflow = 'hidden';

slides.forEach(slide => {
 slide.style.width = width;
});

// ? ------------------------------------

nextButton.addEventListener('click', () => {
 if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
    offset = 0;
 } else {
    offset += +width.slice(0, width.length - 2);
 }
 slidesField.style.transform = `translateX(-${offset}px)`;
 calcPasteCurrentCount();
 changeDotsOpacity();
});

prevButton.addEventListener('click', () => {
 if (offset == 0) {
    offset = +width.slice(0, width.length - 2) * (slides.length - 1);
 } else {
    offset -= +width.slice(0, width.length - 2);
 }
 slidesField.style.transform = `translateX(-${offset}px)`;
 calcPasteCurrentCount();
 changeDotsOpacity();
});

// ! slides dotted

const slider = document.querySelector('.offer__slider'),
    dots = document.createElement('ol'),
    dotsArr = [];

slider.style.position = 'relative';
dots.classList.add('dot-indicators');
slider.append(dots);

for (let i = 0; i < slides.length; i++) {
 const dot = document.createElement('li');
 dot.setAttribute('data-slide-to', i + 1);
 dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
 `;
 if (i == 0) {
    dot.style.opacity = 1;
 }
 dots.append(dot);
 dotsArr.push(dot);
}

dotsArr.forEach(dot => {
 dot.addEventListener('click', (e) => {
    const slideTo = e.target.getAttribute('data-slide-to');
    currentSlide = slideTo;
    offset = +width.slice(0, width.length - 2) * (slideTo - 1);
    slidesField.style.transform = `translateX(-${offset}px)`;
    changeDotsOpacity();
    calcPasteCurrentCount();
 });
});
}

module.exports = slider;