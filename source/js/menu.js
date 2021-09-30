let iconBurger = document.querySelector('.menu__burger');
let navMain = document.querySelector('.nav');
let formTel = document.querySelector('.form__tel')
let sendForm = document.querySelector('.form');

/* Menu popup start */

iconBurger.classList.remove('no-js');
navMain.classList.remove('no-js');

iconBurger.addEventListener('click', function () {
  iconBurger.classList.toggle('active');
  navMain.classList.toggle('active');
});

// Ibg

function ibg() {
  let ibg = document.querySelectorAll(".ibg");
  for (let i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector('img')) {
      ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
    }
  }

}

ibg();

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

formTel.addEventListener('input', ValidPhone);
sendForm.addEventListener('submit', () => {
  return (ValidPhone());
});
