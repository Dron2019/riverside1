/**Menu hover Effect */
let menuButton = document.querySelector('.menu-button');
menuButton.querySelectorAll('rect').forEach(rect => {
    rect.dataset.startHeight = rect.getAttribute('width');
})
menuButton.addEventListener('mouseover', (evt) => {
    menuButton.querySelectorAll('rect').forEach(rect => {
        rect.setAttribute('width', '36');
    })
});
menuButton.addEventListener('mouseout', function(evt) {
    menuButton.querySelectorAll('rect').forEach(rect => {
        rect.setAttribute('width', rect.dataset.startHeight);
    })
});
/**Menu hover Effect  END*/



function moveToElement(selector) {
    document.querySelector(selector).scrollIntoView({ behavior: "smooth" });
}

// let currentS = 0;
// let lastS = 0;
// let lastTime = 0;
// let liheight = 450;
// let windowHeight = $(window).height();
// let windowWidth = $(window).width();

// let top2 = (windowHeight - liheight) / 2;
// let factor = windowHeight / liheight;
// let maxScroll = ($('.main-scroller').height() - windowHeight) / factor;

// let isScrolling = false;

// if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {

//     document.addEventListener('wheel', function(event) {
//         event.preventDefault();
//         if (!isScrolling) isScrolling = true;
//         let norm = normalizeWheel(event);
//         currentS += norm.spinY * 50;


//         if (currentS < 0) currentS = 0;
//         if (currentS > maxScroll) currentS = maxScroll;

//         const ease_1 = BezierEasing(.17, 1.04, .62, .96);
//         TweenLite.to('.main-scroller', 1, {
//             ease: ease_1,
//             y: -currentS * factor,
//             overwrite: 5, // preexisting
//             onComplete: function() {
//                 isScrolling = false;
//             }
//         });
//     });
// }