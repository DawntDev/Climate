import React from "react";

export default function AirPressure(props) {
    return (
        <div className="slide">
            <h3>Air Pressure</h3>
            <div className="data">
                <p>{props.pressure ? props.pressure.toFixed(1) : null}</p>
                <p>mb</p>
            </div>
        </div>
    );
};