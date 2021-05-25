const MyAPIkey = '6f180c997eacc55ec86e6b66a547d205'; 

let days = [
    "Sunday",
    "Monday",
    "Tuesday", 
    "Wednessday",
    "Thursday", 
    "Friday", 
    "Saturday"
];

let currentWeather = document.getElementById("current-conditions");//get current weather
let foreCast = document.getElementById("fivedayforecast");//get 5 days forecast

window.addEventListener('load', () => {
    let longiTute;
    let latTute;
     
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {//get location
            longiTute = position.coords.longitude;
            latTute = position.coords.latitude;
            const recent = `https://api.openweathermap.org/data/2.5/weather?lat=${latTute}&lon=${longiTute}&appid=${MyAPIkey}`;
            fetch(recent)
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        let {temp: temporary} = data.main;
                        let {description, icon} = data.weather[0];
                        let icnLink = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                        let cel = (temporary - 273.15);
                        let divHtml = '<h2>Current Conditions</h2>' +
                                '<img src="' + icnLink + '" />' +
                                '<div class="current">' +
                                '<div class="temp">' + cel.toFixed() + '℃</div>' +
                                '<div class="condition">' + description + '</div>' +
                                '</div>';
                        currentWeather.innerHTML = divHtml;


                    });       
            const weatherForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latTute}&lon=${longiTute}&appid=${MyAPIkey}`;
            fetch(weatherForecast)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        let buleanCon = true;
                        let dayS = days[new Date(data.list[0].dt_txt).getDay()];
                        let fHtml = '';
                        let dHtml = '';
                        let currentD = 0;
                         
                        for (let i = 0; i < data.list.length; i++) {

                            let {temp_min, temp_max} = data.list[i].main; 
                            let {description, icon} = data.list[i].weather[0];
                            let teXt = data.list[i].dt_txt; 
                            let urlIcn = `http://openweathermap.org/img/wn/${icon}@2x.png`; 
                            let minTemp = (temp_min - 273.15); 
                            let maxTemp = (temp_max - 273.15);
                            let date = new Date(teXt);
                            let day = days[date.getDay()];
                            let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
                            let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
                            let second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
                            
                            if (dayS == day && buleanCon) {
                                fHtml += '<h3 class="dayHeading">' + day + '</h3>'
                                fHtml += '<div class="forecast">';
                                buleanCon = false;
                            }
                            
                            if (dayS != day) {
                                fHtml += dHtml;
                                fHtml += '</div>';
                                dHtml = '';
                                buleanCon = true;
                                dayS = day;
                            }

                            dHtml += '<div class="day">' +
                                    '<h3>' + hour + ':' + minute + ':' + second + '</h3>' +
                                    '<img src="' + urlIcn + '" />' +
                                    '<div class="description">' + description + '</div>' +
                                    '<div class="temp">' +
                                    '<span class="high">' + minTemp.toFixed() + '℃</span>/<span class="low">' + maxTemp.toFixed() + '℃</span>' +
                                    '</div>' +
                                    '</div>';

                        }
                        fHtml += dHtml;
                        fHtml += '</div>';
                        foreCast.innerHTML = fHtml;

                    });
        });
    }
});
