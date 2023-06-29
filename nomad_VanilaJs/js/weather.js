const API_KEY = "30ee8c50fc87cfc3a9732b745562eb8a";

function getOk(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    fetch(url).then(response => response.json()).then((data) => {
        const city = document.querySelector("#weather span:first-child");
        const weather = document.querySelector("#weather span:last-child");
        city.innerText = data.name;
        weather.innerText = data.weather[0].main; 
    });

}
function getError(){
    console.log("error")
}


navigator.geolocation.getCurrentPosition(getOk, getError)