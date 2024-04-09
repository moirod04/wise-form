import React from 'react';
import { useWiseFormContext } from '@bgroup/wise-form/form';
import { Input } from 'pragmate-ui/form';

export const BindlessInput = props => {
	const { model } = useWiseFormContext();
	const instance = model.getField(props.name);

	const onChange = event => {
		const value = event.target.value;
		instance.set({ value });
	};

	return (
		<Input type="text" name={props.name} value={instance.value} onChange={onChange} label={instance.specs.label} />
	);
};
