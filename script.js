let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date");
let w_temprature = document.querySelector(".temprature");
let w_min = document.querySelector(".weather_min");
let w_max = document.querySelector(".weather_max");
let w_forecast = document.querySelector(".forecast");
let weather_icon = document.querySelector(".weather_icon");

let w_feelslike = document.querySelector(".feel_like");
let w_humidity = document.querySelector(".humidity");
let w_wind = document.querySelector(".wind");
let w_pressure = document.querySelector(".pressure");

let city_name = document.querySelector(".search"); 

let city = "surat";

city_name.addEventListener("submit" , (e) =>{
    e.preventDefault();

    let cityyy = document.querySelector(".city_name");
    city = cityyy.value;

    getWeatherData();

})

const getCountry = (code) => {
    console.log(new Intl.DisplayNames([code], { type: 'region' }).of(code));
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);
}

const getDateTime = (dt) => {
    let curdate = dt * 1000;

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    };

    const formater = new Intl.DateTimeFormat('en-US',options).format(curdate);

    return formater;
}

const getWeatherData = async () => {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8881759bbad77a0deaec1f320c0f7a99`

    try {
        const res = await fetch(weatherURL);
        const data = await res.json();    

        const { weather, main, wind, dt, sys, name } = data

        w_forecast.innerHTML = weather[0].main;

        cityName.innerHTML = `${name} , ${getCountry(sys.country)}`
        dateTime.innerHTML = getDateTime(dt);
        w_temprature.innerHTML = `${main.temp}&#176`;
        w_min.innerHTML = `Min : ${main.temp_min.toFixed()}&#176` ;
        w_max.innerHTML = `Max : ${main.temp_max.toFixed()}&#176` ;
        weather_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@4x.png">`;

        w_feelslike.innerHTML =  `${main.feels_like.toFixed()}&#176`;
        w_humidity.innerHTML = `${main.humidity.toFixed()}%`
        w_wind.innerHTML = `${wind.speed.toFixed()} m/s`;
        w_pressure.innerHTML = `${main.pressure.toFixed()} hPa`

    }
    catch (error) {
        console.log(error);
    }
}



document.body.addEventListener('load', getWeatherData());