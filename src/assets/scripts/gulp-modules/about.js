/* beautify preserve:start */
// @@include('../libs/scrollme/jquery.scrollme.min.js')
/* beautify preserve:end*/

if (window.screen.width<576) {
document.querySelectorAll('.about-text-block-right.scrollme.animateme').forEach(el=>{
el.dataset.translatex = `-1000`;
})
}