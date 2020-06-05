// Select all your images
var spriteImages = document.querySelectorAll('.slide-item__image');
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

var moveSlider = new CanvasSlideshow({

    // pass the images you want as an array
    sprites: spriteImagesSrc,

    selector: '.main-screen',
    // set your displacement texture
    displacementImage: './assets/images/displacment.jpg',

    // [x, y] controls the speed for your default animation
    autoPlaySpeed: [10, 3],
    autoPlay: false,
    // [x, y] controls the effect amount during transitions
    displaceScale: [200, 70],

    // choose whether or not you slideshow will take up all the space of the viewport
    fullScreen: true,

    // If you choose to not have a fullscreen slideshow, set the stage's width & height accordingly
    stageWidth: document.documentElement.clientWidth * 1.1,

    stageHeight: document.documentElement.clientWidth * 0.6,

    // add you navigation element. Should have a 'data-nav' attribute with a value of next/previous
    navElement: document.querySelectorAll('.scene-nav'),

    // will fit the filter bounding box to the renderer
    // displaceAutoFit: false

});