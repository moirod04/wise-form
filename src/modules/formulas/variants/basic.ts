import type { FormulaManager } from '..';
import { EvaluationsManager } from '../helpers/evaluations';
import { Token } from '../helpers/token';
import { EvaluatedFormula, FormulaObserver, IComplexCondition, IConditionalField } from '../types/formulas';
import { parse } from 'mathjs';

export class FormulaBasic {
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

	#emptyValue: undefined;
	#emptyValue: undefined;
	#variables: string[] = [];
	get variables() {
		return this.#variables;
	}

	#parent: FormulaManager;
	constructor(parent, plugin, specs) {
		this.#parent = parent;
		this.#plugin = plugin;
		this.#specs = specs;
		if (this.#specs.emptyValue) this.#emptyValue = this.#specs.emptyValue;
		if (this.#specs.emptyValue) this.#emptyValue = this.#specs.emptyValue;
	}

	initialize() {
		const { tokens } = this.#parent.getParser(this.#specs);
		this.#tokens = tokens;
		const variables = this.#tokens.filter(token => token.type === 'variable').map(item => item.value);
		this.#variables = variables;
		const models = this.#parent.getModels(variables);
		models.forEach(model => {
			console.log(0.2, this.name);
			if ([undefined].includes(model)) {
				return;
			}
			if (typeof model?.on !== 'function') console.log('model', model, model.on);

			model.on('change', this.calculate.bind(this));
		});
	}

	calculate() {
		console.log(0.3, 'calculamos');
		const variables = this.#variables;
		const formulaField = this.#plugin.form.getField(this.name);
		let params = this.#parent.getParams(variables);
		const models = this.#parent.getModels(variables);

		const empty = (models as any[]).every(model => [null, undefined, ''].includes(model.value));
		if (empty) {
			// If all models are empty, set the input to empty if exists.
			if (formulaField) formulaField.set({ value: '' });
			this.#value = undefined;
			return;
		}

		try {
			const result = models.length === 1 ? models[0].value : parse(this.formula as string).evaluate(params);
			this.#value = [-Infinity, Infinity, undefined, null, NaN].includes(result) ? this.#emptyValue : result;
			if (formulaField) formulaField.set({ value: result });
			this.#parent.trigger('change');
		} catch (e) {
			console.log('formula', this.name, this.formula, params);
			console.trace(e);
			throw new Error(`Error calculating the formula: ${e.message}`);
		}
	}
}
