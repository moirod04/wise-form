import type { FormulaManager } from '..';
import { EvaluationsManager } from '../helpers/evaluations';
import { EvaluatedFormula, FormulaObserver, IComplexCondition, IConditionalField } from '../types/formulas';
import { parse } from 'mathjs';

export class FormulaConditional {
	#plugin: any;
	#specs: FormulaObserver;
	#emptyValue: undefined;
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

	/**
	 * FormField type
	 */
	#fields: any;

	#parent: FormulaManager;

	#round: boolean
	constructor(parent, plugin, specs) {
		this.#parent = parent;
		this.#plugin = plugin;
		this.#specs = specs;
		this.#round = specs.round
	}

	initialize() {
		try {
			const { form } = this.#plugin;

			if (!this.fields) {
				throw new Error(`Fields not found in formula ${this.name}`);
			}
			const fields = this.fields.map(name => form.getField(name));
			this.#fields = fields;

			fields.forEach(field => {
				if (!field) {
					throw new Error(`Field ${this.name} not found in form ${form.name}`);
				}
				field.on('change', this.calculate.bind(this));
			});
		} catch (e) { }
	}

	evaluate() {

		const formula = <IComplexCondition>this.#specs.formula;
		let evaluatedFormula = { formula: formula.base }; // Utiliza la fórmula base por defecto
		if (formula.conditions && formula.conditions.length > 0) {
			for (const condition of formula.conditions) {
				//	 Recopila los valores de los campos especificados en esta condición
				const fieldValues = condition.fields.map(fieldName => {
					const field = this.#fields.find(f => f.name === fieldName);
					return field ? field.value : this.#emptyValue;
				});

				const conditionMet = EvaluationsManager.validateAny(condition.condition, fieldValues);

				if (conditionMet) {
					evaluatedFormula = { formula: condition.formula };
					break; // Si se cumple una condición, no es necesario evaluar las restantes
				}
			}
		}

		return evaluatedFormula;
	}

	calculate() {

		/**
		 * the formula is taken from the evaluate method since the conditions are evaluated there and
		 * can change the formula to be applied
		 */
		const formula = this.evaluate();
		// todo: Review if this section can be replaced by formulaManager.variables property.
		const { tokens } = this.#parent.getParser(formula);
		const variables = tokens.filter(token => token.type === 'variable').map(item => item.value);
		const params = this.#parent.getParams(variables);
		try {
			const keys = Object.keys(params);
			let result = keys.length === 1 ? params[keys[0]] : parse(formula.formula as string).evaluate(params);
			const isInvalidResult = [-Infinity, Infinity, undefined, null, NaN].includes(result)
			if (this.#round && !isInvalidResult) result = Math.round(result)

			this.#value = isInvalidResult || typeof result === "object" ? this.#emptyValue : Number(result.toFixed(2));

			this.#parent.trigger('change');

			const model = this.#plugin.form.getField(this.name);
			model && model.set({ value: this.#value });
			return this.#value;
		} catch (e) {
			console.log('formula', this.name, formula.formula, params);
			console.error(e);
			throw new Error('Error calculating the formula');
		}
	}
}
