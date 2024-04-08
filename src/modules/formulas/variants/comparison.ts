import type { FormulaManager } from '..';

import { Token } from '../helpers/token';
import { FormulaObserver, IComplexCondition, IConditionalField } from '../types/formulas';
import { number, parse } from 'mathjs';

export class FormulaComparison {
	#plugin: any;
	#specs: FormulaObserver;
	#emptyValue: undefined;
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
		return this.#value;
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
	}

	initialize() {
		if (!Array.isArray(this.#specs.fields)) {
			throw new Error('The fields property must be an array');
		}
		const models = this.#parent.getModels(this.#specs.fields);
		models.forEach(model => model.on('change', this.calculate.bind(this)));
	}

	start() {}

	evaluate() {
		const models = this.#parent.getModels(this.#specs.fields);
		const condition = this.#specs.formula.condition;
		let applied;
		switch (condition) {
			case 'upper':
				applied = this.calculateUpper(models);
				break;
		}

		return applied;
	}

	calculate() {
		let applied = this.evaluate();
		if (!applied) {
			// any formula apply, so we need to reset the value
			this.#value = 0;
			return;
		}
		/**
		 * Get the formula analyzer
		 */

		const formulaString = this.#specs.formula.conditions[applied.name];
		const formula = this.#parent.getParser({ formula: formulaString });
		const variables = formula.tokens.filter(token => token.type === 'variable').map(item => item.value);
		const params = this.#parent.getParams(variables);

		try {
			const keys = Object.keys(params);
			const result = keys.length === 1 ? params[keys[0]] : parse(this.formula as string).evaluate(params);
			this.#value = [-Infinity, Infinity, undefined, null, NaN].includes(result) ? this.#emptyValue : result;
			this.#parent.trigger('change');
			return this.#value;
		} catch (e) {
			console.log('formula', this.name, this.formula, params);
			throw new Error('Error calculating the formula');
		}
	}

	calculateUpper(models) {
		let glue;
		models.forEach(item => {
			if (Number(item.value) > Number(glue?.value ?? 0)) glue = item;
		});

		return glue;
	}
}
