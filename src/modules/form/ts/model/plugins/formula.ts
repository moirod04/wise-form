// esta interfaz existe para poder esperar
// a que el plugin esté listo.
import { parse } from 'mathjs';
import type { FormModel } from '../model';
import { IPluginFormSpecs } from '../types/plugins';
import { FormulaManager } from '@bgroup/wise-form/formulas';
import { FormField } from '../field';
import { WiseFormPluginBase } from './base';
// pensar porque no manejarlo con eventos.
export class FormulaPlugin extends WiseFormPluginBase {
	#form: FormModel;
	#settings: IPluginFormSpecs;
	get name() {
		return 'formula';
	}

	get ready() {
		return true;
	}
	#formulas: Map<string, any> = new Map();
	get formulas() {
		return this.#formulas;
	}

	constructor(form: FormModel, settings: IPluginFormSpecs) {
		super();

		this.#form = form;
		this.#settings = settings;
	}

	async init() {
		this.#form.settings.observers.forEach(async observer => {
			const { name, formula } = observer;

			if (!formula) {
				throw new Error(`Observer in form "${this.#form.name}" must have a formula`);
			}
			if (!observer.name) {
				throw new Error(`Observer in form "${this.#form.name}" must have a name`);
			}

			const instance = await FormulaManager.create(observer);
			this.#formulas[name] = instance;
			this.processFormula(name);
		});
	}

	static async settings(model, settings): Promise<WiseFormPluginBase> {
		try {
			const instance = new FormulaPlugin(model, settings);
			await instance.init();
			return instance;
		} catch (e) {
			console.error(e);
		}
	}

	processFormula(name: string) {
		const formula = this.#formulas[name];

		const methods = {
			basic: this.validateBasic,
			'base-conditional': this.validateBaseConditional,
			'value-conditions': this.validateConditionPerValue,
		};

		if (!methods[formula.type]) {
			throw new Error(`Formula type ${formula.type} not found`);
		}

		methods[formula.type].call(this, name);
	}

	validateBasic(name) {
		const formula = this.#formulas[name];

		const fieldNames = formula.tokens
			.filter(token => token.type === 'variable')
			.map(item => {
				return item.value;
			});

		const listener = field => {
			const formulaField = this.#form.getField(formula.name);
			const params = {};
			models.forEach(field => (params[field.name] = field.value ?? 0));
			const result = parse(formula.formula).evaluate(params);

			if (formulaField) formulaField.set({ value: result });
		};
		// FieldModels
		const models: FormField[] = fieldNames.map(name => {
			return <FormField>this.#form.getField(name);
		});

		models.forEach(field => {
			if (!field) {
				throw new Error(`Field ${name} not found in form ${this.#form.name}`);
			}

			field.on('change', listener);
		});
	}

	validateBaseConditional(name) {
		const formulaManager = this.#formulas[name];
		const fields = formulaManager.fields.map(name => this.#form.getField(name));

		const listener = field => {
			const values = fields.map(field => field.value);
			const formula = formulaManager.evaluateConditions(values);
			const params = {};
			formula.tokens
				.filter(token => token.type === 'variable')
				.forEach(token => (params[token.value] = this.#form.getField(token.value).value ?? 0));
			const result = parse(formula.formula).evaluate(params);
			const formulaField = this.#form.getField(name);
			if (formulaField) formulaField.set({ value: result });
		};
		fields.forEach(field => {
			if (!field) {
				throw new Error(`Field ${name} not found in form ${this.#form.name}`);
			}

			field.on('change', listener);
		});
	}
	validateConditionPerValue(name: string) {
		const formulaManager = this.#formulas[name];
		const fields = new Set<string>();
		const mainFields = formulaManager.fields.map(name => this.#form.getField(name));

		/**
		 * The method will iterate over the conditions to get the parser for each value
		 * and get access to the fields that are part of the formula and be able to evaluate it
		 * changes.
		 */
		formulaManager.conditions.forEach(condition => {
			if (!condition.condition) {
				throw new Error('the formula per value must contain a condition property in the condition`s item');
			}
			if (!condition.values) {
				throw new Error('the formula per value must contain a values property in the condition`s item');
			}

			const parsers = condition.values.map(item => formulaManager.getParser(item));

			parsers.forEach(parser => {
				parser.tokens.filter(token => token.type === 'variable').forEach(token => fields.add(token.value));
			});
			fields.forEach(field => {});
		});
		const listener = field => {
			const formula = formulaManager.evaluateConditionPerValue(field.value);
			if (!formula) return;
			const params = {};

			formula.tokens
				.filter(token => token.type === 'variable')
				.forEach(token => (params[token.value] = this.#form.getField(token.value).value ?? 0));
			const result = parse(formula.formula).evaluate(params);
			const formulaField = this.#form.getField(name);
			if (formulaField) formulaField.set({ value: result });
		};
		const listenerSecondaries = () => mainFields.forEach(field => listener(field));

		fields.forEach(field => {
			const model = this.#form.getField(field);
			if (model) model.on('change', listenerSecondaries);
		});
		mainFields.forEach(item => item.on('change', listener));
	}
}
