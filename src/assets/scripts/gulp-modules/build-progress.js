const now = new Date().getMonth();
console.log(now);
let monthes = document.querySelectorAll('.monthes li'),
    years = document.querySelectorAll('.years li ');
let currentMonthSpan = document.querySelector('.current-month');
let currentFilterData = {

    month: now,
    year: new Date().getFullYear(),
};
for (let i = 0; i <= now; i++) {
    monthes[i].classList.add('active');
    if (i === now) {
        monthes[i].classList.add('current');
        currentMonthSpan.innerHTML = monthes[i].innerHTML + ' ' + new Date().getFullYear();
    }
}
each(years, (el) => {
    if (+el.innerHTML === new Date().getFullYear()) el.classList.add('current');
    el.classList.add('active');
    el.addEventListener('click', function(evt) {
        each(years, el => el.classList.remove('current'));
        el.classList.add('current');
        changeFilterDate()
    });
})


monthes.forEach(month => {
    month.addEventListener('click', function(evt) {
        each(monthes, (el) => { el.classList.remove('current') });
        month.classList.add('current');
        changeFilterDate()
            // currentMonthSpan.innerHTML = month.innerHTML + ' ' + new Date().getUTCFullYear();

    });
})

function changeFilterDate() {
    let month = document.querySelector('.monthes .current');
    let year = document.querySelector('.years .current');
    smoothTextChange(currentMonthSpan.innerHTML, month.innerHTML + ' ' + year.innerHTML, currentMonthSpan, true)
}



/*functions */
function each(array, func) {
    array.forEach(el => {
        func(el);
    })
}

function smoothTextChange(startText, finishText, elem, firstStart) {
    if (firstStart) elem.style.minHeight = getComputedStyle(elem).height;

    function timeoutChange(text, element) {
        if (text.length === 0) {
            element.innerHTML = finishText;
            // fillText(finishText)
            return;
        }
        element.innerHTML = text;
        setTimeout(() => {
            timeoutChange(text.slice(0, text.length - 1), elem);
        }, 50);

        function fillText(toFill) {
            element.innerHTML = toFill;
            if (toFill.length === 0) return;
            setTimeout(() => {
                fillText(toFill.substring(0, toFill.length - 1));
            }, 50);

        }
    }
    timeoutChange(startText, elem);
};

/* beautify preserve:start */
@@include('../libs/slick/slick.min.js')
/* beautify preserve:end */
$('.slider').slick({
    prevArrow: '.arrow-prev',
    nextArrow: '.arrow-next',
});