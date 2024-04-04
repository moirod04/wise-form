import { parse } from 'mathjs';
import { EvaluationsManager } from './helpers/evaluations';
import { ReactiveModel } from '@beyond-js/reactive/model';
import { Lexer } from './helpers/lexer';
import { Parser } from './helpers/parser';
import { Token } from './helpers/token';
import { IComplexCondition, IConditionalFormula, FormulaObserver, IFormulaType } from './types/formulas';
import { FormulaBasic } from './variants/basic';
import { FormulaConditional } from './variants/conditional';
import { FormulaPerValue } from './variants/per-value';
import { FormulaComparison } from './variants/comparison';
type ParserData = {
	parser: Parser;
	tokens: Token[];
	[key: string]: any;
};
export /*bundle */ class FormulaManager extends ReactiveModel<FormulaManager> {
	private static instances: Map<string, any> = new Map();
	#lexer = new Lexer();

	#tokens: Token[];
	get tokens() {
		return this.#tokens;
	}
	#parser: Parser;
	get parser() {
		return this.#parser;
	}

	#specs: FormulaObserver;
	get formula() {
		return this.#specs.formula;
	}
	get name() {
		return this.#specs.name;
	}

	get conditional() {
		return typeof this.#specs.formula === 'object';
	}

	get conditions() {
		if (typeof this.#specs.formula === 'string') return;
		const formula = this.#specs.formula as IComplexCondition;
		return formula.conditions;
	}

	/**
	 *  Represents the fields defined in the plugin settings
	 */
	get fields() {
		const formula = <IComplexCondition>this.formula;
		return typeof formula?.fields === 'string' ? [formula?.fields] : formula?.fields;
	}

	#parsedBase;
	get parsedBase() {
		return this.#parsedBase;
	}
	#type: string;
	get type() {
		return this.#type;
	}

	get base() {
		const formula = <IComplexCondition>this.#specs.formula;
		return formula.base;
	}

	#variables: string[] = [];
	get variables() {
		return this.#variables;
	}

	#value: string | number | undefined | 0;
	get value() {
		if (!this.#value) return this.calculate();
		return this.#value;
	}

	set value(v) {
		if (v === this.#value) return;
		this.#value = v;
		this.trigger('change');
	}

	#parsers: Map<string, ParserData> = new Map();
	#plugin: any;
	#instance: any;
	constructor(plugin, specs) {
		super();
		this.#plugin = plugin;
		this.#specs = specs;
		this.#initialize();
	}

	#initialize() {
		this.#type = this.getType();

		const objects = {
			basic: FormulaBasic,
			'base-conditional': FormulaConditional,
			'value-conditions': FormulaPerValue,
			comparison: FormulaComparison,
		};

		if (!objects[this.type]) {
			throw new Error(`this type ${this.type} not found`);
		}

		this.#instance = new objects[this.type](this, this.#plugin, this.#specs);
	}
	set({ value }) {
		this.#value = value;
	}

	initialize() {
		this.#instance.initialize();
	}
	getModels(variables) {
		return variables.map(name => {
			if (this.#plugin.formulas.has(name)) return this.#plugin.formulas.get(name);
			return this.#plugin.form.getField(name);
		});
	}

	private getType(): IFormulaType {
		const { type, formula } = this.#specs;
		if (type) return type;
		if (typeof formula === 'string') return 'basic';
		if (formula.conditions) return formula.base ? 'base-conditional' : 'value-conditions';
	}

	processConditional() {
		const formula = <IComplexCondition>this.formula;
		if (this.base) {
			this.#parsedBase = this.getParser({ formula: this.base });
		}
	}
	calculate() {
		if (this.#instance && this.#instance.calculate) this.#instance.calculate();
		const formula = this.getParser({ formula: this.formula });
		const variables = formula.tokens.filter(token => token.type === 'variable').map(item => item.value);
		const params = this.getParams(variables);
		const models = this.getModels(variables);
		const result = parse(this.formula as string).evaluate(params);
		return result;
	}

	/**
	 * Returns the parser for the formula, if the parser is already created it will return the memoized parser
	 *
	 * The formula is tokenized and parsed to create a parser instance
	 * the object returned contains the tokens, the parser and the formula
	 * @param data Receives the formula to be parsed
	 * @returns
	 */
	getParser(data): ParserData {
		if (!data.formula) throw new Error('To get a parser you must provide a formula');
		if (this.#parsers.has(data.formula)) return this.#parsers.get(data.formula);
		const tokens = this.#lexer.tokenize(data.formula);
		const parser = new Parser(tokens);
		const result = { tokens, parser, ...data };
		this.#parsers.set(data.formula, result);
		return result;
	}

	getParams(variables: string[]) {
		const params = {};
		const { form, formulas } = this.#plugin;
		const build = value => {
			/**
			 * the value could be a formula or a field
			 */
			const element = formulas.has(value) ? formulas.get(value) : form.getField(value);
			if (!element)
				throw new Error(`Field ${value} used in formula ${this.name}, not found in form ${form.name}, `);

			params[value] = element.value ?? 0;
		};
		variables.forEach(build);

		return params;
	}

	/**
	 * A form can have multiple formulas, this method will create an instance of the formula manager
	 * and memoize it to avoid creating multiple instances of the same formula.
	 * @param specs
	 * @returns
	 */
	static async create(plugin, specs) {
		if (FormulaManager.instances.has(specs.name)) {
			return FormulaManager.instances.get(specs.name);
		}

		const instance = new FormulaManager(plugin, specs);
		FormulaManager.instances.set(specs.name, instance);
		return instance;
	}
}
