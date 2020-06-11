// Select all your images
var spriteImages = document.querySelectorAll('.main-screen-layout .slide-item__image');
var spriteImagesSrc = [];
var texts = [];
var imgDIR = `/dist/`

for (var i = 0; i < spriteImages.length; i++) {

    var img = spriteImages[i];

    // Set the texts you want to display to each slide 
    // in a sibling element of your image and edit accordingly
    if (img.nextElementSibling) {
        texts.push(img.nextElementSibling.innerHTML);
    } else {
        texts.push('');
    }

    spriteImagesSrc.push(img.getAttribute('src').replace('./', imgDIR));
}

// var moveSlider = new CanvasSlideshow({
//     image: document.querySelectorAll('.slide-item__image'),
//     // pass the images you want as an array
//     sprites: spriteImagesSrc,

//     selector: '.main-screen',
//     // set your displacement texture
//     displacementImage: './assets/images/displacment.jpg',

//     // [x, y] controls the speed for your default animation
//     autoPlaySpeed: [10, 3],
//     autoPlay: false,
//     // [x, y] controls the effect amount during transitions
//     displaceScale: [200, 70],

//     // choose whether or not you slideshow will take up all the space of the viewport
//     fullScreen: true,

//     // If you choose to not have a fullscreen slideshow, set the stage's width & height accordingly
//     stageWidth: document.documentElement.clientWidth,

//     stageHeight: document.documentElement.clientWidth * 0.6,

//     // add you navigation element. Should have a 'data-nav' attribute with a value of next/previous
//     navElement: document.querySelectorAll('.scene-nav'),

//     // will fit the filter bounding box to the renderer
//     displaceAutoFit: false

// });
var moveSlider = new CanvasSlideshow({
    sprites: spriteImagesSrc,
    displacementImage: './assets/images/main-screen-filter.jpg',
    autoPlay: true,
    selector: '.main-screen',
    autoPlaySpeed: [0.3, 0.3],
    displaceScale: [800, 500],
    navSelector: '.main-screen',
    navElement: document.querySelectorAll('.main-screen .scene-nav'),
    displaceAutoFit: true,
    stageWidth: document.documentElement.clientWidth * 1.1,
    image: document.querySelectorAll('.main-screen-layout .slide-item__image'),
    stageHeight: document.documentElement.clientHeight,
    displacementCenter: true,
    interactive: true,
    interactionEvent: 'click', // 'click', 'hover', 'both' 
});

/**GENPLAN */
let svg = document.querySelector('.genplan-svg svg'),
    genplanSvgLinkList = document.querySelectorAll('.svg-link-js');

genplanSvgLinkList.forEach(link => {
        link.addEventListener('mouseover', function(evt) {
            // link.dataset.svgID;
            console.log(typeof link.dataset.svgid);

            if (link.dataset.svgid.length == 0) return;
            document.querySelector(`#${link.dataset.svgid}`).style.stroke = `#ffffff`;
        });
        link.addEventListener('mouseout', function(evt) {
            if (link.dataset.svgid.length == 0) return;
            document.querySelector(`#${link.dataset.svgid}`).style.stroke = `none`;
        });
    })
    /**GENPLAN END */


/**Distortion Hover */
Array.from(document.querySelectorAll('.about .distortion-hover__item-img')).forEach((el) => {
    const imgs = Array.from(el.querySelectorAll('img'));
    let a = new hoverEffect({
        parent: el,
        intensity: el.dataset.intensity || undefined,
        speedIn: el.dataset.speedin || undefined,
        speedOut: el.dataset.speedout || undefined,
        easing: el.dataset.easing || undefined,
        hover: el.dataset.hover || undefined,
        image1: imgs[0].getAttribute('src'),
        image2: imgs[1].getAttribute('src'),
        displacementImage: el.dataset.displacement,
        otherHoverEl: document.querySelector('.about .left'),
        showElements: document.querySelectorAll('.about .left .text, .about .left .link'),
    });
});

Array.from(document.querySelectorAll('.contact-developer .distortion-hover__item-img')).forEach((el) => {
    const imgs = Array.from(el.querySelectorAll('img'));
    let a = new hoverEffect({
        showElements: document.querySelectorAll('.contact-developer .left .text, .contact-developer .left .link'),
        parent: el,
        intensity: el.dataset.intensity || undefined,
        speedIn: el.dataset.speedin || undefined,
        speedOut: el.dataset.speedout || undefined,
        easing: el.dataset.easing || undefined,
        hover: el.dataset.hover || undefined,
        image1: imgs[0].getAttribute('src'),
        image2: imgs[1].getAttribute('src'),
        displacementImage: el.dataset.displacement,
        otherHoverEl: document.querySelector('.contact-developer .left'),
    });
});
/**Distortion Hover END*/
/**Gallery distortion slider */
// Select all your images
var galleryImages = document.querySelectorAll('.gallery .slide-item__image');
var galleryImagesSrc = [];

var imgDIR = `/dist/`
console.log(galleryImagesSrc);

for (var i = 0; i < galleryImages.length; i++) {

    var galleryImg = galleryImages[i];

    // Set the texts you want to display to each slide 
    // in a sibling element of your image and edit accordingly


    galleryImagesSrc.push(galleryImg.getAttribute('src').replace('./', imgDIR));
}


var gallerySlider = new CanvasSlideshow({
    sprites: galleryImagesSrc,
    displacementImage: './assets/images/main-screen-filter.jpg',
    autoPlay: true,
    selector: '.gallery',
    autoPlaySpeed: [0.3, 0.3],
    displaceScale: [800, 500],
    navSelector: '.gallery',
    displaceAutoFit: true,
    stageWidth: document.documentElement.clientWidth * 1.1,
    image: document.querySelectorAll('.gallery .slide-item__image'),
    navElement: document.querySelectorAll('.gallery .scene-nav'),
    stageHeight: document.documentElement.clientWidth * 0.6,
    displacementCenter: true,
    interactive: true,
    interactionEvent: 'click', // 'click', 'hover', 'both' 
});
/**Gallery distortion slider END*/