let iconBurger = document.querySelector('.menu__burger');
let navMain = document.querySelector('.nav');

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
  for (var i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector('img')) {
      ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
    }
  }

}

ibg();
