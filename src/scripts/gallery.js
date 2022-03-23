/**
 * @namespace Gallery
 * Class representing a gallery.
 */
class Gallery {
  /**
   * Create a gallery.
   * @param {HTMLElement} gallery - Gallery node
   * @param {Number} delay - setting a slideshow interval in milliseconds
   * @param {Number|undefined} [galleryWidth] - gallery container width (optional)
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
   * @param {Number|undefined} [galleryWidth] - gallery container width (optional)
   * @param {String} activeSlideClass - the active slide class name
   * @param {HTMLCollection} pages - a collection of HTML pagination nodes
   * @param {String} activePageClass - the active page class name
   * @param {HTMLElement} [counterCurrent] - current count number node (optional)
   * @param {Boolean|undefined} [lightBox] - lightBox gallery indicator (optional)
   */
  constructor(gallery, delay, galleryWidth, activeSlideClass, pages, activePageClass, counterCurrent, lightBox) {
    super(gallery, delay, galleryWidth);
    this.activeSlideClass = activeSlideClass;
    this.slides = Array.from(this.gallery.children);
    this.pages = Array.from(pages.children);
    this.activePageClass = activePageClass;
    if(!counterCurrent) return;
    this.counterCurrent = counterCurrent;
    if(!lightBox) return;
    this.lightBox = lightBox;
  }

  /**
   * @method prev
   * @description decreases activeIndex prop and toggles between pages and slides,
   * refreshes current slide number in the counter (optional)
   * creates caption for lightBox photo gallery (optional)
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
    if(!this.lightBox) return;
    this.slides.forEach(slide => {
      if(slide.classList.contains(this.activeSlideClass)) {
        this.createCaption(slide.getAttribute('alt'), this.pages);
      }
    });
  }

  /**
   * @method next
   * @description increases activeIndex prop and toggles between pages and slides,
   * refreshes current slide number in the counter (optional)
   * creates caption for lightBox photo gallery (optional)
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
    if(!this.lightBox) return;
    this.slides.forEach(slide => {
      if(slide.classList.contains(this.activeSlideClass)) {
        this.createCaption(slide.getAttribute('alt'), this.pages);
      }
    });
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
   * toggles between active pages and slides,
   * refreshes current slide number in the counter (optional)
   * creates caption for lightBox photo gallery (optional)
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
        if(!this.lightBox) return;
        this.createCaption(event.target.getAttribute('alt'), this.pages);
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

  /**
   * @method createCaption
   * @description creates caption text for lightBox photo gallery
   * @param {String} captionText - string taken from an image 'alt' attribute
   * @param {HTMLElement} galleryContainer - container to append caption text to
   */
  createCaption(captionText, galleryContainer) {
    if(!captionText || captionText.length < 2) captionText = 'Фото ' + parseInt(this.activeIndex + 1);
    
    let captionNode = document.querySelector('.gallery__caption');

    if(!captionNode) {
      captionNode = document.createElement('FIGCAPTION');
      captionNode.appendChild(document.createTextNode(captionText));
      captionNode.classList.add('gallery__caption');
      captionNode.setAttribute('aria-live', 'polite');
      galleryContainer.insertBefore(captionNode, galleryContainer.firstChild);
    }

    captionNode.textContent = captionText;
  }
}

export {Gallery, OwlCarousel};