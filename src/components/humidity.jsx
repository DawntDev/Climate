import React, { useEffect } from "react";

export default function Humidity(props) {
    useEffect(() => {
        let elem = document.querySelector(".load-bar").firstChild;
        elem.style.width = `${props.humidity}%`;
    }, [props]);

    return (
        <div className="slide">
            <h3>Humidity</h3>
            <div className="data">
                <p>{props.humidity}</p>
                <p>%</p>
            </div>
            <div className="bar">
                <p>0</p>
                <p>50</p>
                <p>100</p>
            </div>
            <div className="load-bar">
                <div></div>
            </div>
        </div>
    );
};