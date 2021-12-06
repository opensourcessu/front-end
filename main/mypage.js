var body=document.body;
var life=document.createElement('div');
life.innerHTML("<c")

function changeBackgroundColor() {
    var color=prompt('색깔을 입력해주세요');
    document.querySelector("body").style.backgroundColor=color;
}

function changeFont() { //글자 예시를 몇개 주고 선택하게 해야하나?
    window.open("selectFont.html", "selectFontPopup", "width=460, height=300, left=100, top=50");
}

function selectedFont(font) {
    if(font=='G') {
        document.body.style.fontFamily="'Gowun Dodum', sans-serif";
    } else if(font=='N') {
        document.body.style.fontFamily="'Nanum Pen Script', cursive";
    } else if(font=='P') {
        document.body.style.fontFamily="'Poor Story', cursive";
    } else if(font=='S') {
        document.body.style.fontFamily="'Stylish', sans-serif";
    }
    
}