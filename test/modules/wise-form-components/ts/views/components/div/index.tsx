import React from 'react';
import { WrappedForm } from '@bgroup/wise-form/form';
import { useFormContext } from '../../context';

export /*bundle*/ const Div = props => {
	const { types } = useFormContext();
	return (
		<div className=" separator">
			<WrappedForm types={types} name={props.model.name} />
		</div>
	);
};
