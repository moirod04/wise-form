import React from 'react';
import { WFSettings } from '@bgroup/wise-form/settings';
import { SelectionField } from '../components/field/selection';
import { Input, Textarea } from 'pragmate-ui/form';

export function useTypes(types) {
	return React.useMemo(() => {
		const defaultTypes = {
			checkbox: SelectionField,
			radio: SelectionField,
			select: SelectionField,
			textarea: Textarea,
			text: Input,
			password: Input,
			default: Input,
		};

		return { ...defaultTypes, ...WFSettings.types, ...types };
	}, [types]);
}
