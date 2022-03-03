import React, { useState, useEffect } from "react";
import Climate from "./climate";
import WindStatus from "./wind_status";
import Humidity from "./humidity";
import Visibility from "./visibility";
import AirPressure from "./air_pressure ";

export default function Contain(props) {
    const [loading, setLoading] = useState(true);
    const [section, setSection] = useState(null);
    const [title, setTitle] = useState(null);
    const [weather, setWeather] = useState(null);
    const [today, setToday] = useState(null);

    const getData = (callback, woeid) => {
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
        if (today) {
            const background = {
                "sunny": (elem) => elem.style.background = "var(--sunny)",
                "cloudy": (elem) => elem.style.background = "var(--cloudy)",
                "snowy": (elem) => elem.style.background = "var(--snowy)",
                "clear": (elem) => elem.style.background = "var(--clear)"
            };
            
            let elem = document.querySelector(".container");
            if (today.weather_state_abbr === "c") {
                background.sunny(elem);
            } else if (["hc", "hr", "lr", "s", "t"].includes(today.weather_state_abbr)) {
                background.cloudy(elem);
            } else if (["h", "sl", "sn"].includes(today.weather_state_abbr)) {
                background.snowy(elem);
            } else {
                background.clear(elem);
            };
        };
    }, [today]);

    useEffect(() => {
        if (title && weather) {
            setLoading(false);
        } else {
            setLoading(true);
        };
    }, [title, weather]);

    useEffect(() => {
        let counter = 1;
        const sections = [
            <Climate title={title} today={today} unit={props.unit} date={props.date} />,
            <WindStatus speed={today ? today.wind_speed : null} direction={today ? today.wind_direction_compass : null} />,
            <Humidity humidity={today ? today.humidity : null}/>,
            <Visibility visibility={today ? today.visibility : null}/>,
            <AirPressure pressure={today ? today.air_pressure : null}/>
        ]

        const interval = setInterval(() => {
            if (!loading) {
                if ((title, weather, today)) setSection(sections[counter % sections.length]);
                counter++;
            };
        }, props.timer);

        return () => window.clearInterval(interval);
    }, [title, weather, today, loading, props]);

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
        <>
            {loading ?
                <div className="loading">
                    <div className="spinner">
                    </div>
                </div> :
                <>
                    {section ?
                        section :
                        <Climate title={title} today={today} unit={props.unit} date={props.date} />
                    }
                </>
            }
        </>
    );
};