if (localStorage.getItem('woeid')) {
    var woeid = JSON.parse(localStorage.getItem('woeid'));
} else {
    var woeid;
}
if (localStorage.getItem('weather')) {
    var weather = JSON.parse(localStorage.getItem('weather'));
    setData(weather);
} else {
    var weather;
}

if (localStorage.getItem('days')) {
    var days = JSON.parse(localStorage.getItem('days'));
} else {
    var days;
}
if (localStorage.getItem('coords')) {
    var coords = JSON.parse(localStorage.getItem('coords'));
} else {
    var coords = [];
}

if (localStorage.getItem('time')) {
    console.log(localStorage.getItem('time'));
    var time = new Date(localStorage.getItem('time'));
    if (time.getDate() != new Date().getDate()) {
        if (woeid) {
            weather = getWeather(woeid);
            console.log(weather, "New Day");
            setData(weather);
        }
        
    }
} else {
    var time;
}

function getLocation() {
    return new Promise((resolve, reject) => {    
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let lat = position.coords.latitude
            let long = position.coords.longitude
            if (lat == coords[0] && long == coords[1]) {
                resolve(woeid);
            } else {
                coords = [lat, long];
                localStorage.setItem('coords', JSON.stringify(coords));
                axios.get(
                    `https://pacific-springs-75759.herokuapp.com/https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`).then(res => {
                        localStorage.setItem('woeid', res.data[0].woeid);
                        resolve(res.data[0].woeid)
                    }).catch(err => {
                        reject(err)
                    });
            }
        });
    } else {
        reject("Geolocation is not supported by this browser.");
    }
    });
}

function getWeather(woeid) {
    return new Promise((resolve, reject) => {
        axios.get(
            `https://pacific-springs-75759.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`).then(res => {
                time = new Date();
                localStorage.setItem('weather', JSON.stringify(res.data));
                localStorage.setItem('time', time);
                resolve(res.data)
            }).catch(err => {reject(err)});

    });
}

async function setData(data) {
    try {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

        // Header
        // Climate Today
        document.querySelector("#climate_today").innerHTML = `<img id="sun" src="/assets/climate/${data.consolidated_weather[0].weather_state_abbr}.png" alt="sun">`;
        // Climate Today
        //Temperature
        document.querySelector("#temperature").firstElementChild.innerHTML = `${Math.round(data.consolidated_weather[0].the_temp)}`;
        //Temperature
        //Weather
        document.querySelector("#weather").firstElementChild.innerHTML = `${data.consolidated_weather[0].weather_state_name}`;
        //Weather
        //Date
        {
            let date = new Date(`${data.consolidated_weather[0].applicable_date}T00:00:00`);
            date = `${dayNames[date.getDay()]}, ${date.getDate()} ${monthNames[date.getMonth()]}`;
            document.querySelector("#datetime").lastElementChild.innerHTML = `${date}`;
        }
        //Date
        //Location
        document.querySelector("#location").lastElementChild.innerHTML = `${data.title}`;
        //Location
        // Header


        //Day info
        // Wind-Status
        let wind = data.consolidated_weather[0].wind_speed;
        let wind_direction = data.consolidated_weather[0].wind_direction_compass;
        let compass = document.querySelector("#wind-direction").firstElementChild;

        document.querySelectorAll(".data")[0].firstElementChild.innerText = `${wind.toFixed(1)}`;
        document.querySelector("#direction").innerText = `${wind_direction}`;
        switch (wind_direction) {
            case "N":
                compass.style.transform = "rotate(-45deg)";
                break;
            case "NNE":
                compass.style.transform = "rotate(-22.5deg)";
                break;
            case "NE":
                compass.style.transform = "rotate(0deg)";
                break;
            case "ENE":
                compass.style.transform = "rotate(22.5deg)";
                break;
            case "E":
                compass.style.transform = "rotate(45deg)";
                break;
            case "ESE":
                compass.style.transform = "rotate(67.5deg)";
                break;
            case "SE":
                compass.style.transform = "rotate(90deg)";
                break;
            case "SSE":
                compass.style.transform = "rotate(112.5deg)";
                break;
            case "S":
                compass.style.transform = "rotate(135deg)";
                break;
            case "SSW":
                compass.style.transform = "rotate(157.5deg)";
                break;
            case "SW":
                compass.style.transform = "rotate(180deg)";
                break;
            case "WSW":
                compass.style.transform = "rotate(202.5deg)";
                break;
            case "W":
                compass.style.transform = "rotate(225deg)";
                break;
            case "WNW":
                compass.style.transform = "rotate(247.5deg)";
                break;
            case "NW":
                compass.style.transform = "rotate(270deg)";
                break;
            case "NNW":
                compass.style.transform = "rotate(292.5deg)";
                break;
        }
        //Wind-Status
        //Humidity
        let humidity = data.consolidated_weather[0].humidity;
        document.querySelectorAll(".data")[1].firstElementChild.innerText = `${humidity}`;
        document.querySelector("#loadbar").firstElementChild.style.width = `${humidity}%`;
        //Humidity
        //Visibility
        let visibility = data.consolidated_weather[0].visibility;
        document.querySelectorAll(".data")[2].firstElementChild.innerText = `${visibility.toFixed(1)}`;
        //Visibility
        //Pressure
        let air_pressure = data.consolidated_weather[0].air_pressure;
        document.querySelectorAll(".data")[3].firstElementChild.innerText = `${Math.round(air_pressure)}`;
        //Pressure
        //Day info
        let container = document.querySelector("#datadays");
        container.innerHTML = "";


        days = [];
        for (let i = 1; i < data.consolidated_weather.length; i++) {
            let date = new Date(`${data.consolidated_weather[i].applicable_date}T00:00:00`);
            let day = document.createElement("div");
            if (i === 1) { date = "Tomorrow" } else { date = `${dayNames[date.getDay()]}, ${date.getDate()} ${monthNames[date.getMonth()]}` }
            day.classList.add("dayinfo");
            day.innerHTML = `
            <p id="date">${date}</p>
            <img src="assets/climate/${data.consolidated_weather[i].weather_state_abbr}.png" alt="${data.consolidated_weather[i].weather_state_name}">
            <p class="temperature">${Math.round(data.consolidated_weather[i].max_temp)}°C</p>
            <p class="temperature">${Math.round(data.consolidated_weather[i].min_temp)}°C</p>
            `
            days.push(day);
        }
        localStorage.setItem("days", JSON.stringify(days));
        for (let i = 0; i < days.length; i++) {
            document.querySelector("#datadays").appendChild(days[i]);
        }
        //Day info

    } catch (error) {
        if (woeid == undefined) {
            woeid = await getLocation().then((res) => { return (res) }).catch((err) => { alert(err) });
            weather = await getWeather(woeid).then((res) => { return (res) }).catch((err) => { alert(err) });
        } else if (woeid) {
            weather = await getWeather(woeid).then((res) => { return (res) }).catch((err) => { alert(err) });
        } else {
            alert("Error Ultra mega grave que verga hiciste?");
        }
    }
}

document.querySelector("#geolocation").addEventListener("click", async () => {
    woeid = await getLocation().then((res) => { return (res) }).catch((err) => { alert(err) });
    weather = await getWeather(woeid).then((res) => { return (res) }).catch((err) => { alert(err) });
    setData(weather);
});