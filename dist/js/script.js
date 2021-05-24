/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {

   // ! CalCalc

   const result = document.querySelector('.calculating__result span');

   let sex, ratio, height, weight, age;

   if (localStorage.getItem('sex')) {
      sex = localStorage.getItem('sex');
   } else {
      sex = 'female';
      localStorage.setItem('sex', 'female');
   }

   if (localStorage.getItem('ratio')) {
      ratio = localStorage.getItem('ratio');
   } else {
      ratio = 1.375;
      localStorage.setItem('ratio', 1.375);
   }


   function initLocalSettings(selector, activeClass) {
      const elements = document.querySelectorAll(selector);
      elements.forEach(elem => {
         elem.classList.remove(activeClass);
         if (elem.getAttribute('id') === localStorage.getItem('sex')) {
            elem.classList.add(activeClass);
         }
         if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            elem.classList.add(activeClass);
         }

      });
   }


   function calcTotal() {
      
      if (!sex || !height || !weight || !age || !ratio) {
         result.textContent = '....';
         return;
      }

      if (sex === 'female') {
         result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
      }
      if (sex === 'male') {
         result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
      }

   }


   function getStaticInfo(selector, activeClass) {
      
      const elements = document.querySelectorAll(selector);

      elements.forEach(elem => {

         elem.addEventListener('click', (event) => {
            if (event.target.getAttribute('data-ratio')) {
               ratio = +event.target.getAttribute('data-ratio');
               localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'));
            } else {
               sex = event.target.getAttribute('id');
               localStorage.setItem('sex', event.target.getAttribute('id'));
            }
            elements.forEach(elem => {
               elem.classList.remove(activeClass);
            });
            event.target.classList.add(activeClass);
            calcTotal();
         });
      });
   }


   function getDynamicInfo(selector) {
      const input = document.querySelector(selector);
      input.addEventListener('input', () => {

         if (isNaN(input.value) || input.value < 0) {
            input.classList.add('invalid-input');
         } else {
            input.classList.remove('invalid-input');
         }

         switch(input.getAttribute('id')) {
            case 'height':
                  height = +input.value;
                  localStorage.setItem('height', +input.value);
                  break;
            case 'weight':
                  weight = +input.value;
                  localStorage.setItem('weight', +input.value);
                  break;
            case 'age':
                  age = +input.value;
                  localStorage.setItem('age', +input.value);
                  break;
         }
         calcTotal();
      });
   }

   initLocalSettings('#gender div', 'calculating__choose-item_active');
   initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

   getStaticInfo('#gender div', 'calculating__choose-item_active');
   getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');
   getDynamicInfo('#age');
   getDynamicInfo('#weight');
   getDynamicInfo('#height');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
           this.src = src;
           this.alt = alt;
           this.title = title;
           this.descr = descr;
           this.price = price;
           this.classes = classes;
           this.parent = document.querySelector(parentSelector);
           this.transfer = 73;
           this.changeToRUB();
        }
  
        changeToRUB() {
           this.price = +this.price * this.transfer;
        }
        render() {
           const element = document.createElement('div');
           if (this.classes.length === 0) {
              this.element = 'menu__item';
              element.classList.add(this.element);
           } else {
              this.classes.forEach(className => element.classList.add(className));
           }
           element.innerHTML = `
              <img src=${this.src} alt=${this.alt}>
              <h3 class="menu__item-subtitle">${this.title}</h3>
              <div class="menu__item-descr">${this.descr}</div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                 <div class="menu__item-cost">Цена:</div>
                 <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
              </div>
           `;
           this.parent.append(element);
        }
     }
  
     new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это больше самых свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        1.5,
        '.menu .container',
        'menu__item'
     ).render();
     new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        3,
        '.menu .container',
        'menu__item'
     ).render();
     new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        2.5,
        '.menu .container',
        'menu__item', 'big'
     ).render();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function forms() {

const forms = document.querySelectorAll('form');

const message = {
   loading: 'icons/spinner.svg',
   success: 'Спасибо! Скоро мы с Вами свяжемся',
   failure: 'Что-то пошло не так'
};

forms.forEach(item => {
   bindPostData(item);
});

function showThanksModal(message) {
   const prevModalDialog = document.querySelector('.modal__dialog');
  
   prevModalDialog.classList.add('hide');
  
   const thanksModal = document.createElement('div');
   thanksModal.classList.add('.modal__dialog');
   thanksModal.innerHTML = `
   <div class="modal__content">
      <div data-close class="modal__close">×</div>
      <div class="modal__title">${message}</div>
   </div>
   `;
  
   document.querySelector('.modal').append(thanksModal);
  
   setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      if (modalWindow.classList.contains('modal--opened')) {
         toggleModalWindow();
      }
   }, 4000);
  }

function bindPostData(form) {
   form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
         `;
      form.append(statusMessage);

      const formData = new FormData(form);

      // const object = {};
      // formData.forEach(function (value, key) {
      //    object[key] = value;
      // });

      // const json = JSON.stringify(object);

      fetch('server.php', {
            method: "POST",
            // headers: {
            //    'Content-type': 'application/json'
            // },
            body: formData
         })
         .then(data => data.text())
         .then(data => {
            !modalWindow.classList.contains('modal--opened') ? toggleModalWindow() : false;
            console.log(data);
            form.reset();
            showThanksModal(message.success);
            statusMessage.remove();
         })
         .catch(() => {
            showThanksModal(message.failure);
         });

   });
}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function modal() {

 const modalWindow = document.querySelector('.modal'),
 // !!! MODAL TIMER FOR APPEARING:
 modalTimerId = setTimeout(toggleModalWindow, 25000);

function checkModalStatus(event) {
 return (
    event.target &&
    event.target.hasAttribute('data-modal') ||
    event.target.hasAttribute('data-close') ||
    event.target === modalWindow
 );
}

function isModalOpened() {
 return modalWindow.classList.contains('modal--opened');
}

function toggleModalWindow() {
 modalWindow.classList.toggle('modal--opened');
 if (modalWindow.classList.contains('modal--opened')) {
    document.body.style.overflow = 'hidden';
 } else {
    document.body.style.overflow = 'visible';
 }
 clearInterval(modalTimerId);
}

function showModalByScroll() {
 if (window.pageYOffset + document.documentElement.clientHeight + 300 >= document.documentElement.scrollHeight) {
    toggleModalWindow();
    window.removeEventListener('scroll', showModalByScroll);
 }
}

// click toggle modal
document.addEventListener('click', (event) => {
 if (checkModalStatus(event, modalWindow)) {
    toggleModalWindow(modalWindow);
 }
});

// scroll toggle modal
window.addEventListener('scroll', showModalByScroll);

// escape close modal
document.addEventListener('keydown', (event) => {
 if (event.code === 'Escape' && isModalOpened(modalWindow)) {
    toggleModalWindow(modalWindow);
 }
});

function showThanksModal(message) {
 const prevModalDialog = document.querySelector('.modal__dialog');

 prevModalDialog.classList.add('hide');

 const thanksModal = document.createElement('div');
 thanksModal.classList.add('.modal__dialog');
 thanksModal.innerHTML = `
 <div class="modal__content">
    <div data-close class="modal__close">×</div>
    <div class="modal__title">${message}</div>
 </div>
 `;

 document.querySelector('.modal').append(thanksModal);

 setTimeout(() => {
    thanksModal.remove();
    prevModalDialog.classList.add('show');
    prevModalDialog.classList.remove('hide');
    if (modalWindow.classList.contains('modal--opened')) {
       toggleModalWindow();
    }
 }, 4000);
}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {

const
    tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

function hideTabContent() {
   tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
   });

   tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
   });
}

function showTabContent(i = 0) {
   tabsContent[i].classList.add('show', 'fade');
   tabsContent[i].classList.remove('hide');
   tabs[i].classList.add('tabheader__item_active');
}

hideTabContent();
showTabContent();

tabsParent.addEventListener('click', (event) => {
   if (event.target && event.target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
         if (event.target == item) {
            hideTabContent();
            showTabContent(i);
         }
      });
   }
});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {

   function getTimeRemaining(endtime) {
      const t = Date.parse(endtime) - Date.parse(new Date()),
         days = Math.floor(t / (1000 * 60 * 60 * 24)),
         hours = Math.floor((t / (1000 * 60 * 60) % 24)),
         minutes = Math.floor((t / 1000 / 60) % 60),
         seconds = Math.floor((t / 1000) % 60);

      return {
         'total': t,
         'days': days,
         'hours': hours,
         'minutes': minutes,
         'seconds': seconds
      };
   }

   function getZero(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }

   function setClock(selector, endtime) {
      const timer = document.querySelector(selector),
         days = timer.querySelector('#days'),
         hours = timer.querySelector('#hours'),
         minutes = timer.querySelector('#minutes'),
         seconds = timer.querySelector('#seconds'),
         timeInterval = setInterval(updateClock, 1000);

      updateClock();

      function updateClock() {
         const t = getTimeRemaining(endtime);

         days.textContent = getZero(t.days);
         hours.textContent = getZero(t.hours);
         minutes.textContent = getZero(t.minutes);
         seconds.textContent = getZero(t.seconds);

         if (t.total <= 0) {
            clearInterval(timeInterval);
         }
      }
   }

   setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");










window.addEventListener('DOMContentLoaded', () => {

   (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)();
   (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.default)();
   (0,_modules_timer__WEBPACK_IMPORTED_MODULE_3__.default)('.timer', '2022-06-11');
   (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__.default)();
   (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__.default)();
   (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__.default)();
   (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__.default)();
   
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map