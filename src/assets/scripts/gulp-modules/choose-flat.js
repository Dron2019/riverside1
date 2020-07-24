const cardsContainer = document.querySelector('.flat-container-js');
const ADRESS = './static/flat-ajax.php';
const ACTION_WP = 'flat-ajax.php';
/**TABS */
let tabNavList = document.querySelectorAll('.tab');
let tabContainer = document.querySelector('.documents-page-wrapper  .tabs');
tabNavList.forEach(el => {
        el.addEventListener('click', function(evt) {
            let dataLink = el.dataset.link;
            tabContainer.querySelector('.active').classList.remove('active');
            el.classList.add('active');
            clearContainer(cardsContainer);
            reRenderFlats(cardsContainer, ADRESS, el.dataset);
        });
    })
    /**TABS END */



function reRenderFlats(container, adress, data) {
    let action = 'flat-ajax.php';
    let sendData = new FormData();
    sendData.append('action', action);
    Object.entries(data).forEach(el => {
        sendData.append(el[0], el[1]);
    })
    fetch(adress, {
            method: 'POST',
            body: sendData
        })
        .then(res => res.text())
        .then(res => {
            clearContainer(container);
            renderFetchedFlats(container, res);

        })
}

function clearContainer(container) {
    container.style.minHeight = getComputedStyle(container).height;
    container.innerHTML = '';
}

function renderFetchedFlats(container, markup) {
    container.innerHTML = markup;
    container.style.minHeight = 'auto';
}