import React from 'react';

function formatNumber(number: number): string {
	// Convert the number to a string and split into integer and decimal parts
	const [integerPart, decimalPart] = number.toString().split('.');

	// Format the integer part with dots every three digits
	const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

	// Combine the formatted integer part and the decimal part (if it exists)
	const formattedNumber = decimalPart ? `${formattedIntegerPart},${decimalPart}` : formattedIntegerPart;

	return formattedNumber;
}
export const useTotal = (ref, totalInput, form) => {
	React.useEffect(() => {
		if (!ref.current) return;
		const getTotal = () => {
			let totalSum = 0;
			Object.keys(values).forEach(key => {
				const formattedValue = values[key].replace(/\./g, '').replace(/,/g, '.');
				const numericValue = parseFloat(formattedValue);
				if (!isNaN(numericValue)) totalSum += numericValue;
			});
			const finalTotal = formatNumber(totalSum);

			const field = totalInput;
			field.set({ value: parseFloat(finalTotal) });
		};

		totalInput.set({ value: 0 });
		const inputs = ref.current.querySelectorAll('input');
		const values = {};
		const inputsNames = [];
		inputs.forEach(input => {
			values[input.name] = input.value;
			inputsNames.push(input.name);
		});

		getTotal();

		const onChange = field => {
			const { name } = field;
			const currentItem = [...inputs].find(item => item.name === name);
			values[name] = currentItem.value;
			getTotal();
		};

		inputsNames.forEach(name => {
			const item = form.getField(name);
			item.on('blur', () => onChange(item));
		});

		return () => {
			inputsNames.forEach(name => {
				const item = form.fields.get(name);
				item.off('change', () => onChange(item));
				item.off('blur', () => onChange(item));
			});
		};
	}, [ref?.current]);
};
