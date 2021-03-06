class Mode {
    constructor(type, placeholder, border, url) {
        this.type = type;
        this.placeholder = placeholder;
        this.border = border;
        this.url = url;
    }

    setup() {
        srch.placeholder = this.placeholder;
        srch.style.borderBottom = this.border;
        document.title = this.placeholder;
    }
}

const srch = document.querySelector('#srch');
const srchurl = "https://www.google.com/search?q=";
const yturl = "https://www.youtube.com/results?search_query=";
const nurl = "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=";
let modeObj;

document.addEventListener('DOMContentLoaded',init);

function init() {
    modeObj = new Mode('web', 'Google', '4px #efd10e solid',srchurl);
    modeObj.setup();
}

function ytmode() {
    modeObj = new Mode('yt', 'YouTube', '4px #ed4343 solid',yturl);
    modeObj.setup();
}

function nmode() {
    modeObj = new Mode('web', 'Naver', '4px #43c1ef solid',nurl);
    modeObj.setup();
}

function openurl(e) {
    let url = modeObj.url
    let input = srch.value.trim().replace("+", "%2B").replace("=", "%3D").replace("&", "%26").replace(" ", "+");
    url = url.concat(input);
    if (e.keyCode == 13 && input != "") {
        window.location = url;
    }
}
