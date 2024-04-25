import { useWiseFormContext } from '@bgroup/wise-form/form';
import { VerificationCondition } from './verification';
import React from 'react';

export function useCalculate({ name, instance }) {
	const { model } = useWiseFormContext();
	const [color, setColor] = React.useState<string>('grey');
	const verify = () => {
		const field = model.getField(name)

		if (!field || !field?.condition) return;
		const isValues = !!field?.condition.values;

		const firstValue = isValues
			? field?.condition.values.find(item => {
				const fieldValue = model.getField(item);
				if (!fieldValue) return;

				const value = parseFloat(fieldValue.value);
				return !isNaN(value);
			})
			: 0;
		const firsValueInput = firstValue ? parseFloat(model.getField(firstValue).value) : undefined;

		let value = !!field?.condition.values
			? field.condition.values?.reduce((accumulator, item) => {
				const fieldValue = model.getField(item);
				if (!fieldValue) return;
				return firsValueInput;
			}, firsValueInput ?? 0)
			: '';

		const parameter = !isNaN(parseFloat(field.value))
			? parseFloat(field.value)
			: '';
		const config = {
			parameter,
			value: value ?? 0,
			red: field.condition.red,
			yellow: field.condition.yellow,
			green: field.condition.green,
			traffic: field.condition.traffic,
		};

		const verificationCondition = new VerificationCondition(config);
		const color = verificationCondition.verify();
		setColor(color);
	};

	React.useEffect(() => {
		verify();
		model.on('calculate.traffics', verify);
		let field
		if (instance.condition) {
			field = model.getField(instance.condition.values[0]);
			if (field) field.on('change', verify);
		};
		return () => {
			model.off('calculate.traffics', verify);
			if (instance.condition && field) instance.off('change', verify);

		};
	}, []);

	return [color, setColor,];
}
