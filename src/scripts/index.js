import '../styles/style.scss';
import { Gallery, OwlCarousel } from './gallery.js';

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
 * Show next slide
 * @listens click
 * @fires next
 */
snapshotNext.addEventListener('click', () => snapshotSlider.next());
/**
 * Show previous slide
 * @listens click
 * @fires prev
 */
snapshotPrev.addEventListener('click', () => snapshotSlider.prev());

/**
 * Variables for a schedule gallery
 * @member {HTMLElement}
 */
let scheduleGallery = document.querySelector('.schedule__list'),
    schedulePages = document.querySelector('.gallery--schedule .gallery__pagination'),
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
        'gallery__page--active');

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