function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        // ��� ������������� �������� ������ �������� �� ���������
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}


let count = getCookie('count'); 
if (count == undefined) {
    count = 0;
}
setCookie('count', ++count);
document.getElementById("visits").value = getCookie('count'); //установка значения в поле 

document.querySelector("#reset").addEventListener("click", () => {
    setCookie('count', 0);
    setCookie('name', "");
    setCookie('date', undefined);
})

if (getCookie('date') === undefined) {
    setCookie('date', new Date().getTime());
    document.getElementById("time").value = "";
}
else {
    let currentDate = new Date();
    let previousDate = new Date(Number(getCookie('date')));
    let delay = currentDate - previousDate;
    let months = Math.floor(delay / (30 * 24 * 60 * 60 * 1000));
    let days = Math.floor(delay / (24 * 60 * 60 * 1000)) % 30;
    let hours = Math.floor(delay / (60 * 60 * 1000)) % 24;
    let minutes = Math.floor(delay / (60 * 1000)) % 60;
    let secunds = Math.floor(delay / 1000) % 60;
    document.getElementById("time").value = months + " " + days + " " + hours + " " + minutes + " " + secunds + " ";
    setCookie('date', new Date().getTime());
}


let name = document.getElementById("name");

function signOn() {
    if (name.value == "Kolya" || name.value == "Vasya") {
        setCookie('name', name.value, { secure: true, 'max-age': 3600 });
    }
    }
    if (getCookie('name') != undefined) {
        document.getElementById("Hello").value = getCookie('name');
        document.getElementById("button_sign").style.display = "none";
    }

