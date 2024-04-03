import type { FormulaManager } from '..';
import { EvaluationsManager } from '../helpers/evaluations';
import { EvaluatedFormula, FormulaObserver, IComplexCondition, IConditionalField } from '../types/formulas';
import { parse } from 'mathjs';

export class FormulaConditional {
	#plugin: any;
	#specs: FormulaObserver;
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

	/**
	 * FormField type
	 */
	#fields: any;

	#parent: FormulaManager;
	constructor(parent, plugin, specs) {
		this.#parent = parent;
		this.#plugin = plugin;
		this.#specs = specs;
	}

	initialize() {
		const { form } = this.#plugin;
		const fields = this.fields.map(name => form.getField(name));
		this.#fields = fields;
		const listener = () => {
			const values = fields.map(field => field.value);
			const formula = this.evaluate(values);

			// todo: Review if this section can be replaced by formulaManager.variables property.
			const { tokens } = this.#parent.getParser(formula);
			const variables = tokens.filter(token => token.type === 'variable').map(item => item.value);
			const params = this.#parent.getParams(variables);

			this.#value = parse(formula.formula).evaluate(params);

			if (this.#plugin.formulas.has(this.name)) this.#plugin.formulas.get(this.name).value = this.#value;

			const model = this.#plugin.form.getField(this.name);
			model && model.set({ value: this.#value });
		};
		fields.forEach(field => {
			if (!field) {
				throw new Error(`Field ${this.name} not found in form ${form.name}`);
			}
			field.on('change', listener);
		});
	}

	evaluate(values) {
		/**
		 The apply variable represents the  formula to be applied
		 The method will iterate over the conditions and set the last to the variable to return it
		 */
		let apply: { formula: string; name: string } | IConditionalField = { formula: this.base, name: this.name };

		if (typeof values === 'string') values = [values];
		values = values.filter(value => ![undefined, null, ''].includes(value));

		if (values.length === 0) {
			return apply;
		}

		this.conditions.forEach(item => {
			if (item.condition) {
				const { value, condition } = item as EvaluatedFormula;

				const found = !!values.find(current => {
					const result = EvaluationsManager.validate(condition, current, value);
					return result;
				});

				if (found) apply = item as IConditionalField;
			}
		});

		return apply;
	}

	calculate() {
		const values = this.#fields.map(field => field.value);
		const formula = this.evaluate(values);

		// todo: Review if this section can be replaced by formulaManager.variables property.
		const { tokens } = this.#parent.getParser(formula);
		const variables = tokens.filter(token => token.type === 'variable').map(item => item.value);
		const params = this.#parent.getParams(variables);

		this.#value = parse(formula.formula).evaluate(params);

		if (this.#plugin.formulas.has(this.name)) this.#plugin.formulas.get(this.name).value = this.#value;

		const model = this.#plugin.form.getField(this.name);
		model && model.set({ value: this.#value });
		return this.#value;
	}
}
