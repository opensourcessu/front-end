function changePostitColor() {
    var color=prompt('색깔을 입력해주세요');
    document.getElementById("postitArea").style.backgroundColor=color;
}

function postitSave() {
    var postitColor=document.getElementById("postitArea").style.backgroundColor;
    document.write(postitColor);
    //포스트잇 내용이랑 색상저장해야
}