/**
 * Polyfill for HTML <dialog> element
 * @constant
 * @default
 */
 const dialogPolyfill = require('./dialog-polyfill');

 /**
  * @constant
  * @default
  * @member {HTMLElement}
  */
 const confirmModal = document.querySelector('.modal--confirm');
 
 /**
  * Register confirm modal node with dialog polyfill
  * @constant
  * @default
  * @memberof dialogPolyfill
  * @instance
  */
 dialogPolyfill.registerDialog(confirmModal);

 /**
 * Variable containing array of modal buttons
 * @type {Array.<HTMLElement>}
 */
let cancelButtons = document.querySelectorAll('.modal--confirm .btn');

/**
 * Close modal on click at any button from the array
 * @listens click
 * @fires confirmModal.close
 * @see {@link confirmModal.close}
 */
cancelButtons.forEach(button => {
  button.addEventListener('click', () => confirmModal.close());
});


/**
 * @constant
 * @default
 * @member {HTMLElement}
 */
const lightboxModal = document.querySelector('.modal--lightbox');
  
/**
 * Register lightbox modal node with dialog polyfill
 * @constant
 * @default
 * @memberof dialogPolyfill
 * @instance
 */
dialogPolyfill.registerDialog(lightboxModal);
 
/**
 * Variable for a lightBox modal close button
 * @member {HTMLElement}
 */
let lightboxCloseButton = document.querySelector('.modal--lightbox .btn--dismiss');

/**
 * Close modal on click at close button
 * @listens click
 * @fires lightboxModal.close
 */
lightboxCloseButton.addEventListener('click', () => lightboxModal.close());

/**
 * @constant
 * @default
 * @member {HTMLElement}
 */
 const menuModal = document.querySelector('.modal--menu');

 /**
 * Register menu modal node with dialog polyfill
 * @constant
 * @default
 * @memberof dialogPolyfill
 * @instance
 */
dialogPolyfill.registerDialog(menuModal);

/**
 * Variable for a menu modal close button
 * @member {HTMLElement}
 */
 let menuCloseButton = document.querySelector('.modal--menu .btn--dismiss');

 /**
 * Variable for a menu modal items
 * @member {HTMLElement}
 */
 let menuItems = document.querySelectorAll('.modal--menu .navbar__item--modal');

 /**
  * Close modal on click at close button
  * @listens click
  * @fires menuModal.close
  */
  menuCloseButton.addEventListener('click', () => menuModal.close());

  /**
  * Close modal on click at menu item
  * @listens click
  * @fires menuModal.close
  */
  menuItems.forEach(item => item.addEventListener('click', () => menuModal.close()));

export {confirmModal, lightboxModal, menuModal};