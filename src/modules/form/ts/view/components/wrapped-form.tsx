import React from 'react';
import { WrappedWiseFormContext, useWiseFormContext } from '../context';
import { RowFieldContainer } from './rows/row-container';
import { useTemplate } from '../hooks/use-template';

export /*bundle */ function WrappedForm({ children, settings, types, data }): JSX.Element {
	const { model: parent } = useWiseFormContext();

	const wrapper = parent.wrappers.get(settings.name);
	const model = wrapper;
	if (!wrapper) {
		throw new Error(`Wrapper not found for ${settings.name}`);
	}

	if (!settings.name) {
		console.error('the form does not have a name', settings.fields);
	}

	const template = useTemplate(settings);

	const fields = [...settings.fields];
	const Containers = template.items.map((num, index) => {
		const items = fields.splice(0, num[0]);

		return <RowFieldContainer template={num} model={model} items={items} key={`rf-row--${index}.${num}`} />;
	});

	const value = {
		model,
		name: settings.name,
		template,
		formTypes: types ?? {},
		parent,
	};

	return (
		<WrappedWiseFormContext.Provider value={value}>
			{Containers}
			{children}
		</WrappedWiseFormContext.Provider>
	);
}
