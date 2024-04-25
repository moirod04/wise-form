import React from 'react';
import { useWiseFormContext } from '@bgroup/wise-form/form';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { Input } from 'pragmate-ui/form';
import type { IProps } from './types';
import { TrafficLight } from './light';
import { useCalculate } from './use-calculate';
import { formatToDisplay } from './format-to-display';

export /* bundle */ function InputTrafficLight({ name, ...props }: IProps) {


	const { model } = useWiseFormContext();
	console.log("🚀 ~ InputTrafficLight ~ model:", model)
	const instance = model.getField(name);
	const { className, isPercent } = instance.specs
	const value = formatToDisplay(instance.value, isPercent);
	const [valueToDisplay, setValueToDisplay] = React.useState(value);
	useBinder([instance], () => {
		const value = formatToDisplay(instance.value, isPercent)
		setValueToDisplay(value)
	})
	const [color] = useCalculate({ name, instance });

	const cls = `${className ?? ''} container__traffic-light`;
	delete props.isPercent
	return (
		<div className={cls}>
			<Input type="text" {...props} name={name} value={valueToDisplay || ""} />
			<TrafficLight color={color} />
		</div>
	);
}

InputTrafficLight.defaultProps = {
	isPercent: true,
};
