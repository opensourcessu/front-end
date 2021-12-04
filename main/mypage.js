var body=document.body;
var life=document.createElement('div');
life.innerHTML("<c")

function changeBackgroundColor() {
    var color=prompt('색깔을 입력해주세요');
    document.querySelector("body").style.backgroundColor=color;
}

function changeBackgroundImage() { //만드는중...
    var image=prompt('이미지')
}

function changeFont() { //글자 예시를 몇개 주고 선택하게 해야하나?
    var font=prompt('fontFamily 값을 입력해주세요');
    document.querySelector("body").style.fontFamily=font;
}