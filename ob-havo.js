const api = {
    key: '8f34f56d6f9b51168ef10eb7d88fe4bb',
    baseurl: 'https://api.openweathermap.org/data/2.5/',
}
const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery)
function setQuery(e){
    if (e.keyCode == 13){
        getResults(searchBox.value);
        console.log(searchBox.value);
    }
}

function getResults(query) {
    fetch(`${api.baseurl}weather?q=${query}&units = metrics&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}
function displayResults(weather){
    console.log(weather);
    let city = document.querySelector(' .location .city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date')
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector(' .temp')
    temp.innerHTML = `${Math.round(weather.main.temp)} <span>°С</span>`;

    let weatherEL = document.querySelector('.weather')
    weatherEL.innerHTML=weather.weather[0].main;

    let hilow = document.querySelector(" .hi-low");
    hilow.innerHTML = `${Math.round(weather.main.temp_min)}°С  / ${Math.round(weather.main.temp_max)}°С `;
}
function dateBuilder(n) {
    let months = [
        'January', 'Ferbruary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesdey', 'Thursday', 'Friday', 'Saturday'];
        let day = days[n.getDay()];
        let date = n.getDate()
        let month = months[n.getMonth()];
        let year = n.getFullYear();

        return`${day} ${date} ${month} ${year}`;
}