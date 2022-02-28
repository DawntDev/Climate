import React from "react";

export default function Climate({ title, today, unit, date }) {

	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
	const units = {
		"°C": (temp) => Math.round(temp),
		"°F": (temp) => Math.round(temp * 9 / 5 + 32),
		"K": (temp) => Math.round(temp + 273.15)
	};
	
	return (
		<div className="climate">
			<div className="status">
				{today ? <img src={`assets/climate/${today.weather_state_abbr}.png`} alt={today.weather_state_name} /> : null}
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" height="1rem" viewBox="0 0 24 24" width="1rem" fill="#fff"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
					{title ? <p>{title}</p> : null}
				</div>
			</div>
			<div className="data">
				<div className="temp">
					<div className="value">
						{today ? <p>{units[unit](today.the_temp)}</p> : null}
						{unit ? <p>{unit}</p> : null}
					</div>
					{today ? <p>{today.weather_state_name}</p> : null}
				</div>
				<div className="date">
					<p>Today</p>
					<p>•</p>
					{date ? <p>{`${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`}</p> : null}
				</div>
			</div>
		</div>
	);
};