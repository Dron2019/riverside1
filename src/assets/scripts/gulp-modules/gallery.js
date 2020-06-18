 /**Gallery distortion slider */

 let sections = $('section');
 $(window).on('scroll', function() {
     var cur_pos = $(this).scrollTop();
     sections.each(function() {
         var top = $(this).offset().top,
             bottom = top + $(this).outerHeight();
         if (cur_pos >= top && cur_pos <= bottom) {
             let currentMenuPoint = $(this)[0].classList[0];
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
         video.play();
     });
     window.videoLoadingStatus = true;
 }
 let gallerySliderLoader = () => {
     if (window.galleryLoadingStatus === true) {
         gallerySliderLoader = () => {};
         return;
     }
     document.querySelectorAll('.gallery .slide-item__image').forEach(galleryImage => {
         galleryImage.src = galleryImage.dataset.src;
     });

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
             displacementImage: './assets/images/gallery-screen-filter.jpg',
             autoPlay: false,
             selector: '.gallery',
             autoPlaySpeed: [0.3, 0.3],
             displaceScale: [800, 500],
             navSelector: '.gallery',
             displaceAutoFit: true,
             stageWidth: document.documentElement.clientWidth * 1.1,
             image: document.querySelectorAll('.gallery .slide-item__image'),
             navElement: document.querySelectorAll('.gallery .scene-nav'),
             stageHeight: document.documentElement.clientHeight,
             displacementCenter: true,
             interactive: false,
             interactionEvent: 'click', // 'click', 'hover', 'both' 
         });
         gallerySlider.init();
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