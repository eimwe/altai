import '../styles/style.scss';

/**
 * @function showMenu
 * @description shows/hides modal navbar by clicking menu button
 * @param {undefined}
 * @returns {undefined}
 */
const showMenu = () => {
  let menuButton = document.getElementById('menu-toggle'),
      navbarNode = document.querySelector('.navbar');

  menuButton.addEventListener('change', () => {

    navbarNode.classList.add('navbar--opened');

    if(!menuButton.checked) {
      navbarNode.classList.remove('navbar--opened');
    }
  });
}

showMenu();