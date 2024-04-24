export const formatToDisplay = (input: string | number, decimalsLimit: number, noDecimals: boolean, allowNegative?) => {
	if (!input && input !== 0) return input as string;
	if (input === '-') return '-';
	const isAllowNegative = !!allowNegative && input?.toString()?.startsWith('-');
	let number = Number(input);
	let formattedInput =
		typeof input === 'number' && !noDecimals
			? number.toLocaleString('es-ES', {
					minimumFractionDigits: decimalsLimit,
					maximumFractionDigits: decimalsLimit,
			  })
			: input;
	formattedInput = typeof formattedInput === 'string' ? formattedInput : formattedInput.toString();
	let numbersAndCommaOnly = formattedInput.replace(/[^\d,]/g, '');
	let [integerPart, decimalPart] = numbersAndCommaOnly.split(',', 2);
	integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

	const decimals = decimalsLimit && decimalPart ? decimalPart.substring(0, decimalsLimit) : decimalPart;
	formattedInput =
		decimalPart !== undefined && !noDecimals
			? `${isAllowNegative ? '-' : ''}${integerPart},${decimals}`
			: `${isAllowNegative ? '-' : ''}${integerPart}`;

	return formattedInput;
};
