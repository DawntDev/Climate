import React, { useEffect } from "react";

export default function Settings(props) {
    useEffect(() => {
        let root = document.getElementById("root");
        let container = document.querySelector(".container");

        if (root && container) {
            root.style.height = "30rem";
            container.style.height = "30rem";
        };

        let listener = document.querySelector("#form").addEventListener("submit", (e) => {
            let unit = document.querySelector("#unit").value;
            let timer = document.querySelector("#timer").value;
            props.unit(unit);
            props.timer(timer);

            window.localStorage.setItem("unit", unit);
            window.localStorage.setItem("timer", timer);
            e.preventDefault();
        });

        let update = document.querySelector("#update").addEventListener("click", () => {
            window.localStorage.removeItem("woeid");
            window.localStorage.removeItem("title");
            window.localStorage.removeItem("weather");
        });

        return () => {
            root.style.height = "15rem";
            container.style.height = "15rem";
            window.removeEventListener("submit", listener);
            window.removeEventListener("click", update);
        };
    }, [props]);

    return (
        <div className="configs">
            <form id="form">
                <h3>Settings</h3>
                <div className="config-item">
                    <label htmlFor="unit">Unit</label>
                    <p>Temperature unit of measure:</p>
                    <select name="unit" id="unit">
                        <option value="°C">Celsius</option>
                        <option value="°F">Fahrenheit</option>
                        <option value="K">Kelvin</option>
                    </select>
                </div>
                <div className="config-item">
                    <label htmlFor="timer">Interval</label>
                    <p>Interval of each slide duration</p>
                    <select name="timer" id="timer">
                        <option value="5000">5 seconds</option>
                        <option value="10000" >10 seconds</option>
                        <option value="15000">15 seconds</option>
                        <option value="20000">20 seconds</option>
                    </select>
                </div>
                <div className="config-item">
                    <label htmlFor="refresh">Refresh</label>
                    <p>Update weather information</p>
                    <input id="update" type="button" value="Update" />
                </div>
                <input type="submit" value="Save" />
            </form>
        </div>
    );
};