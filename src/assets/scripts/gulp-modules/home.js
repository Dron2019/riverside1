/* beautify preserve:start */
@@include('../libs/artem-scroll/scroll.js');


class CanvasSlidewhowSwitcher {
    constructor(props) {
        this.canvas = props.canvas;
        this.timeToSwitch = props.timeToSwitch || 2000;
        this._holdedTime = 0;
        this.canvasSlideshowObject = props.slideshowObject;
        this.i = 0;
        this.timeCanvasWasHolded = 0;
    }
    handle() {
        let that = this;
        this.canvas.addEventListener('mousedown', function(evt) {
            that._holdedTime = Date.now();
            that.renderProgressBar(evt, false);
            that.move(that.timeToSwitch);
        });
        this.canvas.closest('section').addEventListener('mouseup', function(evt) {
            that.renderProgressBar(evt, true);
            /*если пользователь отпустил кнопку раньше времени, отмена переключения и отмена анимации */
            clearInterval(that.id)
        });
        this.canvas.addEventListener('mousemove', function(evt) {

            that.moveProgressBar(evt);
        });
    }

    switchCanvasSlide(slideShowObject) {
        if (this.canvasSlideshowObject.currentIndex + 1 >= this.canvasSlideshowObject.maxSlides) {
            this.canvasSlideshowObject.moveSlider(0);
        } else {
            this.canvasSlideshowObject.moveSlider(this.canvasSlideshowObject.currentIndex + 1);
        }
    }


    move(timeToSwitch) {
        this.i=0;
        var that = this;
        if (this.i == 0) {
            this.i = 1;
            var elem = document.getElementById("myBar");
            this.id = setInterval(frame, timeToSwitch / 100);

            function frame() {
                if (that.i >= 100) {
                    clearInterval(that.id);
                    let holdedTime = (that._holdedTime - Date.now()) * -1;
                        that.switchCanvasSlide(moveSlider);
                    that.renderProgressBar({}, true);
                    that.i = 0;
                } else {
                    that.i++;
                    elem.style.width = "100%";
                    // elem.style.transform = `scale(${that.i/100})`;
                }
            }
        }
    };


    renderProgressBar(cords, remove1 = false) {
        if (remove1 === true) {
            document.querySelector('.canvas-bar').remove();
            return;
        }
    let bar = `
    <svg style=" width: 45px;
    height:45px;
    border-radius:50%;
    overflow:hidden;
    position:fixed;
    pointer-events:none;
    top:${cords.clientY - 10}px;
    left:${cords.clientX - 20}px;
    z-index:10;" id="myProgress" class="canvas-bar" viewBox="25 25 50 50" >
      <circle id="myBar" class="loader-path" cx="50" cy="50" r="20" fill="none" stroke="red" stroke-width="10" />
    </svg>`;
        document.body.insertAdjacentHTML("afterbegin", bar);
        this.simulatePathDrawing(document.querySelector('#myBar'),2 , this.timeToSwitch )
    };


    moveProgressBar(cords) {
        var progressBar = document.querySelector('.canvas-bar');
        if (progressBar === null) return;

        progressBar.style.left = `${cords.clientX - 20}px`;
        progressBar.style.top = `${cords.clientY  - 10}px`;
        // progressBar.style.transform = `translate(${cords.clientX}px,${cords.clientY - 30}px)`;
    }

    simulatePathDrawing(path, strokeWidth = '3', time = 100) {
        if (path.done) return;
        // var path = document.querySelector('.squiggle-animated path');
        var length = path.getTotalLength();
        console.log(length);
        // Clear any previous transition
        path.style.transition = path.style.WebkitTransition =
            'none';
        // Set up the starting positions
        path.style.strokeDasharray = length + ' ' + length;
        path.style.strokeDashoffset = length;
        // Trigger a layout so styles are calculated & the browser
        // picks up the starting position before animating
        path.getBoundingClientRect();
        // Define our transition
        path.style.transition = path.style.WebkitTransition =
            `stroke-dashoffset ${time/1000}s linear`;
        // Go!
        path.style.strokeDashoffset = '0';
        path.style.strokeWidth = strokeWidth;
        path.style.stroke = '#ffffff';
        path.done = true;
    }
};
/* beautify preserve:end */

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

var moveSlider = new CanvasSlideshow({
    sprites: spriteImagesSrc,
    // displacementImage: './assets/images/main-screen-filter.jpg',
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

let msSwitcher = new CanvasSlidewhowSwitcher({
    canvas: document.querySelector('.main-screen canvas'),
    timeToSwitch: 700,
    slideshowObject: moveSlider,
});
msSwitcher.handle();
/**Всплывающая подсказка на первом экране */
const mousePopup = document.createElement('div');
mousePopup.classList.add('mouse-popup');
mousePopup.innerHTML = 'Click & hold';
document.querySelector('.main-screen').append(mousePopup);
document.querySelector('.main-screen canvas').addEventListener('mousemove', function(evt) {
    // console.log(evt);

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
// let mainScreenEvent = new Event('mainscreenload');
// let preloader = document.querySelector('.preloader-js');
// document.querySelector('.preloader-js').addEventListener('mainscreenload', function(evt) {
//     // evt.stopPropagation();
//     // document.querySelector('.preloader-js').remove();
//     evt.target.classList.add('closing');
//     // console.log(evt.target);

// });
// setTimeout(() => {
//     preloader.dispatchEvent(mainScreenEvent);
// }, 2000);
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

let videoInSecondBlock = document.querySelector('.video-block video'),
    videoBlock = document.querySelector('.video-block');

videoInSecondBlock.addEventListener('click', function(evt) {
    if (videoInSecondBlock.paused) {
        videoInSecondBlock.play();
        changePseudoProperties(videoBlock, 'opacity:0', 'after');
    } else {
        videoInSecondBlock.pause();
        changePseudoProperties(videoBlock, 'opacity:1', 'after');

    }
});


function changePseudoProperties(container, cssText, pseudoType) {
    let containerSelector = '';
    if (pseudoType === undefined) {
        console.warn(`Pseudo element is not defined, ${changePseudoProperties.name} is stopping`);
        return;
    }
    if (typeof container === 'string') {
        containerSelector = container;
        container = document.querySelector(container);
    } else {
        containerSelector = `.${container.classList[0]}`;
    }
    let style = document.createElement('style');
    style.innerHTML = `
    ${containerSelector}:${pseudoType}{
        ${cssText}
    } `;
    container.append(style);
};