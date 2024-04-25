export const formatToDisplay = (input, isPercent) => {
	if (!input && input !== 0) return input as string;
	input = typeof input === "string" && input.includes(",") ? input.replaceAll(",", '.') : input
	let formattedInput: string | any = Number(input);
	formattedInput = formattedInput.toLocaleString('es-ES', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})
	return `${formattedInput}${isPercent ? '%' : ''}`;
};
