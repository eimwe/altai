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

export {confirmModal, lightboxModal};