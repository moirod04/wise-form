import React from 'react';
import { WrappedForm } from '@bgroup/wise-form/form';
import { useWiseFormContext } from '@bgroup/wise-form/form';

export function Wrapper({ model }) {
	return (
		<WrappedForm
			types={{
				baseWrapper: Wrapper,
			}}
			name={model.name}
		/>
	);
}
