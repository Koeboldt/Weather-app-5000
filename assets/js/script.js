searchInputEl = document.querySelector('#searchInput')
searchButtonEl = document.querySelector('#searchButton')
locationEl = document.querySelector('#location')
todayDisplayEl = document.querySelector('#todayDisplay')
todaysWeatherEl = document.querySelector('#todaysWeather')
upcomingWeatherEl = document.querySelector('#upcomingWeather')
var today = dayjs()

function useGeocoding(location){
    var geocodingApi = 'http://api.openweathermap.org/geo/1.0/direct?q='+ location +'&limit=5&appid=e3ae26a5faf93c7ec8925eb09f4c0f8f'
    fetch(geocodingApi).then(function (response){
        if (response.ok) {
            response.json().then(function(data){
                var lat = data[0].lat
                var long = data[0].lon
                console.log(lat, long);
                getCurrentWeather(lat, long);
                getForecastWeather(lat, long);
            });
            
        }
    })
}
function getCurrentWeather(lat, long){
    var weatherApi = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ long +'&appid=e3ae26a5faf93c7ec8925eb09f4c0f8f&units=imperial'
    fetch(weatherApi).then(function (response){
        if (response.ok) {
            response.json().then(function(data){
                console.log(data);
                var temp = data.main.temp+'°F'
                var location = data.name
                var humidity = data.main.humidity+ '%'
                var windSpeed = data.wind.speed+ 'mph'
                var weather = data.weather[0].main
                displayCurrentWeather(temp, humidity, location, windSpeed, weather)
            })
        }
    })
}

function getForecastWeather(lat, long){
    var weatherApi = 'http://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+long+'&appid=e3ae26a5faf93c7ec8925eb09f4c0f8f&units=imperial'
    fetch(weatherApi).then(function (response){
        if (response.ok) {
            response.json().then(function(data){
                populateForecast(data);
            })
        }
    })
}
//known bug because I am lazy, the date displayed does not act in accordance with the location you are looking at for current weather, instead it is the date of where you are looking from.
function displayCurrentWeather(temp, humidity, location, wind, weather){
document.getElementById('todayDisplay').innerHTML = today.format('dddd MMMM/DD/YYYY');
locationEl.textContent = location;
todaysWeatherEl.textContent ='In '+location+' it is currently '+weather+', with a temperature of '+temp+', with a humidity of '+humidity+', and the wind is currently '+wind
}


function populateForecast(data){
for (var i=9; i < data.list.length; i+=8) {
    var forecast = data.list[i]
    var forecastEl = document.createElement('li')
    forecastEl.textContent = 
    'At the time of '+forecast.dt_txt+
    ' it will be '+forecast.weather[0].description+
    ', with a temperature of '+forecast.main.temp+
    '°F, with a humidity of '+forecast.main.humidity+
    '%, and with wind speeds of '+forecast.wind.speed+'mph';
    console.log(forecastEl);
    upcomingWeatherEl.appendChild(forecastEl);
    
}
}

function handleAnnoyance(data){
    
}

function ENGAGE(event) {
    event.preventDefault();
    var searchData= searchInputEl.value 
    useGeocoding(searchData);
}

searchButtonEl.addEventListener('click', ENGAGE);