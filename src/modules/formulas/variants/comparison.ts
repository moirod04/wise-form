import type { FormulaManager } from '..';

import { Token } from '../helpers/token';
import { FormulaObserver, IComplexCondition, IConditionalField } from '../types/formulas';
import { number, parse } from 'mathjs';

export class FormulaComparison {
	#plugin: any;
	#specs: FormulaObserver;
	#tokens: Token[];
	get formula() {
		return this.#specs.formula;
	}
	get base() {
		const formula = <IComplexCondition>this.#specs.formula;
		return formula.base;
	}
	#value: string | number | undefined | 0;
	get value() {
		return this.calculate();
	}
	get name() {
		return this.#specs.name;
	}
	/**
	 *  Represents the fields defined in the plugin settings
	 */
	get fields() {
		const formula = <IComplexCondition>this.formula;
		return typeof formula?.fields === 'string' ? [formula?.fields] : formula?.fields;
	}

	get conditions() {
		if (typeof this.#specs.formula === 'string') return;
		const formula = this.#specs.formula as IComplexCondition;
		return formula.conditions;
	}

	#variables: string[] = [];
	get variables() {
		return this.#variables;
	}

	#parent: FormulaManager;
	constructor(parent, plugin, specs) {
		this.#parent = parent;
		this.#plugin = plugin;
		this.#specs = specs;
		this.initialize();
	}

	initialize() {
		if (!Array.isArray(this.#specs.fields)) {
			throw new Error('The fields property must be an array');
		}

		const models = this.#parent.getModels(this.#specs.fields);
		models.forEach(model => model.on('change', this.calculate.bind(this)));
	}

	evaluate(values) {}

	calculate() {
		const models = this.#parent.getModels(this.#specs.fields);
		const condition = this.#specs.formula.condition;

		let result = 0;
		console.log(99, models);
		switch (condition) {
			case 'upper':
				result = this.calculateUpper(models);
				break;
		}
		// this.#specs.conditions[result.name]
	}

	calculateUpper(models) {
		let glue;
		models.forEach(item => {
			if (Number(item.value) > Number(glue?.value)) glue = item;
		});
		return glue;
	}
}
