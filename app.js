async function getWeather(defaultCity) {
    const API_KEY = `0c84fbc8d9d0600e85a69a50ff006dfc`;
    const input = defaultCity || document.getElementById("cityInput").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${API_KEY}&units=metric`;

    // DOM variables to reflect changes on the screen
    const city = document.getElementById("cityName");
    const origTemp = document.getElementById("origTemp");
    const feelsLikeTemp = document.getElementById("feelsLikeTemp");
    const minMaxType = document.getElementById("minMaxType");

    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        console.log(data)

        // data needed (variables)
        const mainTemp = Math.round(data.main.temp);
        const minTemp = Math.round(data.main.temp_min);
        const maxTemp = Math.round(data.main.temp_max);
        const feelsLike = Math.round(data.main.feels_like);
        const humidity = Math.round(data.main.humidity);
        const pressure = Math.round(data.main.pressure);
        const seaLevel = Math.round(data.main.sea_level);
        const weatherType = data.weather[0].main;
        const weatherDescription = data.weather[0].description;

        console.log(`${input}: Temp = ${mainTemp}; Min = ${minTemp}; Max = ${maxTemp}`);
        console.log(`Feels Like = ${feelsLike}; Humidity = ${humidity}; Pressure = ${pressure}`);
        console.log(`Sea Level = ${seaLevel}`);
        console.log(`Weather type = ${weatherType}; Description = ${weatherDescription}`);

        // change city
        city.innerText = input;

        // change temp and details
        origTemp.innerHTML = `${mainTemp}<span id="degreeIcon"> <i class="fa-regular fa-circle"></i> </span>`;
        feelsLikeTemp.innerHTML = `Feels like ${feelsLike}<span id="degreeIcon"> <i class="fa-regular fa-circle"></i> </span>`;
        minMaxType.innerHTML = `${weatherType} <span class="up-downIcon"> <i class="fa-solid fa-arrow-up"></i> 
                    </span>${maxTemp}<span id="degreeIcon"> <i class="fa-regular fa-circle"></i> </span>
                    / <span class="up-downIcon"><i class="fa-solid fa-arrow-down"></i></span>${minTemp}
                    <span id="degreeIcon"> <i class="fa-regular fa-circle"></i> </span>`

    } else {
        console.log("Error:", response.status);
    }
}

// default weather
window.onload = () => getWeather("Winnipeg");

// can press Enter key on keyboard
document.getElementById("cityInput").addEventListener("keypress", (e) => {
    if(e.code === "Enter") {
        getWeather();
    }
});