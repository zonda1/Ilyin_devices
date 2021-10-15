let iconBurger = document.querySelector('.menu__burger');
let navMain = document.querySelector('.nav');
let formTel = document.querySelector('input[name="tel"]');
let sendForm = document.querySelector('.form');
let mainScreen = document.querySelector('.main-screen');
let mainPage = document.querySelector('.page');
// let maskOptions = {
//   mask: '+7(000)000-00-00',
//   lazy: false;
// }
// let mask = new IMask(formTel, maskOptions);

mainScreen.classList.remove('no-js');

window.onload = function () {
  if (iconBurger != null && navMain != null) {
    iconBurger.classList.remove('no-js');
    navMain.classList.remove('no-js');
    iconBurger.addEventListener('click', function () {
      iconBurger.classList.toggle('active');
      navMain.classList.toggle('active');
      mainPage.classList.toggle('page--modal-open');
    });
  } else alert('нет элементов menu__burger или nav');

  if (document.querySelector('.ibg') != null) {
    setIbg();
  } else {
    alert('нет элемента ibg');
  }

  if (formTel != null) {
    formTel.addEventListener('input', validPhone);
  } else {
    alert('нет элемента для ввода номера телефона');
  };

  if (sendForm != null) {
    // sendForm.addEventListener('submit', () => (validPhone()));
    return true;
  } else {
    alert('нет элемента form');
  }
}

// Ibg

function setIbg() {
  let ibg = document.querySelectorAll('.ibg');
  for (let i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector('img')) {
      ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
    }
  }
}


// Validation

function validPhone() {
  let re = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
  let myPhone = formTel.value;
  let valid = re.test(myPhone);

  if (valid) {
    // formTel.setCustomValidity('');
    return valid;
  }
  // formTel.setCustomValidity('Номер телефона введен неправильно!');
  return false;

  // return valid;
}

// Scroll to the anchor

document.querySelectorAll('.nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (evt) {
    evt.preventDefault();
    iconBurger.classList.remove('active');
    navMain.classList.remove('active');
    mainPage.classList.remove('page--modal-open');
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
