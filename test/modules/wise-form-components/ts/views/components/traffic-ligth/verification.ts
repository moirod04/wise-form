import { IParams, IProcessAndCondition, IValidate } from './types';

export class VerificationCondition {
	private readonly parameter: number | string;
	private readonly red: string;
	private readonly yellow: string;
	private readonly green: string;
	private readonly value: number | string;
	private traffic: string = 'grey';
	private defaultColor: string = 'grey';

	constructor({ parameter, red, yellow, green, value, traffic }: IParams) {
		this.parameter = parameter;
		this.red = this.processString(red);
		this.yellow = this.processString(yellow);
		this.green = this.processString(green);
		this.value = value;
		this.traffic = traffic ?? this.defaultColor;
		this.defaultColor = traffic ?? this.defaultColor
	}

	private processString(inputString: string) {
		const withoutPercentage = inputString.replaceAll(/%/g, '');
		const processedString = withoutPercentage.replaceAll(/y/g, '&&');
		return processedString;
	}

	private processAndCondition({ string, value }: IProcessAndCondition) {
		const regex = new RegExp(/&&/g);
		if (!string.match(regex)) return string;
		return string.replaceAll(regex, `&& ${value}`);
	}

	private validate({ color }: IValidate): void {
		try {
			if ((!this.value && this.value !== 0) || (!this.parameter && this.parameter !== 0)) {
				this.traffic = this.defaultColor;
				return
			};
			const subtraction = Number(this.value) - Number(this.parameter);
			const operation = `${subtraction} ${this.processAndCondition({ string: this[color], value: subtraction })}`;
			if (eval(operation)) this.traffic = color;
		} catch (error) {
			this.traffic = this.defaultColor;
		}

	}

	verify(): string {
		this.validate({ color: 'red' });
		this.validate({ color: 'yellow' });
		this.validate({ color: 'green' });
		return this.traffic ?? this.defaultColor;
	}
}

// Ejemplo de uso
// const condiciones = new VerificationCondition({
//     parameter: 33,
//     red: '<= -2%',
//     yellow: '< 0 y > - 2%',
//     green: '>= 0%',
//     value: 27,
// });
// const resultado = condiciones.verify();
