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
		const { tokens } = this.#parent.getParser(this.#specs);
		this.#tokens = tokens;
		const variables = tokens.filter(token => token.type === 'variable').map(item => item.value);
		this.#variables = variables;
		const models = this.#parent.getModels(variables);
		models.forEach(model => model.on('change', this.calculate.bind(this)));
	}

	evaluate(values) {}

	calculate() {
		const variables = this.#variables;
		const formulaField = this.#plugin.form.getField(this.name);
		const params = this.#parent.getParams(variables);
		const models = this.#parent.getModels(variables);
		models.forEach(field => (params[field.name] = field.value ?? 0));

		const result = parse(this.formula as string).evaluate(params);

		if (formulaField) formulaField.set({ value: result });
	}
}
