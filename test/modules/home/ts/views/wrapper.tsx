import React from 'react';
import { ReactSelect } from 'pragmate-ui/form/react-select';
import { WrappedForm } from '@bgroup/wise-form/form';
import { AppInput } from './components/app-input';
import { useWiseFormContext } from '@bgroup/wise-form/form';
export function Wrapper({ model }) {
	return (
		<WrappedForm
			types={{
				baseWrapper: Wrapper,
				appInput: AppInput,
			}}
			name={model.name}
		/>
	);
}
