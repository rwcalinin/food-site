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

export default modal;