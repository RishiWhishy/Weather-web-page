window.addEventListener('load', () => {
    let long;
    let lat;
    let temperature = document.querySelector(".temp");
    let location = document.querySelector(".city");
    let desc = document.querySelector(".description");
    let maxTemp = document.querySelector(".high");
    let hum = document.querySelector(".humidity");
    let windspe = document.querySelector(".windspeed");
    let mintemp = document.querySelector(".low");
    let weatherIcon = document.querySelector(".weather-icon");
    let sunriseEl = document.querySelector(".sunrise");
    let sunsetEl = document.querySelector(".sunset");
    let loader = document.querySelector(".loader");
    let weatherContainer = document.querySelector(".weather");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b9665f787fc973119f72698d0a89962c&units=metric`;
            
            fetch(api)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const { temp, temp_max, temp_min, humidity } = data.main;
                    
                    temperature.textContent = temp;
                    location.textContent = data.name;
                    maxTemp.textContent = `${temp_max}°C`;
                    hum.textContent = `${humidity}%`;
                    mintemp.textContent = `${temp_min}°C`;

                    const { description } = data.weather[0];
                    desc.textContent = description;

                    const { speed } = data.wind;
                    windspe.textContent = `${speed} km/h`;

                    const { sunrise, sunset } = data.sys;
                    sunriseEl.textContent = convertTimestampToTime(sunrise);
                    sunsetEl.textContent = convertTimestampToTime(sunset);

                    setWeatherIcon(description);

                    // Hide loader and show weather container
                    loader.style.display = 'none';
                    weatherContainer.style.display = 'block';
                });
        });
    }

    function convertTimestampToTime(timestamp) {
        const date = new Date(timestamp * 1000);
        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        const formattedTime = (hours % 12 || 12) + ':' + minutes.substr(-2) + (hours >= 12 ? ' PM' : ' AM');
        return formattedTime;
    }

    function setWeatherIcon(description) {
        let iconClass;
        switch (description.toLowerCase()) {
            case 'clear sky':
                iconClass = 'wi wi-day-sunny';
                break;
            case 'few clouds':
                iconClass = 'wi wi-day-cloudy';
                break;
            case 'scattered clouds':
            case 'broken clouds':
                iconClass = 'wi wi-cloud';
                break;
            case 'shower rain':
            case 'rain':
                iconClass = 'wi wi-rain';
                break;
            case 'thunderstorm':
                iconClass = 'wi wi-thunderstorm';
                break;
            case 'snow':
                iconClass = 'wi wi-snow';
                break;
            case 'mist':
                iconClass = 'wi wi-fog';
                break;
            default:
                iconClass = 'wi wi-na';
                break;
        }
        weatherIcon.className = `weather-icon wi ${iconClass}`; // Assign the class to the icon element
    }
});
