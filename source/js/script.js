let tumbler = document.querySelectorAll('.tumbler');
let copyrightElement = document.getElementById('element_2');
let socialBlock = document.querySelector('.contacts__social');
let orderCall = document.querySelector('.page-header__button');
let popup = document.querySelector('.popup');
let callingName = popup.querySelector('[name="popup-name"]');
let buttonClose = document.getElementById('close-link');
let contacts = document.querySelectorAll('.contacts__contacts');

let feedbackForm = document.querySelector('.feedback__form');
let popupForm = document.querySelector('.popup__form');

for (i = 0; i < contacts.length; i++) {
  contacts[i].classList.remove('no-js');
}

tumbler.forEach((element) => {
  element.addEventListener('click', () => {
    let parent = element.parentNode;
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
  let windowInnerWidth = window.innerWidth;
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
  let target = e.target;
  if (!target.closest('.popup') && !target.closest('.page-header__button')) closePopup();
});

//Mask

let inputTels = document.querySelectorAll('input[data-validate-field="tel"]');
let im = new Inputmask('+7 (999) 999-99-99');
im.mask(inputTels);

// Scroll to the anchor

document.querySelector('.promo__info a[href^="#"]').addEventListener('click', function (evt) {
  evt.preventDefault();
  document.querySelector(this.getAttribute('href')).scrollIntoView({
    behavior: 'smooth'
  });
});



// Validation

//JustValidate popup

new window.JustValidate('.popup__form', {
  rules: {
    tel: {
      required: true,
    },
  },
  colorWrong: 'red',
  focusWrongField: true,

  submitHandler: function (forms, values, ajax) {
    ajax({
      url: 'https://echo.htmlacademy.ru/',
      method: 'POST',
      data: values,
      async: true,
      callback: function (response) {
        popupForm.reset();
        alert('AJAX submit successful! \nResponse from server:' + response)
      },
      error: function (response) {
        alert('AJAX submit error! \nResponse from server:' + response)
      }
    });
  },

  invalidFormCallback: function (errors) {
    console.log(errors);
  },
});

//JustValidate feedback

new window.JustValidate('.feedback__form', {
  rules: {
    tel: {
      required: true,
    },
  },
  colorWrong: 'red',
  focusWrongField: true,

  submitHandler: function (forms, values, ajax) {
    ajax({
      url: 'https://echo.htmlacademy.ru/',
      method: 'POST',
      data: values,
      async: true,
      callback: function (response) {
        feedbackForm.reset();
        alert('AJAX submit successful! \nResponse from server:' + response)
      },
      error: function (response) {
        alert('AJAX submit error! \nResponse from server:' + response)
      }
    });
  },

  invalidFormCallback: function (errors) {
    console.log(errors);
  },
});
