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
	get form() {
		return this.#form;
	}
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

	#value: string | number = 0;
	get value() {
		return this.#value;
	}

	set value(v) {
		if (v === this.#value) return;
		this.#value = v;
	}

	constructor(form: FormModel, settings: IPluginFormSpecs) {
		super();
		this.#form = form;
		this.#settings = settings;
	}

	async init() {
		if (!this.#form.settings?.observers) return;
		const promises = this.#form.settings.observers.map(this.create.bind(this));
		Promise.all(promises);
		this.#formulas.forEach(formula => formula.initialize());
	}

	async create(observer) {
		const { name, formula } = observer;

		if (!formula) {
			throw new Error(`Observer in form "${this.#form.name}" must have a formula`);
		}
		if (!observer.name) {
			throw new Error(`Observer in form "${this.#form.name}" must have a name`);
		}

		const instance = await FormulaManager.create(this, observer);
		this.#formulas.set(name, instance);
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
}
