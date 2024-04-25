export const parseFix = (value: string, decimalsLimit: number): string => {
	if (!value) return value;

	const valueParts = value.toString().split(',');
	const currentDecimals = valueParts.length > 1 ? valueParts[1].length : 0;
	const ints = valueParts[0];
	const currentDecimalsVal = valueParts[1] || '';

	// Si ya tiene el número correcto de decimales, retornar el valor original
	if (currentDecimals === decimalsLimit) return value;

	// Calcular los decimales faltantes
	const missingDecimals = decimalsLimit - currentDecimals;
	const paddedValueString = `${ints},${currentDecimalsVal + '0'.repeat(missingDecimals)}`;

	// Convertir de nuevo a número. Nota: Esto es más para fines de consistencia,
	// ya que agregar ceros a la derecha no cambia el valor.
	return paddedValueString;
};
