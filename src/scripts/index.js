import '../styles/style.scss';
import { Gallery, OwlCarousel } from './gallery.js';
import FormValidator from './form.js';
import Accordion from './accordion.js';

/**
 * @name IIFE
 * @function
 * @description self-executing anonymous function
 * that sets current year in a footer copyright section
 * @param {undefined}
 * @returns {undefined}
 */
(() => {
  let date = new Date(),
      currentYearNode = document.querySelector('.copyright__year');

  if (currentYearNode.textContent.length > 0) currentYearNode.textContent = '';

  currentYearNode.appendChild(document.createTextNode(date.getFullYear()));
})();

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
    snapshots = document.querySelectorAll('.photoreport__snapshot'),
    snapshotNext = document.querySelector('.gallery--photoreport .gallery__control--next'),
    snapshotPrev = document.querySelector('.gallery--photoreport .gallery__control--prev');

/**
 * @constant
 * @default
 * @memberof Gallery
 * @instance
 */
const snapshotSlider = new Gallery(snapshotGallery, false);

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
        false,
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
 * Show previous schedule gallery slide
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

/**
 * Initiates an accordion animation in FAQ section
 */
document.querySelectorAll('details').forEach((el) => {
  new Accordion(el);
});

/**
 * Variables for a lightBox photo gallery
 * @member {HTMLElement}
 */
 let lightboxGallery = document.querySelector('.gallery--lightbox .gallery__fullsized'),
     lightboxThumbs = document.querySelector('.gallery--lightbox .gallery__thumbs'),
     lightboxCountCurrent = document.querySelector('.gallery--lightbox .gallery__current'),
     lightboxCountTotal = document.querySelector('.gallery--lightbox .gallery__total'),
     lightboxNext = document.querySelector('.gallery--lightbox .gallery__control--next'),
     lightboxPrev = document.querySelector('.gallery--lightbox .gallery__control--prev'),
     lightboxCloseButton = document.querySelector('.modal--lightbox .btn--dismiss');

/**
 * Enumerated lightBox photo gallery slides
 */
indexGalleries(lightboxGallery);

/**
 * Enumerated lightBox photo gallery thumbnails
 */
indexGalleries(lightboxThumbs);

/**
 * @constant
 * @default
 * @memberof OwlCarousel
 * @instance
 */
const lightboxSlider = new OwlCarousel(
     lightboxGallery,
     false,
     'gallery__slide--active',
     lightboxThumbs,
     'gallery__thumb--active',
     lightboxCountCurrent,
     true);

/**
 * Show next lightBox photo gallery slide
 * @listens click
 * @fires next
 */
lightboxNext.addEventListener('click', () => lightboxSlider.next());
/**
 * Show previous lightBox photo gallery slide
 * @listens click
 * @fires prev
 */
lightboxPrev.addEventListener('click', () => lightboxSlider.prev());

/**
 * Enables thumbnail navigation
 */
lightboxSlider.navigatePage();

/**
 * Inserts total amount of lightBox photo gallery slides
 */
lightboxSlider.countTotal(lightboxCountTotal);
/**
 * Inserts starting lightBox photo gallery slide number
 */
lightboxSlider.countPages(lightboxCountCurrent);

/**
 * Creates initial caption for lightBox photo gallery
 */
lightboxSlider.createCaption(lightboxThumbs.children[0].getAttribute('alt'), lightboxThumbs);

/**
 * Polyfill for HTML <dialog> element
 * @constant
 * @default
 */
const lightboxDialogPolyfill = require('./dialog-polyfill');

/**
 * @constant
 * @default
 * @member {HTMLElement}
 */
const lightboxModal = document.querySelector('.modal--lightbox');
 
/**
 * Register lightbox modal node with polyfill
 * @constant
 * @default
 * @memberof dialogPolyfill
 * @instance
 */
lightboxDialogPolyfill.registerDialog(lightboxModal);
 
/**
 * Close modal on click at close button
 * @listens click
 * @fires lightboxModal.close
 */
lightboxCloseButton.addEventListener('click', () => lightboxModal.close());

/**
 * Distribute event listeners across all tiles in photoreport section
 */
snapshots.forEach((snapshot, index) => {
  snapshot.addEventListener('click', (event) => {
    lightboxModal.showModal();
    lightboxSlider.activeIndex = index;
    lightboxSlider.showSlide();
    lightboxSlider.countPages(lightboxCountCurrent);
    lightboxSlider.toggleActive(lightboxSlider.pages, lightboxSlider.activePageClass);
    lightboxSlider.createCaption(event.target.getAttribute('alt'), lightboxThumbs);
  });
});