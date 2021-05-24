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

module.exports = cards;