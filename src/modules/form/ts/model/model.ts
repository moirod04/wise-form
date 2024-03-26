import { FormField } from './field';
import { WrappedFormModel } from './wrapper';
import { BaseWiseModel } from './base';

export /*bundle*/
class FormModel extends BaseWiseModel {
	#childWrappers: number = 0;

	constructor(settings, reactiveProps?) {
		super(settings, reactiveProps);
		this.#startup(settings);
		console.log(0.2, this.settings.observers);
	}

	#startup = async settings => {
		const values = settings?.values || {};
		const createItems = item => {
			const instance = this.#getFieldModel(item, values);
			const onChange = () => (this[item.name] = instance.value);
			instance.on('change', onChange);
			this.fields.set(item.name, instance);
		};

		this.settings.fields.map(createItems);

		await this.#checkReady();
		this.#configFields();
		this.ready = true;
		this.trigger('change');
	};

	#checkReady = () => {
		const onReady = () => {
			const areAllWrappersLoaded = this.childWrappersReady === this.#childWrappers;

			if (!areAllWrappersLoaded) {
				this.childWrappersReady = this.childWrappersReady + 1;
				return;
			}

			this.loaded = true;
			this.loadedPromise.resolve(true);
			this.off('wrappers.children.loaded', onReady);
		};

		if (this.loaded) return this.loaded;

		if (!this.wrappers.size) {
			onReady();
			return this.loaded;
		}

		this.on('wrappers.children.loaded', onReady);
		return this.loadedPromise;
	};

	#configFields = () => {
		this.fields.forEach(this.#listenDependencies);
		this.fields.forEach(field => field.initialize());
	};

	/**
	 * Loop fields to check if they have dependencies and listen to them
	 *
	 * @param item
	 * @returns
	 */
	#listenDependencies = instance => {
		if (!instance?.dependentOn?.length) return;

		const checkField = item => {
			const DEFAULT = {
				type: 'change',
			};

			const dependency = this.getField(item.field);

			['field', 'callback'].forEach(prop => {
				if (!item[prop]) throw new Error(`${item?.field} is missing ${prop}`);
			});

			if (!dependency) throw new Error(`${item?.field} is not a registered field`);

			const type = item.type ?? 'change';
			const settings = { ...DEFAULT, ...item };
			if (!this.callbacks[item.callback]) {
				throw new Error(`${item.callback} is not  a registered callback ${item.name}`);
			}

			const callback = this.callbacks[item.callback];
			callback({ dependency, settings, field: instance, form: this });
		};

		instance.dependentOn.forEach(checkField);
	};

	/**
	 * Returns a new instance of a field or a wrapper
	 *
	 *
	 * @param item
	 * @param values
	 * @returns
	 */
	#getFieldModel = (item, values: Record<string, unknown>) => {
		let externalValues: Record<string, any> = {};

		// @todo: @veD-tnayrB: Review this code and document it
		if (Array.isArray(item?.properties)) {
			item?.properties.forEach(item => (externalValues[item.name] = item.value));
		}

		if (item.type === 'wrapper') return this.#getWrapper(item);
		const instance = new FormField({
			parent: this,
			specs: {
				...item,
				value: values[item.name] || item?.value,
				properties: item?.properties || [],
			},
		});

		if (item?.properties) {
			let toSet = {};
			item?.properties.forEach(property => (toSet[property] = item[property] || ''));
			instance.set(toSet);
		}

		return instance;
	};

	/**

	 * @param item 
	 * @param values 
	 * @returns 
	 */

	#getWrapper = item => {
		let instance: WrappedFormModel | FormField;
		if (!item.fields) throw new Error(`Wrapper ${item.name} must have fields property`);
		const fieldsProperties = item.fields.map(item => item.name);

		const properties = [...fieldsProperties, ...(item?.properties || [])];
		const defaultValues = item.values || {};

		instance = new WrappedFormModel({
			parent: this,
			settings: { ...item, form: this },
			specs: { properties: properties || [], ...defaultValues },
		});

		let toSet = {};
		Object.keys(instance?.getProperties()).forEach(property => (toSet[property] = item[property] || ''));
		instance.set(toSet);

		this.registerWrapper(instance);
		this.#childWrappers = this.#childWrappers + 1;

		return instance;
	};

	registerWrapper = (wrapper: WrappedFormModel) => {
		this.wrappers.set(wrapper.name, wrapper);
	};

	setField = (name: string, value) => this.fields.get(name).set({ value });

	getField(name: string) {
		if (!name) return console.warn('You need to provide a name to get a field in form ', this.settings.name);
		if (!name.includes('.')) {
			let field = this.fields.get(name);
			if (!field) {
				this.wrappers.forEach(item => {
					const foundField = item.getField(name);
					if (foundField) field = foundField;
				});
			}
			return field;
		}

		const [wrapperName, ...others] = name.split('.');
		const currentWrapper = this.wrappers.get(wrapperName);

		const otherWrapper = others.join('.');
		return currentWrapper.getField(otherWrapper);
	}

	clear = () => {
		this.fields.forEach(field => field.clear());
		this.triggerEvent();
		this.triggerEvent('clear');
	};

	static create = settings => {
		const properties = settings.fields.map(item => item.name);
		const values = settings.values || {};
		const instance = new FormModel(settings, { ...properties, ...values });

		return instance;
	};
}
