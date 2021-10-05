let iconBurger;
let navMain;
let formTel;
let sendForm;

window.onload = function () {
  if (document.querySelector('.menu__burger') != null) {
    iconBurger = document.querySelector('.menu__burger');
    iconBurger.classList.remove('no-js')
    iconBurger.addEventListener('click', function () {
      iconBurger.classList.toggle('active');
    });
  } else alert('нет элемента menu__burger');

  if (document.querySelector('.nav') != null) {
    navMain = document.querySelector('.nav');
    navMain.classList.remove('no-js')
    iconBurger.addEventListener('click', function () {
      navMain.classList.toggle('active');
    });
  } else alert('нет элемента nav');

  if (document.querySelector('.ibg') != null) {
    ibg();
  } else {
    alert('нет элемента ibg');
  }

  if (document.querySelector('input[name="tel"]') != null) {
    formTel = document.querySelector('input[name="tel"]')
    formTel.addEventListener('input', ValidPhone);
  } else {
    alert('нет элемента для ввода номера телефона');
  };

  if (document.querySelector('.form') != null) {
    sendForm = document.querySelector('.form');
    sendForm.addEventListener('submit', () => {
      return (ValidPhone());
    });
  } else {
    alert('нет элемента form');
  }
}

// Ibg

function ibg() {
  let ibg = document.querySelectorAll('.ibg');
  for (let i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector('img')) {
      ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
    }
  }
}


// Validation

function ValidPhone() {

  let re = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
  let myPhone = formTel.value;
  let valid = re.test(myPhone);
  if (valid) {
    formTel.setCustomValidity('');
  } else {
    formTel.setCustomValidity('Номер телефона введен неправильно!');
  }
  formTel.reportValidity();
  return valid;
}

// Scroll to the anchor

document.querySelectorAll('.nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (evt) {
    evt.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
