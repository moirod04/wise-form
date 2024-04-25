import React from 'react';
import { WrappedForm } from '@bgroup/wise-form/form';
import { v4 as uuid } from 'uuid';
import { useDinamycFormContext } from '../../../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { useTotal } from './use-total';
import { useWiseFormContext } from '@bgroup/wise-form/form';

export /*bundle*/ const Totalizer = ({ model }) => {
	const ref = React.useRef(null);
	const { model: formModel } = useWiseFormContext();
	const data = model.specs;
	const { types } = useDinamycFormContext();
	const totalInput = formModel.getField(data.displayTotalIn);
	useTotal(ref, totalInput, model);

	useBinder([model], () => {
		data.fields.forEach(field => {
			model.fields.get(field.name).disabled = model.disabled;
		});
	});

	const output = data.dataHead.map(item => <span key={uuid()}>{item}</span>);

	return (
		<section className={`totalizer-container ${data.className}`}>
			<div ref={ref} className="totalizer">
				{!!data.dataHead.length && <header>{output}</header>}
				<WrappedForm types={types} name={model.name} />
			</div>
		</section>
	);
};
