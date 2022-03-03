import React from "react";

export default function Visibility(props) {
    return (
        <div className="slide">
            <h3>Visibility</h3>
            <div className="data">
                <p>{props.visibility ? props.visibility.toFixed(1) : null}</p>
                <p>miles</p>
            </div>
        </div>
    )
};