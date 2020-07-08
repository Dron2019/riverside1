const menuOpenSelector = '.menu-button-js',
    $menu = document.querySelector('menu'),
    $header = document.querySelector('header'),
    $headerDefaultParent = $header.parentElement;
console.log($headerDefaultParent);


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
console.log('menu.js');


window.menuMouseMoveStart = 0;
window.menuMouseMoveEnd = 0;
document.querySelector('.menu-content-image-links').addEventListener('mousedown', function(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    window.menuMouseMoveStart = evt.clientX;
    console.log(evt.clientX);

});
document.querySelector('.menu-content-image-links').addEventListener('mouseup', function(evt) {

    evt.stopPropagation();
    evt.preventDefault();
    window.menuMouseMoveEnd = evt.clientX;
    console.log(window.menuMouseMoveEnd - window.menuMouseMoveStart);
    let a = document.querySelector('.menu-content-image-links').scrollLeft - (window.menuMouseMoveEnd - window.menuMouseMoveStart);
    document.querySelector('.menu-content-image-links').scroll(a, 0)
    console.log();

});