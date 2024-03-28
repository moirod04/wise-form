import { EvaluationsManager } from './helpers/evaluations';
import { Lexer } from './helpers/lexer';
import { Parser } from './helpers/parser';
import { Token } from './helpers/token';
import { IComplexCondition, IConditionalFormula, FormulaObserver } from './types/formulas';

export /*bundle */ class FormulaManager {
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

	#conditions = [];
	get conditions() {
		if (typeof this.#specs.formula === 'string') return;
		return this.#conditions;
	}

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
	constructor(specs) {
		this.#specs = specs;
		this.#start();
	}

	#start() {
		this.#type = this.getType();
		if (typeof this.formula !== 'string') return this.processConditional();

		const { tokens, parser } = this.getParser(this.#specs);
		this.#tokens = tokens;
		this.#parser = parser;
	}

	private getType() {
		if (typeof this.#specs.formula === 'string') return 'basic';
		const { formula } = this.#specs;
		if (formula.base && formula.conditions) return 'base-conditional';
		if (!formula.base && formula.conditions) return 'multiple-conditions';
	}
	processConditional() {
		const formula = <IComplexCondition>this.formula;
		if (this.base) {
			this.#parsedBase = this.getParser({ formula: this.base });
		}
		this.#conditions = formula.conditions;
	}

	evaluateConditions(value) {
		let apply;

		this.conditions.forEach(item => {
			if (item.condition) {
				const { values, condition } = item;
				//is a general condition
				if (condition === 'hasValue') {
					return;
				}

				if (!Array.isArray(item.values)) {
					throw new Error(
						'If the condition has a general condition value, the property values must be exists and specify a formula per value',
					);
				}

				const found = values.find(({ value: comparisonValue }) =>
					EvaluationsManager.validate(condition, value, comparisonValue),
				);

				if (found) apply = this.getParser(found);

				return;
			}
		});

		return apply;
	}

	private getParser(data) {
		const tokens = this.#lexer.tokenize(data.formula);
		const parser = new Parser(tokens);
		return { tokens, parser, ...data };
	}
	static async create(specs) {
		if (FormulaManager.instances.has(specs.name)) {
			return FormulaManager.instances.get(specs.name);
		}
		const instance = new FormulaManager(specs);
		FormulaManager.instances.set(specs.name, instance);
		return instance;
	}
}
