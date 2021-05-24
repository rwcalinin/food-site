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

module.exports = forms;