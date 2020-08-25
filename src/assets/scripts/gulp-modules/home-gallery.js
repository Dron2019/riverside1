 /**Gallery distortion slider */

 let sections = $('section');
 window.scrollsCounter = new Number(0);
 window.currentSection = '.main-screen';
 /**Докрутка скролла */
 function debounce(f, t) {
     return function(args) {
         let previousCall = this.lastCall;
         this.lastCall = Date.now();
         if (previousCall && ((this.lastCall  -  previousCall) <= t)) {
             clearTimeout(this.lastCallTimer);
         }
         this.lastCallTimer = setTimeout(() => f(args), t);
     }
 }

 let alignSectionToScreen = (args) => {
         console.log(window.currentSection);
         document.querySelector(`.${window.currentSection}`).scrollIntoView({ behavior: "smooth" });
     }
     // debounce: call the logger when two seconds have elapsed since the last call
 let debouncedLogger = debounce(alignSectionToScreen, 2000);
 //  debouncedLogger();
 //  window.addEventListener('scroll', () => {
 //      debouncedLogger();
 //  });
 /**Докрутка скролла END*/
 $(window).on('scroll', function() {
     var cur_pos = $(this).scrollTop();
     sections.each(function() {
         var top = $(this).offset().top,
             bottom = top + $(this).outerHeight();
         if (cur_pos >= top && cur_pos <= bottom) {
             let currentMenuPoint = $(this)[0].classList[0];
             window.currentSection = currentMenuPoint;
             console.log(currentMenuPoint);
             switch (currentMenuPoint) {
                 case 'reasons-to-choose':
                     gallerySliderLoader();
                     break;
                 case 'about':
                     videosLoader();
                     break;
                 default:
                     break;
             }
         }
     });
 });



 let videosLoader = () => {

     if (window.videoLoadingStatus === true) {
         videosLoader = () => {};
         return;
     }
     document.querySelectorAll('video').forEach(video => {
         //  video.play();
     });
     window.videoLoadingStatus = true;
 }
 let gallerySliderLoader = () => {
     if (window.galleryLoadingStatus === true) {
         gallerySliderLoader = () => {};
         return;
     }
     document.querySelectorAll('.gallery .slide-item__image').forEach(galleryImage => {
         //  console.log(galleryImage.dataset.mob_src);
         if (galleryImage.dataset.mob_src !== undefined && window.screen.width <= 480) {
             galleryImage.src = galleryImage.dataset.mob_src;

         } else {

             galleryImage.src = galleryImage.dataset.src;
         }
     });

     function setGalleryCanvasResolution(side) {
         switch (side) {
             case 'width':
                 if (window.screen.width <= 480) {
                     return 500;
                 } else {
                     return 1920;
                 }
                 break;
             case 'height':
                 if (window.screen.width <= 480) {
                     return 800;
                 } else {
                     return 1080;
                 }
                 break;
             default:
                 break;
         }

     }
     var galleryImages = document.querySelectorAll('.gallery .slide-item__image');
     var galleryImagesSrc = [];

     var imgDIR = ``;
     if (window.location.href.match(/\/dist\//)) imgDIR = `/dist/`;
     for (var i = 0; i < galleryImages.length; i++) {
         var galleryImg = galleryImages[i];
         // Set the texts you want to display to each slide 
         // in a sibling element of your image and edit accordingly
         galleryImagesSrc.push(galleryImg.getAttribute('src').replace('./', imgDIR));
     };
     /**Gallery distortion slider END*/

     $('.gallery').imagesLoaded(function() {
         var gallerySlider = new CanvasSlideshow({
             sprites: galleryImagesSrc,
             displacementImage: './assets/images/displacment-gallery.jpg',
             autoPlay: false,
             selector: '.gallery',
             autoPlaySpeed: [0.3, 0.3],
             displaceScale: [800, 500],
             fullScreen: true,
             navSelector: '.gallery',
             displaceAutoFit: true,
             stageWidth: setGalleryCanvasResolution('width'),
             stageHeight: setGalleryCanvasResolution('height'),
             image: document.querySelectorAll('.gallery .slide-item__image'),
             navElement: document.querySelectorAll('.gallery .scene-nav'),
             displacementCenter: true,
             interactive: true,
             interactionEvent: 'click', // 'click', 'hover', 'both' 
         });
         gallerySlider.init();
         galleryCanvasPopup();

         let gallerySwitcher = new CanvasSlidewhowSwitcher({
             canvas: document.querySelector('.gallery canvas'),
             timeToSwitch: 3000,
             slideshowObject: gallerySlider,
         });
         gallerySwitcher.handle();
     });
     setTimeout(() => {
         let preloader = document.querySelector('.gallery .preload-block') || null;
         preloader.style.animation = `fadeOut 1s 1 linear`;
         preloader.addEventListener('animationend', function(evt) {

             preloader.remove();
         });
     }, 500);
     window.galleryLoadingStatus = true;
 }


 /**Всплывающая подсказка на галерее экране */
 function galleryCanvasPopup() {
     const mousePopup = document.createElement('div');
     const canvas = document.querySelector('.gallery canvas');
     const container = document.querySelector('.gallery');
     mousePopup.classList.add('mouse-popup');
     mousePopup.innerHTML = 'Click & hold';
     document.querySelector('.gallery').append(mousePopup);
     canvas.addEventListener('mousemove', function(evt) {
         //  console.log(evt);
         mousePopup.style.top = evt.clientY + 'px';
         mousePopup.style.left = evt.clientX + 30 + 'px';
     });
     canvas.addEventListener('mouseenter', function(evt) {
         container.append(mousePopup);
         mousePopup.classList.add('visible');
     });
     canvas.addEventListener('mouseleave', function(evt) {
         mousePopup.remove();
         mousePopup.classList.remove('visible');
     });
 };



 /**Всплывающая подсказка на галерее экране END */