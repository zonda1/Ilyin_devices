let iconBurger = document.querySelector('.menu__burger');
let navMain = document.querySelector('.nav');

/* Menu popup start */

iconBurger.classList.remove('no-js');
navMain.classList.remove('no-js');

iconBurger.addEventListener('click', function () {
  // if (navMain.classList.contains('closed')) {
  //   navMain.classList.remove('closed');
  //   navMain.classList.add('active');
  // } else {
  //   navMain.classList.add('closed');
  //   navMain.classList.remove('active');
  // }
  iconBurger.classList.toggle('active');
  navMain.classList.toggle('active');

});
