/*Form handler */
let submitList = document.querySelectorAll('.submit-js');
const SEND_URL = './static/application.php';
submitList.forEach(el => {
    el.addEventListener('click', function(evt) {
        evt.preventDefault();
        let status = checkRequiredFields(el.closest('form'));
        if (typeof status === 'object') {
            send(status, SEND_URL, el.closest('form'));
        }

        //console.log(el.closest('form'));
    });
});

function checkRequiredFields(form) {
    const inputs = form.querySelectorAll('input');
    let sendObject = {};
    sendObject.form_name = form.dataset.name || '';
    sendObject.metka = window.location.href || '';
    inputs.forEach(input => {
        let inputGroup = input.closest('.input-group');
        if (input.dataset.required === 'true' && input.value.length === 0) {
            inputGroup.classList.add('unfilled')
        } else {
            inputGroup.classList.remove('unfilled');
        }
        sendObject[input.name] = input.value;
    });
    if (form.querySelector('.unfilled') === null) {
        //console.log(sendObject);
        return sendObject;
    } else {
        return false;
    }
    // //console.log(form.querySelector('.unfilled'));

};

function send(object, url, form) {
    let data = new FormData();
    form.querySelector('button[type="submit"]').setAttribute('disabled', '');
    for (const key in object) {
        data.append(key, object[key]);
    }
    fetch(url, {
        method: 'POST',
        body: data,
    }).catch(res => {
        console.log(res);
        sendMessageStatus(form, 'Помилка відправки');
        //console.log(data);
    }).then(res => {
        return res.text();
    }).then(res => {
        if (res.match(/11/)) {
            sendMessageStatus(form, 'Ваше повідомлення відправлено');
        } else {

            sendMessageStatus(form, 'Помилка відправки');
        }
        setTimeout(() => {
            form.querySelector('button[type=submit]').removeAttribute('disabled');
        }, 2000);
    })
};

function sendMessageStatus(form, status) {
    // form.style.position = 'relative';
    form.innerHTML += `
    <span class="send-message" 
    style="animation: fadeInLeft 1s 1 ease-in-out ; 
        color:#fff; position:absolute; 
        padding:10px 20px; 
        background:var(--blue);
        left:50%; 
        transform:translateX(-50%)">
    ${status}
    </span>`;
    setTimeout(() => {
        form.querySelector('.send-message').style.animation = 'fadeOutRight 1s 1 ease-in';
        form.querySelector('.send-message').addEventListener('animationend', function(evt) {
            form.querySelector('.send-message').remove();
        });
    }, 2000);


}

/** Маска телефонного номера */
$.mask.definitions['#'] = '[0-9]';
$.mask.definitions['9'] = '';
$('input[name=tel]').mask("+(38) ### ###-##-##", {
    placeholder: "_"
});



$('.form-call-button-js').magnificPopup({
    items: {
        type: 'inline',
        src: putCallbackFormInPopup('.callback-form'),
    },
    mainClass: 'mfp-fade',
    removalDelay: 500,

});

// $('.callback-form').magnificPopup();


function putCallbackFormInPopup(selector) {
    return document.querySelector(selector);

}
/*Form handler END */