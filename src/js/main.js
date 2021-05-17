'use strict';

document.addEventListener('DOMContentLoaded', () => {

   // ! TABS

   const tabs = document.querySelectorAll('.tabheader__item'),
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

   // ! TIMER

   const deadline = '2022-05-11';

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

   setClock('.timer', deadline);

   // ! MODAL

   const modalWindow = document.querySelector('.modal'),
      // MODAL TIMER FOR APPEARING
      modalTimerId = setTimeout(toggleModalWindow, 255000);

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

   // ! CARDS TEMPLATES

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

   // obj.property -- доступ к свойству объекта
   // obj["property with tab"] -- доступ к свойству с пробелами
   // obj[varWithKey] -- получить значение свойства из внешней переменной

   // delete obj.property -- удаление свойства
   // "key" in obj -- проверка существования
   // for (let key in obj) -- перебор каждого ключа и действия с ним внутри телефона


   // ! Forms

   const forms = document.querySelectorAll('form');

   const message = {
      loading: 'icons/spinner.svg',
      success: 'Спасибо! Скоро мы с Вами свяжемся',
      failure: 'Что-то пошло не так'
   };

   forms.forEach(item => {
      bindPostData(item);
   });

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

   // 1. Получить все элементы, с которыми будем работать
   // 2. Параметр, определяющий текущий слайд (индекс)
   // 3. Функция, показывающая слайды (две функции внутри: показ и скрытие других)
   // 3.1. В условиях функции сделать так, чтобы можно было с 1 на 4 перейти и с 4 на 1, грубо говоря - не утыкаться в стену
   // 4. Обработчики событий на стрелочки (нажимаем - вызывается функция, изменяется индекс)
   // 5. При создании страницы определить кол-во слайдов, поместить количество в вёрстку.
   // 5.1. Отображаем 01 слайдер и вписываем в вёрстку номер
   // 5.2. Также обязательно, если число не двузначное, добавлять в начало ноль

   // ! slider offer

   const offerSlider = document.querySelector('.offer__slider'),
         totalCount = offerSlider.querySelector('#total'),
         prevButton = offerSlider.querySelector('.offer__slider-prev'),
         nextButton = offerSlider.querySelector('.offer__slider-next'),
         totalSliders = offerSlider.querySelectorAll('.offer__slide'),
         totalSlidersCount = totalSliders.length;

   let currentCount = offerSlider.querySelector('#current'),
       slideCounter = 1;

   // sliders init
   
   slideInit();

   function slideInit() {
      totalSliders.forEach((item) => {
         item.classList.toggle('hide');
      })
      totalSliders[0].classList.toggle('hide');
      slideCountAndPaste();
   }

   function toggleSlide(slideNumber) {
      slideNumber.toggle('hide');
   }

   function slideCountAndPaste() {
      currentCount.textContent = slideCounter;
      if (currentCount.textContent.length === 1) {
         currentCount.textContent = `0${slideCounter}`;
      }
      totalCount.textContent = totalSliders.length;
      if (totalCount.textContent.length === 1) {
         totalCount.textContent = `0${totalSliders.length}`;
      }
   }

   nextButton.addEventListener('click', (event) => {
      
   });

   console.log(currentCount);

   console.log(totalSlidersCount);
   console.log(totalSliders);

});