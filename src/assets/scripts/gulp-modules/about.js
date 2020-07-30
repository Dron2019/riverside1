/* beautify preserve:start */

/* beautify preserve:end*/

// if (window.screen.width<576) {
// document.querySelectorAll('.about-text-block-right.scrollme.animateme').forEach(el=>{
// el.dataset.translatex = `-1000`;
// })
// }

let elementsAnimFunctions = {
    'about-text-block': {
        func:function() {gsap.from(document.querySelector('.about-text-block'),{delay:1,opacity:0})},
        defaultValues:{},
    },
    'about-separator-block__text':{
        function() {gsap.from(document.querySelector('.about-separator-block__text'),{delay:1,opacity:0.5,y:'100%'})},
        defaultValues:{},
    },


};
gsap.defaults({
    ease: "power2.in",
    duration: 1
  });

var options = {
    threshold: 0.1,
    root: null,
    selectorToObserve: '.about-text-block',
    // selectorToAnim: '.about-text-block',
}
var callback = function(entries, observer) {
    console.log(entries);
    if (entries[0].isIntersecting) {
        // console.log('sss');
        // elementsAnimFunctions[entries[0].target.classList[0]]['func']();
        gsap.from(entries[0].target, {scale:1.1, opacity:0.9})
        observer.unobserve(entries[0].target);
    }
};
var observer = new IntersectionObserver(callback, options);
// document.querySelectorAll(options.selectorToObserve).forEach(el => {
//     console.log(elementsAnimFunctions[el.classList[0]].defaultValues);
//     gsap.set(el, elementsAnimFunctions[el.classList[0]].defaultValues);
//     observer.observe(el);
// })
// observer.observe(document.querySelector("#about > div.page__content > section:nth-child(3) > div"));
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  markers: {startColor: "red", endColor: "red", fontSize: "18px", fontWeight: "bold", indent: 20},
  onEnter: self=> {
    // gsap.from(self.trigger, {y:'50%'});

    let tl =gsap.timeline();
  // tl.fromTo(title, { x:'50vw', skewX:20, duration:1}, { x:-100, skewX:-20, duration:2})
  tl.from(self.trigger, {y:'100%',duration:0.8})
    .from(self.trigger.querySelector('.about-text-block__main-subtitle'), {y:'100%',duration:0.4},'<.2')
    .from(self.trigger.querySelector('.about-text-block .text'), {y:'100%',duration:0.5},'<.2')
    self.kill();
  }
});
let triggerSelectors = [
  ".about-section-with-bg.first .about-text-block",
  ".about-separator-block__text",
  ".about-text-block.about-text-block-right.scrollme.animateme",
  "#about > div.page__content > section:nth-child(5) > div",
  "#about > div.page__content > section:nth-child(6) > div",
  "#about > div.page__content > section:nth-child(7) > div",
  "#about > div.page__content > section:nth-child(8) > div",
];
let sections = document.querySelectorAll('.about-section-with-bg');



triggerSelectors.forEach(selector=>{
  ScrollTrigger.create({
    trigger: selector,
    start: "top bottom",
    end: "bottom bottom",
  });
})