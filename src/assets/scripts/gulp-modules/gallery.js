$('.gallery-slider-js').on('init', (e, t) => {
    // console.log(e, t);
    document.querySelector('#gallery .total').innerHTML = t.slideCount;
})
$('.gallery-slider-js').on('beforeChange', (e, t, f) => {
    // console.log(e, t, f);
    document.querySelector('#gallery .current').innerHTML = f + 1;
})

$('.gallery-slider-js').slick({
    nextArrow: '.gallery-arrow-js',
    prevArrow: false,
    fade: true,
});