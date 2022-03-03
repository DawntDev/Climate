import React, { useEffect } from "react";

export default function WindStatus(props) {
    useEffect(() => {
        if (props.direction) { 
            const directions = {
                "N": (elem) => elem.style.transform = "rotate(-45deg)",
                "NNE": (elem) => elem.style.transform = "rotate(-22.5deg)",
                "NE": (elem) => elem.style.transform = "rotate(0deg)",
                "ENE": (elem) => elem.style.transform = "rotate(22.5deg)",
                "E": (elem) => elem.style.transform = "rotate(45deg)",
                "ESE": (elem) => elem.style.transform = "rotate(67.5deg)",
                "SE": (elem) => elem.style.transform = "rotate(90deg)",
                "SSE": (elem) => elem.style.transform = "rotate(112.5deg)",
                "S": (elem) => elem.style.transform = "rotate(135deg)",
                "SSW": (elem) => elem.style.transform = "rotate(157.5deg)",
                "SW": (elem) => elem.style.transform = "rotate(180deg)",
                "WSW": (elem) => elem.style.transform = "rotate(202.5deg)",
                "W": (elem) => elem.style.transform = "rotate(225deg)",
                "WNW": (elem) => elem.style.transform = "rotate(247.5deg)",
                "NW": (elem) => elem.style.transform = "rotate(270deg)",
                "NNW": (elem) => elem.style.transform = "rotate(292.5deg)"
            }
            let elem = document.querySelector(".direction").firstChild;
            directions[props.direction](elem);
        };
    }, [props]);

    return (
        <div className="slide">
            <h3>Wind Status</h3>
            <div className="data">
                <p>{props.speed.toFixed(1)}</p>
                <p>mph</p>
            </div>
            <div className="direction">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" /></svg>
                <p>{props.direction}</p>
            </div>
        </div>
    )
};