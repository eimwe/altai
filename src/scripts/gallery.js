/**
 * @namespace Gallery
 * Class representing a gallery.
 */
class Gallery {
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

/**
 * @namespace OwlCarousel
 * Class extending Gallery.
 * @memberof Gallery
 * @instance
 */
class OwlCarousel extends Gallery {
  /**
   * Create an instance of Gallery.
   * @param {HTMLElement} gallery - Gallery node
   * @param {Number} delay - setting a slideshow interval in milliseconds
   * @param {String} activeSlideClass - the active slide class name
   * @param {HTMLCollection} pages - a collection of HTML pagination nodes
   * @param {String} activePageClass - the active page class name
   */
  constructor(gallery, delay, activeSlideClass, pages, activePageClass) {
    super(gallery, delay);
    this.activeSlideClass = activeSlideClass;
    this.slides = Array.from(this.gallery.children);
    this.pages = Array.from(pages.children);
    this.activePageClass = activePageClass;
  }

  /**
   * @method prev
   * @description decreases activeIndex prop and toggles between pages and slides
   * @see {@link toggleActive}
   * @param {undefined}
   * @returns {undefined}
   */
  prev() {
    super.prev();
    this.toggleActive(this.slides, this.activeSlideClass);
    this.toggleActive(this.pages, this.activePageClass);
  }

  /**
   * @method next
   * @description increases activeIndex prop and toggles between pages and slides
   * @see {@link toggleActive}
   * @param {undefined}
   * @returns {undefined}
   */
  next() {
    super.next();
    this.toggleActive(this.slides, this.activeSlideClass);
    this.toggleActive(this.pages, this.activePageClass);
  }

  /**
   * @method toggleActive
   * @description switches active class for slides and corresponding pages
   * @param {Array} lists 
   * @param {String} activeClass 
   * @returns {undefined}
   */
  toggleActive(lists, activeClass) {
    lists.forEach(listItem => {
      listItem.classList.remove(activeClass);

      if(listItem.dataset.id == this.activeIndex) {
        listItem.classList.toggle(activeClass);
      }
    });
  }
}

export {Gallery, OwlCarousel};