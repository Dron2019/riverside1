// init controller
var controller = new ScrollMagic.Controller();
const FPS = 60;
gsap.defaults({
    ease: BezierEasing(.17, 1.04, .62, .96),
    // ease: BezierEasing(0, 0.99, 0, 0.99),
    // ease: Linear.easeNone,
});
let sceneArray = [];

document.querySelectorAll('.about-section-with-bg').forEach(el => {
    let scene = new ScrollMagic.Scene({
            //duration: '120%',
            duration: getHeight(el) + 200,
            offset: -200,
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

    // gsap.set(scene.text, { skewX: 30, autoAlpha: 0 });
    timeline
        .to(scene.img, { y: getHeight(scene.img) * 0.2 }, )
        .from(scene.blueLogo, { y: 100 }, '<')
        .fromTo(scene.text, {
            y: function(r, target) {
                return getHeight(target);
            }
        }, {
            y: function(r, target) {
                return getHeight(target) * -0.2;
            },
        }, '<')
        .fromTo(scene.text1, {
            y: function(r, target) {
                return getHeight(target);
            }
        }, {
            y: function(r, target) {
                return getHeight(target) * -0.2;
            },
        }, '<');
    scene.setTween(timeline);

    // scene.on("progress", function(event) {
    //     if (event.progress > 0.35) {
    //         gsap.to(scene.text, { skewX: 0, autoAlpha: 1 });
    //     }
    //     console.log("Scene progress changed to " + event.progress);
    // });
    // scene.on("enter", function(event, foo, bar) {
    //     gsap.to(scene.text, { skewX: 0, autoAlpha: 1 });
    // });

    // scene.addIndicators({});
    sceneArray.push(scene);

});


document.querySelectorAll('.about-separator-block').forEach(el => {
    let scene = new ScrollMagic.Scene({
            duration: getHeight(el) * 2,
            offset: getHeight(el) * -0.5,
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
    scene.on("enter", function(event, foo, bar) {
        scene.started = true;
    });
    scene.on('update', (evt) => {});
    scene.on("leave", function(event) {
        scene.started = false;
    });
    // scene.addIndicators({});
});

















function getHeight(el) {
    return +getComputedStyle(el).height.replace(/px/, '');
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