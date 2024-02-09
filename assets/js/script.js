searchInputEl = document.querySelector('#searchInput')
searchButtonEl = document.querySelector('#searchButton')

function useGeocoding(location){
    var geocodingApi = 'http://api.openweathermap.org/geo/1.0/direct?q='+location+'&limit=5&appid=e3ae26a5faf93c7ec8925eb09f4c0f8f'
    fetch(geocodingApi).then(function (response){
        if (response.ok) {
            response.json().then(function(data){
                var lat = data[0].lat
                var long = data[0].lon
                console.log(lat, long);
                
            });
        }
    })
}

function getLocation(event) {
    event.preventDefault();
    var searchData= searchInputEl.value 
    useGeocoding(searchData);
}

searchButtonEl.addEventListener('click', getLocation);