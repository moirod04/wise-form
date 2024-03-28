import { parse } from 'mathjs';
import { ReactiveModel } from '@beyond-js/reactive/model';
import type { FormModel } from '../model';
import { FormulaManager } from '@bgroup/wise-form/formulas';
import type { FormField } from '../field';
export class PluginsManager extends ReactiveModel<PluginsManager> {
	#plugins: Record<string, any> = {};

	#formulas: Map<string, any> = new Map();
	get formulas() {
		return this.#formulas;
	}
	private static instances: Map<string, any> = new Map();

	setPlugins(specs) {
		this.#plugins = { ...this.#plugins, ...specs };
	}

	static formulas: Record<string, any> = {};
	#model: FormModel;
	constructor(model) {
		super();
		this.#model = model;
		globalThis.f = model;
		this.start();
	}

	private start() {
		this.#model.settings.observers.forEach(async observer => {
			const { name, formula } = observer;

			if (!formula) {
				throw new Error(`Observer in form "${this.#model.name}" must have a formula`);
			}
			if (!observer.name) {
				throw new Error(`Observer in form "${this.#model.name}" must have a name`);
			}

			const instance = await FormulaManager.create(observer);
			this.#formulas[name] = instance;

			this.processFormula(name);
		});
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
			const formulaField = this.#model.getField(formula.name);
			const params = {};
			models.forEach(field => (params[field.name] = field.value ?? 0));
			const result = parse(formula.formula).evaluate(params);

			if (formulaField) formulaField.set({ value: result });
		};
		// FieldModels
		const models: FormField[] = fieldNames.map(name => {
			return <FormField>this.#model.getField(name);
		});

		models.forEach(field => {
			if (!field) {
				throw new Error(`Field ${name} not found in form ${this.#model.name}`);
			}

			field.on('change', listener);
		});
	}

	validateBaseConditional(name) {
		const formulaManager = this.#formulas[name];

		const fields = formulaManager.fields.map(name => this.#model.getField(name));

		if (formulaManager.base && formulaManager.fields) {
			console.log('formulaManager base con condicion general');
		}

		const listener = field => {
			const values = fields.map(field => field.value);
			const formula = formulaManager.evaluateConditions(values);
			const params = {};
			formula.tokens
				.filter(token => token.type === 'variable')
				.forEach(token => (params[token.value] = this.#model.getField(token.value).value));
			const result = parse(formula.formula).evaluate(params);
			const formulaField = this.#model.getField(name);
			if (formulaField) formulaField.set({ value: result });
		};
		fields.forEach(field => {
			if (!field) {
				throw new Error(`Field ${name} not found in form ${this.#model.name}`);
			}

			field.on('change', listener);
		});
	}
	validateConditionPerValue(name: string) {
		const formulaManager = this.#formulas[name];

		const fields = formulaManager.fields.map(name => this.#model.getField(name));
		const listener = field => {
			const result = formulaManager.evaluateConditionPerValue(field.value);
		};

		fields.forEach(item => item.on('change', listener));
	}
	static validate(form: FormModel) {
		if (!form.settings.observers) return;

		const instance = PluginsManager.instances.get(form.name) ?? new PluginsManager(form);
		globalThis.a = instance;
		if (!PluginsManager.instances.has(form.name)) {
			PluginsManager.instances.set(form.name, instance);
		}
	}
}
