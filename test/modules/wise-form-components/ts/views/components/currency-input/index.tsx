import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import React, { useState } from 'react';
import { parseFix } from './fixed-number';
import { formatToDisplay } from './format-to-display';
import { useWiseFormContext } from '@bgroup/wise-form/form';

export /*bundle*/ const CurrencyInput = props => {
	const { model } = useWiseFormContext();
	const instance = model.getField(props.name);
	let {
		decimalsLimit,
		noDecimals,
		roundUp,
		toFixed,
		label,
		isSetDefaultValue,
		removeValueWhenFocus,
		dependentOn,
		allowNegative,
		...properties
	} = instance.specs;
	decimalsLimit = decimalsLimit === undefined ? 2 : decimalsLimit;

	const value = formatToDisplay(instance.value, decimalsLimit, noDecimals, allowNegative);

	const [displayValue, setDisplayValue] = useState<string>(value);
	const [defaultValue] = React.useState(value);

	const onReset = () => {
		const valuePrev = instance?.value || instance === 0 ? instance?.value : defaultValue;

		const value = formatToDisplay(valuePrev, decimalsLimit, noDecimals, allowNegative);
		setDisplayValue(value);
	};
	//useBinder([instance], onBinder, ['change']);
	useBinder([model], onReset, ['reset']);
	useBinder([instance], () => {
		let value = instance.value ?? '';
		if (roundUp) {
			value = value ? Math.round(parseFloat(value?.toString())) : value;
			instance.value = value;
		}
		setDisplayValue(formatToDisplay(value, decimalsLimit, noDecimals, allowNegative));
	});

	const convertDisplayToNumeric = display => {
		if (!display) return '';
		const numeric = display.replace(/\./g, '').replace(',', '.');
		return parseFloat(numeric);
	};

	const onBlur = () => {
		// if (!displayValue) {

		// 	setDisplayValue(defaultValue);
		// 	instance.set({ value: convertDisplayToNumeric(defaultValue) });
		// 	instance.triggerEvent('blur');
		// 	instance.triggerEvent();
		// 	return;
		// }
		let adjustedNumericValue = instance.value;

		if (
			(adjustedNumericValue || adjustedNumericValue === 0) &&
			!isNaN(Number(adjustedNumericValue)) &&
			Number(adjustedNumericValue) <= 0 &&
			!!instance.specs.notZero
		) {
			instance.set({ value: '' });
			setDisplayValue('');
			instance.triggerEvent('blur');

			return;
		}

		if (roundUp) {
			adjustedNumericValue = Math.round(parseFloat(adjustedNumericValue?.toString()));
			setDisplayValue(formatToDisplay(adjustedNumericValue, decimalsLimit, noDecimals, allowNegative));
			instance.set({ value: adjustedNumericValue });
		}

		if (toFixed) {
			const value = parseFix(displayValue, decimalsLimit);
			setDisplayValue(value);
			instance.set({ value: adjustedNumericValue });
		}

		instance.triggerEvent();
		instance.triggerEvent('blur');
	};

	const onFocus = () => {
		if (defaultValue != displayValue || !removeValueWhenFocus) return;
		setDisplayValue('');
	};

	const onChange = event => {
		const inputDisplayValue: string = event.target.value;

		const value = convertDisplayToNumeric(inputDisplayValue);
		const toDisplay = formatToDisplay(inputDisplayValue, decimalsLimit, noDecimals, allowNegative);
		setDisplayValue(toDisplay);

		instance.value = value;
	};
	delete properties.notZero;
	return (
		<div className={`pui-input currency ${instance.className}`}>
			<input
				className="currency-input"
				id="currency"
				type="text"
				{...properties}
				onBlur={onBlur}
				onFocus={onFocus}
				onChange={onChange}
				title={instance.specs?.title}
				disabled={instance.disabled}
				value={displayValue ?? ''}
			/>
			{label && (
				<label className="pui-input__label" htmlFor="currency">
					<span className="label-content">{label}</span>
				</label>
			)}
		</div>
	);
};
