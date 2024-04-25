import React from 'react';
import { useWiseFormContext } from '@bgroup/wise-form/form';

export /* bundle */ function TrafficLight({ color }) {

	const { model } = useWiseFormContext();
	
	let cls = color ? `border-traffic-light ${color}` : 'border-traffic-light';
	return <div className={cls}></div>;
}
