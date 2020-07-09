const menuOpenSelector = '.menu-button-js',
    $menu = document.querySelector('menu'),
    $header = document.querySelector('header'),
    $headerDefaultParent = $header.parentElement,
    menuImageLinks = document.querySelectorAll('.menu__content-image-link');
// console.log($headerDefaultParent);


document.querySelectorAll(menuOpenSelector).forEach(but => {
        but.addEventListener('click', () => {
            if (!but.classList.contains('opened')) {

                $menu.classList.add('opened');
                $menu.prepend($header);
                but.classList.add('opened');
            } else {
                $menu.classList.remove('opened');
                $headerDefaultParent.append($header);
                but.classList.remove('opened');
            }

        });
    })
    // console.log('menu.js');


window.menuMouseMoveStart = 0;
window.menuMouseMoveEnd = 0;
window.clicked = false;
document.querySelector('.menu-content-image-links').addEventListener('mousedown', function(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    window.menuMouseMoveStart = evt.clientX;
    // console.log(evt.clientX);
    window.menuMouseMoveEnd = 0;
    window.clicked = true;

});
document.querySelector('.menu-content-image-links').addEventListener('mouseup', function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    window.clicked = false;
    return false;
});

document.querySelector('.menu-content-image-links').addEventListener('mousemove', function(evt) {
    if (!window.clicked) return;
    window.menuMouseMoveEnd = evt.clientX;
    let a = document.querySelector('.menu-content-image-links').scrollLeft - (window.menuMouseMoveEnd - window.menuMouseMoveStart);
    document.querySelector('.menu-content-image-links').scroll(a * 0.5, 0)
});
document.querySelector('.menu-content-image-links').addEventListener('mouseleave', function(evt) {
    window.clicked = false;
});

menuImageLinks.forEach(link => {
    link.addEventListener('click', function(evt) {
        if (window.menuMouseMoveEnd !== 0) evt.preventDefault();
    });
})


document.querySelector('.menu-content-image-links').addEventListener('wheel', function(evt) {
    evt.preventDefault();
    let currentScrollCord = document.querySelector('.menu-content-image-links').scrollLeft,
        deltaY = evt.deltaY;
    document.querySelector('.menu-content-image-links').scroll((currentScrollCord + deltaY), 0)
});