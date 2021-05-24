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

export default calc;