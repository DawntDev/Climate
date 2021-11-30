var woeid;
var weather;
var days;
var coords = [];

function getLocation() {
    return new Promise((resolve, reject) => {    
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let lat = position.coords.latitude
            let long = position.coords.longitude
            if (lat === coords[0] && long === coords[1]) {
                resolve(woeid);
            } else {
                coords = [lat, long];
                axios.get(
                    `https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`).then(res => {
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
    console.log("Peticion Weather");
    return new Promise((resolve, reject) => {
        axios.get(`https://www.metaweather.com/api/location/${woeid}/`).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        });

    });
}

async function setData(data) {
    try {
        //Day info
        // Wind-Status
        let wind = data.consolidated_weather[0].wind_speed;
        let wind_direction = data.consolidated_weather[0].wind_direction_compass;
        document.querySelectorAll(".data")[0].firstElementChild.innerText = `${wind.toFixed(1)}`;
        document.querySelector("#direction").innerText = `${wind_direction}`;
        switch (wind_direction) {
            case "N":
                document.querySelector("#wind-direction").firstElementChild.style.transform = "rotate(-45deg)";
                break;
            case "NNE":
                document.querySelector("#wind-direction").firstElementChild.style.transform = "rotate(-22.5deg)";
                break;
            case "NE":
                document.querySelector("#wind-direction").firstElementChild.style.transform = "rotate(0deg)";
                break;
            case "ENE":
                document.querySelector("#wind-direction").firstElementChild.style.transform = "rotate(22.5deg)";
                break;
            case "E":
                document.querySelector("#wind-direction").firstElementChild.style.transform = "rotate(45deg)";
                break;
            case "ESE":
                document.querySelector("#wind-direction").firstElementChild.style.transform = "rotate(67.5deg)";
                break;
            case "SE":
                document.querySelector("#wind-direction").firstElementChild.style.transform = "rotate(90deg)";
                break;
            case "SSE":
                document.querySelector("#wind-direction").firstElementChild.style.transform = "rotate(112.5deg)";
                break;
            case "S":
                document.querySelector("#wind-direction").firstElementChild.style.transform = "rotate(135deg)";
                break;
            case "SSW":
                document.querySelector("#wind-direction").firstElementChild.style.transform = "rotate(157.5deg)";
                break;
            case "SW":
                document.querySelector("#wind-direction").firstElementChild.style.transform = "rotate(180deg)";
                break;
            case "WSW":
                document.querySelector("#wind-direction").firstElementChild.style.transform = "rotate(202.5deg)";
                break;
            case "W":
                document.querySelector("#wind-direction").firstElementChild.style.transform = "rotate(225deg)";
                break;
            case "WNW":
                document.querySelector("#wind-direction").firstElementChild.style.transform = "rotate(247.5deg)";
                break;
            case "NW":
                document.querySelector("#wind-direction").firstElementChild.style.transform = "rotate(270deg)";
                break;
            case "NNW":
                document.querySelector("#wind-direction").firstElementChild.style.transform = "rotate(292.5deg)";
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
        let container = document.querySelector("#datadays")
        container.innerHTML = "";
        data.consolidated_weather.shift();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
        days = [];
        for (let i = 0; i < data.consolidated_weather.length; i++) {
            let date = new Date(data.consolidated_weather[i].applicable_date);
            let day = document.createElement("div");
            if (i === 0) { date = "Tomorrow" } else { date = `${dayNames[date.getDay()]}, ${date.getDate()} ${monthNames[date.getMonth()]}` }
            day.classList.add("dayinfo");
            day.innerHTML = `
            <p id="date">${date}</p>
            <img src="https://www.metaweather.com/static/img/weather/${data.consolidated_weather[i].weather_state_abbr}.svg" alt="Snow">
            <p class="temperature">${Math.round(data.consolidated_weather[i].max_temp)}°C</p>
            <p class="temperature">${Math.round(data.consolidated_weather[i].min_temp)}°C</p>
            `
            days.push(day);
        }
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

document.querySelector("#location").addEventListener("click", async () => {
    woeid = await getLocation().then((res) => { return (res) }).catch((err) => { alert(err) });
    weather = await getWeather(woeid).then((res) => { return (res) }).catch((err) => { alert(err) });
    console.log(weather);
    setData(weather);
});
