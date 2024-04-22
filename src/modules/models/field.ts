import { ReactiveModel } from '@beyond-js/reactive/model';
import type { WrappedFormModel } from './wrapper';
import type { FormModel } from './model';
import { IFormField, IFormFieldProps } from './types/form-field';
import { IDisabled } from './types/disabled';

/**
 * Represents a single form field within a `FormModel` or `WrappedFormModel`, providing mechanisms for data binding, validation, and interaction.
 * This class extends `ReactiveModel` to enable reactive updates and interactions within the form's lifecycle.
 *
 * @extends ReactiveModel<IFormField>
 */
export class FormField extends ReactiveModel<IFormField> {
	// The parent model, either FormModel or WrappedFormModel, containing this field.
	#parent: WrappedFormModel | FormModel;

	// Can be a boolean or an object specifying dynamic disablingvas logic based on other fields' values.
	#disabled: boolean | IDisabled = false;

	/**
	 * Evaluates and returns the disabled state of the field. If `#disabled` is an object, it checks the specified fields' values to determine the disabled state dynamically.
	 * @returns {boolean} The disabled state of the field.
	 */
	get disabled() {
		if (typeof this.#disabled !== 'object' || !this.#disabled?.fields) return this.#disabled;

		const validate = field => {
			if (typeof field !== 'object') return !this.#parent.form.getField(field).value;
			const { name, value } = field;
			const { value: fieldValue } = this.#parent.getField(name);
			return value !== fieldValue;
		};

		return this.#disabled.fields.some(validate);
	}

	set disabled(value) {
		if (value === this.#disabled) return;
		this.#disabled = value;
		this.triggerEvent();
	}

	// Field specifications including its type, validation rules, and other metadata.
	#specs: Record<string, any>;
	get specs() {
		return this.#specs;
	}

	get attributes() {
		const props = this.getProperties();
		return {
			...props,
			disabled: this.disabled,
		};
	}

	// Tracks other fields this field listens to for changes, enabling reactive behavior and allowing the cleanup of event listeners.
	#listeningItems = new Map();

	/**
	 * Constructs a FormField instance with specified properties and parent form model.
	 * @param {Object} params - Construction parameters including the parent form model and field specifications.
	 */
	constructor({ parent, specs }: { parent; specs: IFormFieldProps }) {
		let { properties, ...props } = specs;

		super({
			...props,
			properties: [
				'name',
				'type',
				'placeholder',
				'required',
				'label',
				'variant',
				'value',
				'options',
				'className',
				'checked',
				'id',
				'icon',
				...properties,
			],
		});
		function generarNumeroAleatorio() {
			return Math.floor(Math.random() * (1000000 - 10000 + 1)) + 10000;
		}

		this.__instanceID = `${specs.name}.${generarNumeroAleatorio()}`;

		this.#specs = specs;
		this.#parent = parent;
		this.__instance = Math.random();

		const toSet: Record<string, any> = {};
		Object.keys(props).forEach(key => {
			if (key === 'properties') return;

			if (typeof props[key] === 'string' && props[key]?.includes('state:')) {
				const state = props[key].split('state:')[1];
				if (state === 'create' && !this.#parent.form.update) {
					props[key] = true;
				}
			}
			toSet[key] = props[key];
		});
		this.set(toSet);
	}

	/**
	 * Performs initial setup based on the field's specifications, setting up validation, default values, and any specified dynamic behavior.
	 */
	initialize = () => {
		this.checkSettings(this.#specs);
	};

	/**
	 * Resets the field to its initial value and state, including resetting the disabled state if it's statically defined.
	 */
	clear = () => {
		const initValues = this.initialValues();
		this.set(initValues);
		if (initValues.hasOwnProperty('disabled')) this.disabled = initValues.disabled;
		this.triggerEvent('clear');
	};

	/**
	 * Listens to changes in sibling fields (specified in dynamic disabling logic) and updates its state accordingly.
	 */
	#listenSiblings = () => {
		this.triggerEvent('change');
	};

	/**
	 * Checks and applies the field's settings, particularly for dynamic disabling, establishing listeners on related fields as necessary.
	 * @param {Object} props - The field's properties and settings to check and apply.
	 */
	checkSettings(props) {
		if (props.hasOwnProperty('disabled')) {
			if (typeof props.disabled === 'boolean') {
				this.#disabled = props.disabled;
				return;
			}

			if (typeof props.disabled !== 'object') {
				throw new Error(`The disabled property of the field ${props.name} must be a boolean or an object`);
			}
			if (!props.disabled.fields && !props.disabled.mode) {
				throw new Error(
					`The disabled property of the field ${props.name} must have a fields property or a mode defined`
				);
			}

			if (props.disabled.mode) {
				// posible modes : create, update;
				this.#disabled = this.#parent.form.mode === props.disabled.mode;
				return;
			}

			let allValid;
			props.disabled.fields.forEach(item => {
				const name = typeof item === 'string' ? item : item.name;

				const instance = this.#parent.form.getField(name);
				allValid = instance;
				if (!allValid) return;
				instance.on('change', this.#listenSiblings);
				this.#listeningItems.set(name, { item: instance, listener: this.#listenSiblings });
			});

			if (!allValid) {
				throw new Error(
					`the field ${allValid} does not exist in the form ${this.#parent.name
					}, field passed in invalid settings of field "${this.name}"`
				);
			}

			this.#disabled = props.disabled;
		}
	}

	/**
	 * Cleans up any established listeners and internal state when the field is removed or the form is reset, ensuring no memory leaks or stale data.
	 */
	cleanUp() {
		this.#listeningItems.forEach(({ item, listener }) => item.off('change', listener));
		// todo: remove all events
	}

	/**
	 * The `set` method sets one or more properties on the model.
	 *
	 *
	 * This method overwrites the original reactiveModel set to pass the object as param
	 * when the change event is fired.
	 * Eventually this method will be removed and the original set method will be used, but
	 * it requires an upgrade in the reactive model package.
	 * @param {keyof ReactiveModelPublic<T>} property - The name of the property to set.
	 * @param {*} value - The value to set the property to.
	 * @returns {void}
	 */
	set(properties): void {
		let updated = false;
		try {
			Object.keys(properties).forEach(prop => {
				if (!this.properties || !this.properties.includes(prop)) return;
				const sameObject =
					typeof properties[prop] === 'object' &&
					JSON.stringify(properties[prop]) === JSON.stringify(this[prop]);

				if (this[prop] === properties[prop] || sameObject) return;
				const descriptor = Object.getOwnPropertyDescriptor(this, prop);
				if (descriptor?.set) return;

				this[prop] = properties[prop];
				updated = true;
			});
		} catch (e) {
			throw new Error(`Error setting properties: ${e}`);
		} finally {
			if (updated) this.trigger('change', this);
		}
	}
}
