// Select all your images
var spriteImages = document.querySelectorAll('.main-screen-layout .slide-item__image');
var spriteImagesSrc = [];
var texts = [];
var imgDIR = ``;
if (window.location.href.match(/\/dist\//)) imgDIR = `/dist/`;

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
    autoPlay: false,
    selector: '.main-screen',
    autoPlaySpeed: [0.3, 0.3],
    displaceScale: [800, 500],
    fullScreen: true,
    navSelector: '.main-screen',
    navElement: document.querySelectorAll('.main-screen .scene-nav'),
    displaceAutoFit: true,
    // stageWidth: document.documentElement.clientWidth,
    image: document.querySelectorAll('.main-screen-layout .slide-item__image'),
    // stageHeight: document.documentElement.clientHeight,
    displacementCenter: true,
    interactive: true,
    interactionEvent: 'click', // 'click', 'hover', 'both' 
});
moveSlider.init();
/**Всплывающая подсказка на первом экране */
const mousePopup = document.createElement('div');
mousePopup.classList.add('mouse-popup');
mousePopup.innerHTML = 'Натисніть та утримуйте на зображенні';
document.querySelector('.main-screen').append(mousePopup);
document.querySelector('.main-screen canvas').addEventListener('mousemove', function(evt) {
    console.log(evt);

    mousePopup.style.top = evt.clientY + 'px';
    mousePopup.style.left = evt.clientX + 30 + 'px';
});
document.querySelector('.main-screen canvas').addEventListener('mouseenter', function(evt) {
    document.querySelector('.main-screen').append(mousePopup);
    mousePopup.classList.add('visible');
});
document.querySelector('.main-screen canvas').addEventListener('mouseleave', function(evt) {
    mousePopup.remove();
    mousePopup.classList.remove('visible');
});
/**Всплывающая подсказка на первом экране END */



/**GENPLAN */
let svg = document.querySelector('.genplan-svg svg'),
    genplanSvgLinkList = document.querySelectorAll('.svg-link-js');

genplanSvgLinkList.forEach(link => {
        link.addEventListener('mouseover', function(evt) {
            // link.dataset.svgID;
            // //console.log(typeof link.dataset.svgid);
            if (link.dataset.svgid.length == 0 || document.querySelector(`#${link.dataset.svgid}`) === null) return;
            document.querySelector(`#${link.dataset.svgid}`).style.stroke = `#ffffff`;
            document.querySelector(`#${link.dataset.svgid}`).style.fill = `rgba(0, 133, 255, 0.8)`;
            if (document.querySelector(`#${link.dataset.svgid}`).tagName === 'g') {
                document.querySelector(`#${link.dataset.svgid}`).querySelectorAll('path,polygon').forEach(el => {
                    el.style.stroke = `#ffffff`;
                    el.style.fill = `rgba(0, 133, 255, 0.8)`;
                })
            }
        });
        link.addEventListener('mouseout', function(evt) {
            if (link.dataset.svgid.length == 0 || document.querySelector(`#${link.dataset.svgid}`) === null) return;
            document.querySelector(`#${link.dataset.svgid}`).style.stroke = `none`;
            document.querySelector(`#${link.dataset.svgid}`).style.fill = `none`;
            if (document.querySelector(`#${link.dataset.svgid}`).tagName === 'g') {
                document.querySelector(`#${link.dataset.svgid}`).querySelectorAll('path,polygon').forEach(el => {
                    el.style.stroke = `none`;
                    el.style.fill = `none`;
                })
            }
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


/**TABS */
let tabNavList = document.querySelectorAll('.forms .tab-head-item');
let tabContainer = document.querySelector('.forms.tabs');
tabNavList.forEach(el => {
        el.addEventListener('click', function(evt) {
            let dataLink = el.dataset.link;
            tabContainer.querySelector('.tab-head-item.active').classList.remove('active');
            el.classList.add('active');

            tabContainer.querySelector(`.tab-body  .active`).classList.remove('active');
            tabContainer.querySelector(`${dataLink}`).classList.add('active');
        });
    })
    /**TABS END */



if (window.screen.width > 480) {

    document.querySelector('header').style.backgroundColor = `transparent`;
}
if (window.screen.width > 481) {
    let mainScreen = document.querySelector('.main-screen-layout');
    window.addEventListener('scroll', () => {
        //console.log(mainScreen.getBoundingClientRect());

        if (mainScreen.getBoundingClientRect().y < -100) {
            document.querySelector('header').style.backgroundColor = `var(--blue)`;
            document.querySelector('header').classList.add('fixed');
        } else {
            document.querySelector('header').style.backgroundColor = `transparent`;
            document.querySelector('header').classList.remove('fixed');
        }

    });
    document.querySelector('.safari-wrap').prepend(document.querySelector('header'));
}
document.querySelector('.scroll-element svg').onclick = () => {
    document.querySelector('.genplan').scrollIntoView({ behavior: 'smooth' });
};

/**Отключение прелоадера */
let mainScreenEvent = new Event('mainscreenload');
let preloader = document.querySelector('.preloader-js');
document.querySelector('.preloader-js').addEventListener('mainscreenload', function(evt) {
    // evt.stopPropagation();
    // document.querySelector('.preloader-js').remove();
    evt.target.classList.add('closing');
    // console.log(evt.target);

});
setTimeout(() => {
    preloader.dispatchEvent(mainScreenEvent);
}, 2000);
/**Отключение прелоадера */

(function($) {
    $.fn.animateNumbers = function(stop, commas, duration, ease) {
        return this.each(function() {
            var $this = $(this);
            var start = parseInt($this.text().replace(/,/g, ""));
            commas = (commas === undefined) ? true : commas;
            $({ value: start }).animate({ value: stop }, {
                duration: duration == undefined ? 1000 : duration,
                easing: ease == undefined ? "swing" : ease,
                step: function() {
                    $this.text(Math.floor(this.value));
                    if (commas) { $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")); }
                },
                complete: function() {
                    if (parseInt($this.text()) !== stop) {
                        $this.text(stop);
                        if (commas) { $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")); }
                    }
                }
            });
        });
    };
})(jQuery);

$('.preload-num').animateNumbers(100);