let iconBurger = document.querySelector('.menu__burger');
let navMain = document.querySelector('.nav');

/* Menu popup start */

iconBurger.classList.remove('no-js');
navMain.classList.remove('no-js');

iconBurger.addEventListener('click', function () {
  iconBurger.classList.toggle('active');
  navMain.classList.toggle('active');
});
