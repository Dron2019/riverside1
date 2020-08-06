// init controller
var controller = new ScrollMagic.Controller();
const FPS = 60;
// // create a scene
// let scene = new ScrollMagic.Scene({
//         duration: '100%', // the scene should last for a scroll distance of 100px
//         offset: "20%", // start this scene after scrolling for 50px
//         triggerElement: '#about > div.page__content > section:nth-child(4)'
//     })
//     // .setPin('.anim-bg2') // pins the element for the the scene's duration
//     .addTo(controller); // assign the scene to the controller

// scene.started = false;
// scene.img = document.querySelector('.anim-bg2').closest('section').querySelector('img');
// scene.text = document.querySelector('#about > div.page__content > section:nth-child(4) > .about-text-block .about-text-block__main-subtitle');
// scene.text1 = document.querySelector('#about > div.page__content > section:nth-child(4) > .about-text-block .text');
// // gsap.set(scene.img, { y: '-50%' })
// let animateImg = throttle((startPos) => {
//     // scene.img.style.transform = `translate3d(0px, ${startPos.toFixed(1) / 500 *-30}px, 0)`;
//     gsap.to(scene.img, { y: startPos.toFixed(1) / 500 * 50 + 50 });
//     gsap.to(scene.text, { y: startPos.toFixed(1) / 500 * 30 + 50 });
//     gsap.to(scene.text1, { y: startPos.toFixed(1) / 500 * 30 + 50 });
// }, 1000 / 60);

// scene.on("enter", function(event, foo, bar) {
//     scene.started = true;
//     console.log('START');
// });
// scene.on('update', (evt) => {
//     let start = evt.startPos;
//     if (start < 0 && scene.started) {
//         animateImg(start);

//     }
//     console.log(evt.startPos);
//     console.log(evt.endPos);
// })
// scene.on("leave", function(event) {
//     // gsap.to(scene.img, { y: 0 })
//     scene.started = false;
// });
// scene.addIndicators({})



gsap.defaults({
    // ease: BezierEasing(.17, 1.04, .62, .96),
    // ease: BezierEasing(0, 0.99, 0, 0.99),
    ease: Linear.easeNone,
});


let sceneArray = [];
document.querySelectorAll('.about-section-with-bg').forEach(el => {
    let scene = new ScrollMagic.Scene({
            //duration: '120%', // the scene should last for a scroll distance of 100px
            duration: +getComputedStyle(el).height.replace(/px/, ''),
            // offset: -100, // start this scene after scrolling for 50px
            triggerElement: el,
            tweenChanges: true,
        })
        .addTo(controller);
    /* beautify preserve:start */
    scene.started =     false;
    scene.height =      scene.duration();
    scene.img =         el.querySelector('img');
    scene.blueLogo =    el.querySelector('.blue-logo');
    scene.text =        el.querySelector('.about-text-block__main-subtitle');
    scene.text1 =       el.querySelector('.about-text-block .text');
    /* beautify preserve:end */
    let timeline = gsap.timeline();
    timeline.to(scene.img, { y: 100 }, )
        .from(scene.blueLogo, { y: 100 }, '<')
        .to(scene.text, {
            y: function(r, target) {
                return +getComputedStyle(target).height.replace(/px/, '') * 0.1;
            },
        }, '<')
        .to(scene.text1, {
            y: function(r, target) {
                return +getComputedStyle(target).height.replace(/px/, '') * 0.1;
            },
        }, '<');
    scene.setTween(timeline);

    let animateImg = throttle((startPos) => {
        gsap.to(scene.img, { y: startPos.toFixed(1) / scene.height * 30 });
        gsap.to(scene.text, { y: startPos.toFixed(1) / scene.height * -15 });
        gsap.to(scene.text1, { y: startPos.toFixed(1) / scene.height * -15 });
        gsap.to(scene.blueLogo, { y: (startPos.toFixed(1) / scene.height * -30) * -1 });
    }, 80);

    scene.on("enter", function(event, foo, bar) {
        scene.started = true;
        entranceTextOffset();
        console.log('START');
    });
    scene.on('update', (evt) => {
        // let start = evt.startPos;
        let start = evt.scrollPos;
        if (scene.started) {
            // animateImg(start);
        }
    })
    scene.on("leave", function(event) {
        scene.started = false;
    });
    scene.addIndicators({})
    sceneArray.push(scene);

});
console.log(sceneArray);




document.querySelectorAll('.about-separator-block').forEach(el => {
    let scene = new ScrollMagic.Scene({
            duration: +getComputedStyle(el).height.replace(/px/, '') * 2, // the scene should last for a scroll distance of 100px
            offset: -(+getComputedStyle(el).height.replace(/px/, '')), // start this scene after scrolling for 50px
            triggerElement: el,
            tweenChanges: true,
        })
        .addTo(controller);
    scene.started = false;
    scene.height = scene.duration();
    scene.text = el.querySelector('.about-separator-block__text');

    let timeline = gsap.timeline();
    timeline.from(scene.text, {
        y: 50
    });
    scene.setTween(timeline);
    // gsap.set(scene.text, { y: 200, autoAlpha: 0, })
    let animateImg = throttle((startPos) => {
        gsap.to(scene.text, { y: (startPos.toFixed(1) / scene.height) * -10 });

    }, 0);
    scene.on("enter", function(event, foo, bar) {
        scene.started = true;
    });
    scene.on('update', (evt) => {
        // let start = evt.scrollPos;
        // console.log(evt);
        // if (scene.started) {
        //     animateImg(start);
        // }
    });
    scene.on("leave", function(event) {
        scene.started = false;
        console.log(event);
    });
    scene.addIndicators({});
});



















//////////////////////////////////////////////////////////
const ease_1 = BezierEasing(0, .8, 0, 1);
gsap.defaults({
    ease: "power2.in",
    duration: 1,
    ease: ease_1
});
// const DEFAULT_SPEED;
let objectToAnim = [{
        selector: ".anim-bg1",
        selfScrollTop: '',
        selfHeight: '',
        played: false,
        beforeFunction: function() {

        },
        childAnim: () => {},
        anim: function() {

            // const subtitle = `${this.selector} .about-text-block__main-subtitle`;
            // const text = `${this.selector} .text`;
            // gsap.set([subtitle, text], { y: 500, autoAlpha: 0 });

            // let tl = gsap.timeline();
            // tl.to(this.selector, { y: '0%', duration: 1.3, autoAlpha: 1 })
            //     .to(subtitle, 1.5, { y: 0, autoAlpha: 1 }, '<')
            //     .to(text, 1.75, { y: 0, autoAlpha: 1 }, '<')
            // gsap.to(this.selector, { y: '0%', duration: 1.3, opacity: 1 });

        }
    },
    {
        selector: ".anim-bg2",
        selfScrollTop: '',
        selfHeight: '',
        played: false,
        beforeFunction: function() {
            // const img = document.querySelector(`${this.selector}`).closest('section').querySelector('.about-section-with-bg-image');
            // gsap.set(img, { y: -300, height: '120%' })
        },
        childAnim: function() {
            // console.log(document.querySelector(this.selector));
        },
        anim: function() {
            const subtitle = `${this.selector} .about-text-block__main-subtitle`;
            const text = `${this.selector} .text`;
            const parent = document.querySelector(this.selector).closest('section');
            // const img = document.querySelector(`${this.selector}`).closest('section').querySelector('.about-section-with-bg-image');
            gsap.set([subtitle, text], { y: 500, autoAlpha: 0 });

            let tl = gsap.timeline();
            tl.to(this.selector, { y: '0%', duration: 1.5, autoAlpha: 1 })
                // .to(img, 1.5, { y: 0, }, '<')
                .to(subtitle, 0.5, { y: 0, autoAlpha: 1 }, '<.1')
                .to(text, 0.7, { y: 0, autoAlpha: 1 }, '<.1')
                // gsap.to(this.selector, { y: '0%', duration: 1.3, opacity: 1 });

        }
    },
    {
        selector: ".anim-bg3",
        selfScrollTop: '',
        selfHeight: '',
        played: false,
        childAnim: () => {},
        beforeFunction: function() {
            // const img = document.querySelector(`${this.selector}`).closest('section').querySelector('.about-section-with-bg-image');
            // gsap.set(img, { y: -200, height: '120%' })
        },
        anim: function() {
            const subtitle = `${this.selector} .about-text-block__main-subtitle`;
            const text = `${this.selector} .text`;
            // const img = document.querySelector(`${this.selector}`).closest('section').querySelector('.about-section-with-bg-image');
            gsap.set([subtitle, text], { y: 500, autoAlpha: 0 });

            let tl = gsap.timeline();
            tl.to(this.selector, { y: '0%', duration: 1, autoAlpha: 1 })
                // .to(img, 1.2, { y: 0, }, '<')
                .to(subtitle, 0.5, { y: 0, autoAlpha: 1 }, '<')
                .to(text, 0.5, { y: 0, autoAlpha: 1 }, '<')
                // gsap.to(this.selector, { y: '0%', duration: 1.3, opacity: 1 });

        }
    },
    {
        selector: ".anim-bg4",
        selfScrollTop: '',
        selfHeight: '',
        played: false,
        childAnim: () => {

        },
        beforeFunction: function() {
            // const img = document.querySelector(`${this.selector}`).closest('section').querySelector('.about-section-with-bg-image');
            // gsap.set(img, { y: -200, height: '120%' })
        },
        anim: function() {
            const subtitle = `${this.selector} .about-text-block__main-subtitle`;
            const text = `${this.selector} .text`;
            // const img = document.querySelector(`${this.selector}`).closest('section').querySelector('.about-section-with-bg-image');
            gsap.set([subtitle, text], { y: 500, autoAlpha: 0 });
            let tl = gsap.timeline();
            tl.to(this.selector, { y: '0%', duration: 1, autoAlpha: 1 })
                // .to(img, 1.2, { y: 0, }, '<')
                .to(subtitle, 0.5, { y: 0, autoAlpha: 1 }, '<')
                .to(text, 0.5, { y: 0, autoAlpha: 1 }, '<')
        }
    },
    {
        selector: ".separator-anim1 .about-separator-block__text",
        selfScrollTop: '',
        selfHeight: '',
        played: false,
        anim: function() {
            gsap.set(`${this.selector} p`, { opacity: 0, y: 500 });

            let tl = gsap.timeline();
            tl.to(this.selector, { y: '0%', duration: 1.3, opacity: 1 })
                .to(`${this.selector} p`, { y: 0, opacity: 1, duration: 1.5 }, '<');

        }
    },
    {
        selector: ".separator-anim2 .about-separator-block__text",
        selfScrollTop: '',
        selfHeight: '',
        played: false,
        anim: function() {
            gsap.to(this.selector, { y: '0%', duration: 1.3, opacity: 1 });
        }
    },
    {
        selector: ".separator-anim3 .about-separator-block__text",
        selfScrollTop: '',
        selfHeight: '',
        played: false,
        anim: function() {
            gsap.to(this.selector, { y: '0%', duration: 1.3, opacity: 1 });

        }
    },

];

objectToAnim = [];

/*Вычисление позииций елементиов и предварительная расстановка елементов */
if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {

    objectToAnim.forEach(el => {
        el.selfHeight = +getComputedStyle(document.querySelector(el.selector)).height.replace(/px/, '');
        el.selfScrollTop = -$(el.selector).offset().top;
        el.selfScrollTop = el.selfScrollTop - el.selfHeight;

        if (typeof el.beforeFunction === 'function') el.beforeFunction();
        gsap.set(el.selector, { y: '500px', opacity: 0 })
            // el.selfScrollTop = el.selfScrollTop + (document.documentElement.clientHeight * 0.5);
    });
}

function throttle(func, ms) {
    let isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {

        if (isThrottled) { // (2)
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments); // (1)

        isThrottled = true;

        setTimeout(function() {
            isThrottled = false; // (3)
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
}

function animateOnCustomScrollByGsap(array, currentScrollValue) {
    // console.log('ВЫЗВАЛИ');
    // console.log(array);
    array.forEach(el => {
        if (!el.played && currentScrollValue < el.selfScrollTop) {
            // let tl = gsap.timeline();

            if (typeof el.anim === 'function') el.anim();
            // .to(self.trigger, { y: '0%', suration: 0.2 })
            // .from(el.selector.querySelector('.about-text-block__main-subtitle'), { y: '50%', duration: 0.5 }, '<.2')
            // .from(el.selector.querySelector('.about-text-block .text'), { y: '50%', duration: 0.5 }, '<');
            el.played = true;
        }
    })
};
animateOnCustomScrollByGsap = throttle(animateOnCustomScrollByGsap, 120);

let triggerSelectors = [
    // ".about-section-with-bg.first .about-text-block",
    ".about-separator-block__text",
    ".about-text-block.about-text-block-right.scrollme.animateme",
    "#about > div.page__content > section:nth-child(5) > div",
    "#about > div.page__content > section:nth-child(6) > div",
    "#about > div.page__content > section:nth-child(7) > div",
    "#about > div.page__content > section:nth-child(8) > div",
];
let sections = document.querySelectorAll('.about-section-with-bg');

// gsap.set('.about-section-with-bg.first .about-section-with-bg-image', { y: -100, height: '120%', duration: 1, })
gsap.set('.about-section-with-bg.first .about-text-block', { y: '100%', duration: 1, opacity: 0 })
    // gsap.to('.about-section-with-bg.first .about-section-with-bg-image', { y: 0, duration: 1, })
gsap.to('.about-section-with-bg.first .about-text-block', { y: '0%', duration: 1.3, opacity: 1, delay: 0.5 })
    // triggerSelectors.forEach(selector => {
    //     gsap.set(selector, { y: '100%', duration: 1, opacity: 0 });
    //     let elPosition = $(selector).offset().top - $(selector).height();
    //     console.log(elPosition);
    //     console.log($(selector));
    //     ScrollTrigger.create({
    //         trigger: selector,
    //         start: "top bottom",
    //         end: "bottom bottom",
    //     });
    // });

const $body = $('body');
const $window = $(window);

let scroll = () => {
    let currentS = 0;
    let lastS = 0;
    let lastTime = 0;
    let liheight = 450;
    let windowHeight = $(window).height();
    let windowWidth = $(window).width();

    let top = (windowHeight - liheight) / 2;
    let factor = windowHeight / liheight;
    let maxScroll = ($('.main-scroller1').height() - windowHeight) / factor;

    let isScrolling = false;
    // debugger
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        $body.css('position', 'fixed');


        let smoothScroll = function(event) {
            event.preventDefault();
            if (!isScrolling) isScrolling = true;
            let norm = normalizeWheel(event);
            currentS += norm.spinY * 50;
            if (currentS < 0) currentS = 0;
            if (currentS > maxScroll) currentS = maxScroll;
            // const ease_1 = BezierEasing(1, 1, 1, 1);
            const ease_1 = BezierEasing(.17, 1.04, .62, .96);
            TweenLite.to('.main-scroller1', 1, {
                ease: ease_1,
                y: -currentS * factor,
                overwrite: 5, // preexisting
                onComplete: function(e) {
                    // if (-currentS * factor < -400) gsap.to(document.querySelector(triggerSelectors[0]), { y: '0%', duration: 1.3, opacity: 1 })
                    // console.log(-currentS * factor);
                    isScrolling = false;
                },
                onUpdate: (ebb) => {
                    let translateTop = getComputedStyle(document.querySelector('.main-scroller1')).transform.replace(/matrix\(|\)/g, '');
                    translateTop = translateTop.split(',');
                    // console.log(-currentS * factor);
                    // animateOnCustomScrollByGsap(objectToAnim, +translateTop[5] - this.documentElement.clientHeight * 1.1)
                },
            });
        };
        smoothScroll = throttle(smoothScroll, 0);
        document.addEventListener('wheel', smoothScroll);
    }
};
if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    // scroll();
}