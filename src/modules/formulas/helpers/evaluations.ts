export class EvaluationsManager {
	private static evaluations: Record<string, (value: any, comparisonValue?: any) => boolean> = {
		equal: (value, comparisonValue) => value == comparisonValue,
		lower: (value, comparisonValue) => Number(value) < Number(comparisonValue),
		upper: (value, comparisonValue) => Number(value) > Number(comparisonValue),
		between: (value, [min, max]) => {
			const numValue = Number(value);
			return numValue >= Number(min) && numValue <= Number(max);
		},
		different: (value, comparisonValue) => value != comparisonValue,
		hasValue: value => value !== null && value !== undefined && value !== '',
		lessOrEqual: (value, comparisonValue) => Number(value) <= Number(comparisonValue),
		greaterOrEqual: (value, comparisonValue) => Number(value) >= Number(comparisonValue),
	};

	static validate(identifier: string, value: any, comparisonValue?: any): boolean {
		if (!this.evaluations[identifier]) {
			throw new Error(`Evaluation identifier "${identifier}" not recognized.`);
		}

		const result = this.evaluations[identifier](value, comparisonValue);
		return result;
	}
}
