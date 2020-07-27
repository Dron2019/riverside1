// // document.querySelectorAll('.sngl-adv').forEach(el => {

// //     setTimeout(() => {
// //         el.classList.add('fadeIn');
// //     }, 1000);
// // });

// let el = document.querySelectorAll('.sngl-adv');
// el.forEach((elem, index) => {
//     elem.style.transitionTimingFunction = `ease-in-out`;
// })
// el[0].classList.add('fadeIn');


// let animObject = {
//     'vertical': 'fadeInUp',
//     'vertical-reverse': 'fadeInDown',
//     'null': 'fadeIn',
// }
// var syncroAnim = function(elem, collection, index = 0) {
//     console.log(this);
//     if (collection) elem = collection[index];
//     elem.classList.add('fadeIn');

//     setTimeout(() => {
//         syncroAnim(el[index], collection, index);
//     }, 200);
//     index++;
//     elem.onanimationend = () => { elem.classList.remove('fadeIn'); }

// };


// syncroAnim(el[0], el);