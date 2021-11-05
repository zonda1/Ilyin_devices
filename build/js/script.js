let tumbler = document.querySelectorAll('.tumbler');
let copyrightElement = document.getElementById('element_2');
let socialBlock = document.querySelector('.contacts__social');
let orderCall = document.querySelector('.page-header__button');
let popup = document.querySelector('.popup');
let callingName = popup.querySelector('[name="popup-name"]');
let buttonClose = document.getElementById('close-link');
let contacts = document.querySelectorAll('.contacts__contacts');

for (i = 0; i < contacts.length; i++) {
  contacts[i].classList.remove('no-js');
}

tumbler.forEach((element) => {
  element.addEventListener('click', () => {
    const parent = element.parentNode;
    if (parent.classList.contains('active')) {
      parent.classList.remove('active');
    } else {
      document.querySelectorAll('.contacts__contacts').forEach((child) => {
        child.classList.remove('active');
        parent.classList.add('active');
      })
    }
  })
});

function copyElement(screen) {
  if (screen < 1024 && socialBlock.children.length === 2) {
    socialBlock.appendChild(copyrightElement.cloneNode(true));
  }
  if (screen >= 1024 && socialBlock.children.length > 2) {
    let copiedElement = socialBlock.lastChild;
    socialBlock.removeChild(copiedElement);
  }
}

window.onresize = function () {
  const windowInnerWidth = window.innerWidth;
  copyElement(windowInnerWidth);
};


//Popup

let closePopup = function () {
  popup.classList.remove('popup-open');
}

orderCall.addEventListener('click', () => {
  popup.classList.add('popup-open');
  callingName.focus();
});

buttonClose.addEventListener('click', closePopup);

window.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    closePopup();
  }
});

window.addEventListener('click', function (e) {
  const target = e.target;
  if (!target.closest('.popup') && !target.closest('.page-header__button')) closePopup();
});

//Mask

let inputTel = document.querySelectorAll('input[data-tel-field="tel"]');
let im = new Inputmask('+7 (999) 999-99-99');
im.mask(inputTel);

// Scroll to the anchor

document.querySelector('.promo__info a[href^="#"]').addEventListener('click', function (evt) {
  evt.preventDefault();
  // iconBurger.classList.remove('active');
  // navMain.classList.remove('active');
  // mainPage.classList.remove('page--modal-open');
  document.querySelector(this.getAttribute('href')).scrollIntoView({
    behavior: 'smooth'
  });
});



//JustValidate

// let validateForms = function (selector, rules, succesModal, yaGoal) {
//   new window.JustValidate(selector, {
//     rules: rules,
//     submitHandler: function (form) {

//     }
//   });
// }

// validateForms('.feedback__form', {
//   tel: {
//     required: true
//   }
// }, '.thanks-popup', 'send goal');
