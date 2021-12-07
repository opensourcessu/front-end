function showImage() {
    var newImage = document.getElementById('image-show').lastElementChild;
    newImage.style.visibility = "visible";
    
    document.getElementById('image-upload').style.visibility = 'hidden';

    document.getElementById('fileName').textContent = null;     //기존 파일 이름 지우기
}


function loadFile(input) {
    var file = input.files[0];

    var name = document.getElementById('fileName');
    name.textContent = file.name;

    var newImage = document.createElement("img");
    newImage.setAttribute("class", 'img');
    newImage.setAttribute("id", "new-image");

    let img_base64;
    let reader = new FileReader();
    reader.onload = function () {
        img_base64 = reader.result;
        console.log(img_base64);

        newImage.src = img_base64; // URL.createObjectURL(file);

        // newImage.style.width = "100%";
        // newImage.style.height = "100%";
        newImage.style.objectFit = "cover";

        newImage.style.visibility = "hidden";   //버튼을 누르기 전까지는 이미지 숨기기
        // newImage.style.objectFit = "contain";

        var container = document.getElementById('image-show');
        container.appendChild(newImage);
    }

    reader.readAsDataURL(file);
};