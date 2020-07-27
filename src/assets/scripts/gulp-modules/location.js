gsap.fromTo('.location-first-section', { opacity: 0 }, {
    opacity: 1,
    duration: 1
});
gsap.from('.location-first-section>div', { x: '-100vw', stagger: 0.5, delay: 0.2 });
var options = {
    threshold: 0.2,
    root: null,
}
var callback = function(entries, observer) {
    console.log(entries[0]);
    if (entries[0].isIntersecting) {
        gsap.fromTo(`.${entries[0].target.classList[0]} div`, { x: '100vw' }, {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: 0.5
        });
        observer.unobserve(entries[0].target);
    }
};
var observer = new IntersectionObserver(callback, options);
observer.observe(document.querySelector('.location-last-section'));