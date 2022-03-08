/**
 * @namespace Gallery
 * Class representing a gallery.
 */
class Gallery {
  /**
   * Create a gallery.
   * @param {HTMLElement} gallery - Gallery node
   * @param {Number} delay - setting a slideshow interval in milliseconds
   * @param {Number} [galleryWidth] - gallery container width (optional)
   */
  constructor(gallery, delay, galleryWidth) {
    this.gallery = gallery;
    this.delay = delay;
    this.activeIndex = 0;
    this.numItems = this.gallery.children.length;
    this.interval = setInterval(() => this.next(), delay);
    if(!galleryWidth) return;
    this.galleryWidth = galleryWidth;
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
    let innerSpace;

    if(!this.galleryWidth) {
      innerSpace = this.gallery.offsetWidth;
    } else {
      //magic numbers to calculate gallery spin step:
      innerSpace = (this.gallery.offsetWidth - this.galleryWidth) * 3;
      if (innerSpace < 0) {
        innerSpace = this.galleryWidth - this.gallery.offsetWidth;
      }
    }

    let coord = parseInt(`${this.activeIndex}` * innerSpace);
    
    this.gallery.scrollTo({
      top: 0,
      left: coord,
      behavior: 'smooth'
    });

    return this.activeIndex;
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
   * @param {HTMLElement} [counterCurrent] - current count number node (optional)
   */
  constructor(gallery, delay, galleryWidth, activeSlideClass, pages, activePageClass, counterCurrent) {
    super(gallery, delay, galleryWidth);
    this.activeSlideClass = activeSlideClass;
    this.slides = Array.from(this.gallery.children);
    this.pages = Array.from(pages.children);
    this.activePageClass = activePageClass;
    if(!counterCurrent) return;
    this.counterCurrent = counterCurrent;
  }

  /**
   * @method prev
   * @description decreases activeIndex prop and toggles between pages and slides,
   * refreshes current slide number in the counter
   * @see {@link toggleActive}
   * @param {undefined}
   * @returns {undefined}
   */
  prev() {
    super.prev();
    this.toggleActive(this.slides, this.activeSlideClass);
    this.toggleActive(this.pages, this.activePageClass);
    if(!this.counterCurrent) return;
    this.countPages(this.counterCurrent);
  }

  /**
   * @method next
   * @description increases activeIndex prop and toggles between pages and slides,
   * refreshes current slide number in the counter
   * @see {@link toggleActive}
   * @param {undefined}
   * @returns {undefined}
   */
  next() {
    super.next();
    this.toggleActive(this.slides, this.activeSlideClass);
    this.toggleActive(this.pages, this.activePageClass);
    if(!this.counterCurrent) return;
    this.countPages(this.counterCurrent);
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

  /**
   * @method navigatePage
   * @description shows slide according to the clicked page,
   * refreshes current slide number in the counter
   * @param {undefined}
   * @returns {undefined}
   */
   navigatePage() {
    this.pages.forEach(page => {
      page.addEventListener('click', event => {
        this.activeIndex = event.target.dataset.id;

        super.showSlide();
        this.toggleActive(this.slides, this.activeSlideClass);
        this.toggleActive(this.pages, this.activePageClass);
        if(!this.counterCurrent) return;
        this.countPages(this.counterCurrent);
      });
    });
  }

  /**
   * @method countPages
   * @description calculates current slide number
   * @param {HTMLElement} currentSlideNode - current count number node
   * @returns {undefined}
   */
  countPages(currentSlideNode) {
    currentSlideNode.textContent = parseInt(super.showSlide()) + 1;
  }

  /**
   * @method countTotal
   * @description calculates and inserts the total number of slides
   * @param {HTMLElement} totalSlideNode - total slide number node
   * @returns {undefined}
   */
  countTotal(totalSlideNode) {
    totalSlideNode.textContent = this.numItems;
  }
}

export {Gallery, OwlCarousel};