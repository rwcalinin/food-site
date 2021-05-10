// 'use strict';

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
      modalTimerId = setTimeout(toggleModalWindow, 15000);

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

   // ! CARDS TEMPLATES

   class MenuCard {
      constructor(src, alt, title, descr, price, parentSelector) {
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.descr = descr;
         this.price = price;
         this.parent = document.querySelector(parentSelector);
         this.transfer = 73;
         this.changeToRUB();
      }

      changeToRUB() {
         this.price = +this.price * this.transfer;
      }
      render() {
         const element = document.createElement('div');
         element.innerHTML = `
         <div class="menu__item">
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
               <div class="menu__item-cost">Цена:</div>
               <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
            </div>
         </div>
         `;
         this.parent.append(element);
      }
   }

   new MenuCard(
      "img/tabs/post.jpg",
      "post",
      'Меню "Постное"',
      'Меню “Постное” - полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
      2.5,
      '.menu .container'
   ).render();

   // class Rectangle {
   //    constructor(height, width) {
   //       this.height = height;
   //       this.width = width;
   //    }
   //    calcArea() {
   //       return this.height * this.width;
   //    }
   // }

   // class ColoredRectangleWithText extends Rectangle {
   //    constructor(height, width, text, bgColor) {
   //       super(height, width); // берёт от родителя итемы объекта. Всегда 1 строчкой
   //                // в скобках НУЖНО указать свойства, которые нужны
   //                // например super(width, height);
   //       this.text = text;
   //       this.bgColor = bgColor;
   //    }

   //    showMyProps() {
   //       console.log(`Текст: ${this.text}, цвет: ${this.bgColor}`);
   //    }


   // }

   // const square = new Rectangle(10, 10),
   //       long = new Rectangle(20, 100),
   //       colored = new ColoredRectangleWithText(30, 40, 'hi', '#000');

   // console.log(square.calcArea());
   // console.log(long.calcArea());

   // colored.showMyProps();
   // console.log(colored.calcArea());

   // // 1) Обычная функция: this = window, но если use strict, то undefined
   // // 2) Контекст у методов объекта - сам объект
   // // 3) this в конструкторах и классах - это новый экземпляр объекта
   // // 4) Ручная привязка this: call, apply, bind

});