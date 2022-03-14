import '../styles/style.scss';
import { Gallery, OwlCarousel } from './gallery.js';
import FormValidator from './form.js';
import Accordion from './accordion.js';

/**
 * @function indexGalleries
 * @description enumerates slides and pages with the data-id attribute
 * @param {HTMLCollection} lists - a collection of HTML nodes
 * @returns {undefined}
 */
const indexGalleries = (lists) => {
  lists = Array.from(lists.children);
  lists.forEach((listItem, index) => listItem.setAttribute('data-id', `${index}`));
}

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

/**
 * Variables for a snapshot gallery
 * @member {HTMLElement}
 */
let snapshotGallery = document.querySelector('.photoreport__snapshots'),
    snapshotNext = document.querySelector('.gallery--photoreport .gallery__control--next'),
    snapshotPrev = document.querySelector('.gallery--photoreport .gallery__control--prev');

/**
 * @constant
 * @default
 * @memberof Gallery
 * @instance
 */
const snapshotSlider = new Gallery(snapshotGallery, 9000);

/**
 * Variable containing method to show next snapshotGallery slide
 * this method was saved to be able to refer to it while adding/removing listeners
 * @memberof Gallery
 */
let nextSnapshot = () => snapshotSlider.next();
/**
 * Show next slide
 * @listens click
 * @fires next
 */
snapshotNext.addEventListener('click', nextSnapshot);

/**
 * Variable containing method to show previous snapshotGallery slide
 * this method was saved to be able to refer to it while adding/removing listeners
 * @memberof Gallery
 */
let prevSnapshot = () => snapshotSlider.prev();
/**
 * Show previous slide
 * @listens click
 * @fires prev
 */
snapshotPrev.addEventListener('click', prevSnapshot);

/**
 * @function stopSnapshotGallery
 * @description erases timeout id and removes event listeners in snapshotGallery
 * if MediaQueryListEvent.matches === true
 * @param {Object} event - MediaQueryListEvent
 * @returns {undefined}
 */
const stopSnapshotGallery = (event) => {
  if (event.matches) {
    clearTimeout(snapshotSlider.interval);
    snapshotNext.removeEventListener('click', nextSnapshot);
    snapshotPrev.removeEventListener('click', prevSnapshot);
  }
}

/**
 * Media query to control snapshotGallery
 * @constant
 * @default
 */
const mediumMedia = window.matchMedia('(min-width: 600px)');
/**
 * Listens to the changing of the viewport min-width
 * @listens change
 * @fires stopSnapshotGallery
 * @see {@link stopSnapshotGallery}
 */
mediumMedia.addEventListener('change', stopSnapshotGallery);

/**
 * Variables for a schedule gallery
 * @member {HTMLElement}
 */
let scheduleGallery = document.querySelector('.schedule__list'),
    schedulePages = document.querySelector('.gallery--schedule .gallery__pagination'),
    scheduleCountCurrent = document.querySelector('.gallery--schedule .gallery__current'),
    scheduleCountTotal = document.querySelector('.gallery--schedule .gallery__total'),
    scheduleNext = document.querySelector('.gallery--schedule .gallery__control--next'),
    schedulePrev = document.querySelector('.gallery--schedule .gallery__control--prev');

/**
 * Enumerated schedule gallery slides
 */
indexGalleries(scheduleGallery);

/**
 * Enumerated schedule gallery pages
 */
indexGalleries(schedulePages);

/**
 * @constant
 * @default
 * @memberof OwlCarousel
 * @instance
 */
const scheduleSlider = new OwlCarousel(
        scheduleGallery,
        5000,
        'gallery__slide--active',
        schedulePages,
        'gallery__page--active',
        scheduleCountCurrent);

/**
 * Show next schedule gallery slide
 * @listens click
 * @fires next
 */
scheduleNext.addEventListener('click', () => scheduleSlider.next());
/**
 * Show next schedule gallery slide
 * @listens click
 * @fires prev
 */
schedulePrev.addEventListener('click', () => scheduleSlider.prev());

/**
 * Enables page navigation
 */
scheduleSlider.navigatePage();

/**
 * Inserts total amount of slides
 */
scheduleSlider.countTotal(scheduleCountTotal);
/**
 * Inserts starting slide number
 */
scheduleSlider.countPages(scheduleCountCurrent);

/**
 * @constant
 * @default
 * @member {HTMLElement}
 */
const FORM = document.getElementById('callback-form');
/**
 * @constant
 * @default
 * @type {Array.<string>}
 */
const FIELDS = ['phone-number'];

/**
 * @constant
 * @default
 * @memberof FormValidator
 * @instance
 */
const entryValidator = new FormValidator(FORM, FIELDS, '+7');
/**
 * Initializes form validation
 */
entryValidator.initialize();

document.querySelectorAll('details').forEach((el) => {
  new Accordion(el);
});