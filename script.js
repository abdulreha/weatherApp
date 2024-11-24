const apikey = "2aea79600dc1e78c43c01751d61b044c";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";  // Changed to HTTPS

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);
        
        if (response.status === 404) {
            // Show error and hide weather details
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            const data = await response.json();

            // Update weather details
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            // Update weather icon
            if (data.weather[0].main == "Clouds") {
                weatherIcon.src = "img/clouds.png";
            } else if (data.weather[0].main == "Clear") {
                weatherIcon.src = "img/clear.png";
            } else if (data.weather[0].main == "Rain") {
                weatherIcon.src = "img/rain.png";
            } else if (data.weather[0].main == "Drizzle") {
                weatherIcon.src = "img/drizzle.png";
            } else if (data.weather[0].main == "Mist") {
                weatherIcon.src = "img/mist.png";
            }

            // Show weather details and hide error
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
