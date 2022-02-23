import React, { useState, useEffect } from "react";

export default function Climate(props) {
    const [title, setTitle] = useState(null);
    const [weather, setWeather] = useState(null);
    const [today, setToday] = useState(null);
    
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    const units = {
        "°C": (temp) => Math.round(temp),
        "°F": (temp) => Math.round(temp * 9 / 5 + 32),
        "K": (temp) => Math.round(temp + 273.15)  
    };

    const getData = (callback, woeid, date) => {
        return new Promise(async (resolve, reject) => { 
            await callback(`location/${woeid}/`)
            .then(res => { 
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    };


    useEffect(() => {
        if (props.woeid) {
            if (!(window.localStorage.getItem("weather") && window.localStorage.getItem("title"))) {
                getData(props.api, props.woeid, props.date)
                .then(res => {
                    setTitle(res.title);
                    setWeather(res.consolidated_weather);
                    window.localStorage.setItem("title", JSON.stringify(res.title));
                    window.localStorage.setItem("weather", JSON.stringify(res.consolidated_weather));
                }).catch(err => { 
                    console.log(err);
                    alert("An error occurred while fetching the data. Please try again later.");
                });
            } else {
                setTitle(JSON.parse(window.localStorage.getItem("title")));
                setWeather(JSON.parse(window.localStorage.getItem("weather")));
            };
        };
    }, [props]);

    useEffect(() => { 
        if (weather) {
            let data = weather.filter(item => new Date(`${item.applicable_date}T00:00:00`).toDateString() === props.date.toDateString())[0];
            data ? setToday(data) : window.localStorage.removeItem("weather");
        }
    }, [weather, props]);

    return (
        <div className="climate">
            <div>
                {today ? <img src={`assets/climate/${today.weather_state_abbr}.png`} alt={today.weather_state_name} /> : null}
                {title ? <p>{title}</p> : null}
            </div>
            <div>
                {today ? <p>{units[props.unit](today.the_temp)}</p> : null}
                {props.unit ? <p>{props.unit}</p> : null}
                {today ? <p>{today.weather_state_name}</p> : null}
                <p>Today</p>
                <p>•</p>
                {props.date ? <p>{`${days[props.date.getDay()]}, ${props.date.getDate()} ${months[props.date.getMonth()]}`}</p> : null}
            </div>
        </div>
    );
};