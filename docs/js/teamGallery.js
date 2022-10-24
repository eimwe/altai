/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************************!*\
  !*** ./src/scripts/teamGallery.js ***!
  \************************************/
$(document).ready(function(){
  $('.team__mates').slick({
    dots: true,
    mobileFirst: true,
    arrows: false,
    speed: 300,
    autoplay: false,
    autoplaySpeed: 2000,
    centerMode: true,
    slidesToShow: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          centerMode: false,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 900,
        settings: {
          centerMode: true,
          slidesToShow: 3
        }
      },
      {
        breakpoint: 1200,
        settings: {
          dots: false,
          arrows: true,
          centerMode: true,
          slidesToShow: 3
        }
      }
    ]
  });
});
/******/ })()
;
//# sourceMappingURL=teamGallery.js.map