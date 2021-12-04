class Mode {
    constructor(type, placeholder, border, url) {
        this.type = type;
        this.placeholder = placeholder;
        this.border = border;
        this.url = url;
    }

    setup() {
        srch.style.border = this.border;
        document.title = this.placeholder;
        menu = this.border;
    }
}

let srch;
let menu;

const ggurl = "https://www.google.com/search?q=";
const imgurl = "https://www.google.com/search?tbm=isch&q=";
const yturl = "https://www.youtube.com/results?search_query=";
const fcurl = "https://www.facebook.com/search/top?q=";
const durl = "https://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&sug=&sugo=&sq=&o=&q=";
const nurl = "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=";
const giturl = "https://github.com/search?q=";

let search_engine = {
    init() {
        srch = document.querySelector('#srch');
        menu = document.querySelector('.menu background-color');
        search_engine.nvmode();
    },

    nvmode() {
        this.modeObj = new Mode('web', 'Naver', '3px #04CF5C solid', nurl);
        this.modeObj.setup();
    },

    ytmode() {
        this.modeObj = new Mode('yt', 'YouTube', '3px #ed4343 solid', yturl);
        this.modeObj.setup();
    },
    
    ggmode() {
        this.modeObj = new Mode('gg', 'Google', '3px #6E6E6E solid', ggurl);
        this.modeObj.setup();
    },
    
    fcmode() {
        this.modeObj = new Mode('fc', 'Facebook', '3px #1C5CAD solid', fcurl);
        this.modeObj.setup();
    },
    
    dmode() {
        this.modeObj = new Mode('d', 'daum', '3px #87A1E6 solid', durl);
        this.modeObj.setup();
    },
    
    gitmode() {
        this.modeObj = new Mode('git', 'Git', '3px #000 solid', giturl);
        this.modeObj.setup();
    },

    openurl(e) {
        let url = this.modeObj.url
        let input = srch.value.trim().replace("+", "%2B").replace("=", "%3D").replace("&", "%26").replace(" ", "+");
        url = url.concat(input);
        if (e.keyCode == 13 && input != "") {
            window.location = url;
        }
    },
};
