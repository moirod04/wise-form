import React from 'react';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { parseFix } from './fix-number-display';
import { formatToDisplay } from './format-to-display';
import { useWiseFormContext } from '@bgroup/wise-form/form';
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	decimalsLimit?: number | undefined;
	model: any;
	toFixed?: boolean;
	isSetDefaultValue?: boolean;
}

export /*bundle*/ const PercentageInput = (props: IProps) => {
	const { model } = useWiseFormContext();
	const instance = model.getField(props.name);
	const decimalsLimit = instance.specs.decimalsLimit === undefined ? 2 : instance.specs.decimalsLimit;
	let value = instance.value
	if (instance.specs.roundValue && value) value = Math.round(value);
	value = formatToDisplay(value, decimalsLimit, instance.specs.noDecimals, instance.specs.allowNegative);
	if (instance.specs.toFixed) value = parseFix(value, decimalsLimit);
	const [displayValue, setDisplayValue] = React.useState(value);

	const onReset = () => instance.clear();

	useBinder([model], onReset, ['reset']);
	const onBinder = () => {
		if (instance.isChange) return
		let value = instance.value;
		if (instance.specs.roundValue && value) value = Math.round(value);
		value = instance.value
			? formatToDisplay(value, decimalsLimit, instance.specs.noDecimals, instance.specs.allowNegative)
			: '';
		if (instance.specs.toFixed && !!value) value = parseFix(value, decimalsLimit);
		setDisplayValue(value);
	}
	useBinder([instance], onBinder, ['change']);
	const convertDisplayToNumeric = display => {
		if (!display) return '';
		const numeric = display.replace(/\./g, '').replace(',', '.');
		return parseFloat(numeric);
	};

	const onBlur = () => {
		let adjustedNumericValue = instance.value;

		if (
			adjustedNumericValue &&
			!isNaN(Number(adjustedNumericValue)) &&
			Number(adjustedNumericValue) <= 0 &&
			!!instance.specs.notZero
		) {
			instance.set({ value: '', isChange: false });
			setDisplayValue('');
			return;
		}

		if (instance.specs.roundUp) {
			adjustedNumericValue = Math.round(parseFloat(adjustedNumericValue?.toString()));
			instance.set({ value: adjustedNumericValue });
		};

		const toDisplayVal = formatToDisplay(
			adjustedNumericValue,
			decimalsLimit,
			instance.specs.noDecimals,
			instance.specs.allowNegative
		);

		if (instance.specs.toFixed) {
			const value = parseFix(toDisplayVal, decimalsLimit);
			setDisplayValue(value);
		} else setDisplayValue(toDisplayVal);

		instance.triggerEvent();
		instance.set({ isChange: false });
		instance.triggerEvent('blur');
	};

	const onChange = event => {
		const inputDisplayValue: string = event.target.value;
		const inputNumericValue = convertDisplayToNumeric(inputDisplayValue);
		setDisplayValue(inputDisplayValue);
		instance.set({ value: inputNumericValue, isChange: true });
	};
	const cls: string = `pui-input percentage ${instance.specs.className ?? ''} ${displayValue ? 'padding-percent' : ''
		} `;
	const properties = { ...props };
	['isChange', 'isSetDefaultValue'].forEach(item => delete properties[item])
	return (
		<div className={cls}>
			<input
				className="percetange-input"
				id="percetange"
				type="text"
				{...properties}
				// onFocus={onFocus}
				onChange={onChange}
				onBlur={onBlur}
				title={instance.specs?.title}
				value={displayValue || ""}
			/>
			{instance.specs.label && (
				<label className="pui-input__label" htmlFor="percetange">
					<span className='label-content'>{instance.specs.label}</span>
				</label>
			)}
			{!!displayValue && <span className="symbol-percent">%</span>}
		</div>
	);
};

PercentageInput.defaultProps = {
	isSetDefaultValue: true,
};
