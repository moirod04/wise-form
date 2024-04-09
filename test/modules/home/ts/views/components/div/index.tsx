import React from 'react';
import { WrappedForm } from '@bgroup/wise-form/form';

export /*bundle*/ const Div = props => {
	return (
		<div className=" separator">
			<WrappedForm name={props.model.name} />
		</div>
	);
};
