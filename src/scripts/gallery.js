/**
 * @namespace Gallery
 * Class representing a gallery.
 */
export default class Gallery {
  /**
   * Create a gallery.
   * @param {HTMLElement} gallery - Gallery node
   * @param {Number} delay - setting a slideshow interval in milliseconds
   */
  constructor(gallery, delay) {
    this.gallery = gallery;
    this.delay = delay;
    this.activeIndex = 0;
    this.numItems = this.gallery.children.length;
    this.interval = setInterval(() => this.next(), delay);
  }
  
  /**
   * @method prev
   * @description decreases activeIndex prop and initiates showSlide method
   * @see {@link showSlide}
   * @param {undefined}
   * @returns {undefined}
   */
  prev() {
    this.activeIndex--;
    if(this.activeIndex < 0)
      this.activeIndex = this.numItems - 1;
    this.showSlide();
  }
  
  /**
   * @method next
   * @description increases activeIndex prop and initiates showSlide method
   * @see {@link showSlide}
   * @param {undefined}
   * @returns {undefined}
   */
  next() {
    this.activeIndex++;
    if(this.activeIndex >= this.numItems)
      this.activeIndex = 0;
    this.showSlide();
  }
  
  /**
   * @method showSlide
   * @description calculates coordinates 
   * (current activeIndex * slide container's width)
   * and shifts slides accordingly
   * @param {undefined}
   * @returns {undefined}
   */
  showSlide() {
    let innerSpace = this.gallery.offsetWidth,
        coord = parseInt(`${this.activeIndex}` * innerSpace);
    
    this.gallery.scrollTo({
      top: 0,
      left: coord,
      behavior: 'smooth'
    });
  }
}