import React from 'react';

export /* bundle */ function TrafficLight({ color }) {
	let cls = color ? `border-traffic-light ${color}` : 'border-traffic-light';
	return <div className={cls}></div>;
}
