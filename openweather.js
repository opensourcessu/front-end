
const getJson = function(url,callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET',url,true);
    xhr.responseType = 'json';
    xhr.onload = function(){
        const status = xhr.status;
        if(status == 200){
            console.log(xhr.response);

            loadWeather(xhr.response);

        }else{
            console.log(xhr.response);
        }
    };
    xhr.send();

    
};





getJson('http://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=49f2a44ba633f02db2d706240b4c42d4&units=metric'),
function(err,data){
    if(err!== null){
        alert('sorry,');
    }else{

        console.log(data);
        // loadWeather(data);
    }
}

function loadWeather(data){

    let location = document.querySelector('.location');
    let currentTime = document.querySelector('.current-time');
    let currentTemp = document.querySelector('.current-temp');
    let feelsLike = document.querySelector('.feels-like');
    let minTemp = document.querySelector('.min-temp');
    let maxTemp = document.querySelector('.max-temp');
    let icon = document.querySelector('.icon');
    let weatherIcon = data.weather[0].icon;

    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();



    location.append(data.name);
    currentTemp.append(data.main.temp);
    feelsLike.append(data.main.feels_like);
    maxTemp.append(data.main.temp_max);
    minTemp.append(data.main.temp_min);

    // icon.innerHTML = '<img src = http://openweathermap.org/img/wn/${weatherIcon}.png>';

    currentTime.append(month+'월'+ day + '일 '+hours +':' +minutes);

}