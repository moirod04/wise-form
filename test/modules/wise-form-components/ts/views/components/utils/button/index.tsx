import React from 'react';
import { Button as PUIButton } from 'pragmate-ui/components';
import { useWiseFormContext } from '@bgroup/wise-form/form';

interface IProps extends Record<string, any> {
	label: string;
	icon?: string;
	handleClick?;
}

export /*bundle*/ const Button = ({ label, ...props }: IProps) => {
	const { model } = useWiseFormContext();
	const instance = model.getField(props.name);

	const onClick = event => {
		const params = instance?.specs?.onClick || props.onClick;

		if (params && params.condition) {
			let canExecute = false;
			if (params?.condition?.hasValue) {
				canExecute = params.condition.hasValue.every(item => {
					const field = model.getField(item);
					return field?.value;
				});
			}
			if (!canExecute) return;

			params.field.forEach(action => {
				const field = model.getField(action.to);
				field.set({ [action.property]: action.value });
				field[action.property] = action.value;
			});

			return;
		}

		if (params && typeof params === 'object') {
			params.forEach(action => {
				if (action.type === 'event') {
					model.callbacks[action.callback]({ ...action, form: model });
					return;
				}

				if (action.callback) {
					const dependency = model.getField(action.dependency);
					model.callbacks[action.callback]({ ...action, dependency, form: model });
					return;
				}
				if (action.type === 'reset') {
					model.getField(action.to).clear();
					return;
				}
				const field = model.getField(action.to);
				field.set({ [action.property]: action.value });
				field[action.property] = action.value;
			});
		}

		if (props.handleClick) props.handleClick(event);
	};

	const { handleClick, dependentOn, ...properties } = props;

	const style = instance?.specs?.style ? instance.specs.style : {};
	const onClickHandler = props.type === 'submit' ? {} : { onClick };
	const disabled = instance?.disabled || instance?.fetching;

	return (
		<PUIButton
			{...properties}
			style={style}
			icon={instance?.specs?.icon}
			{...onClickHandler}
			disabled={disabled}
			fetching={instance?.fetching}>
			{label}
		</PUIButton>
	);
};
