import { ReactiveModel } from '@beyond-js/reactive/model';
import { FormModel } from '@bgroup/wise-form/models';
import { currencyImplementation } from './implementations/currency';
import { totalizer } from './implementations/totalizer';
import { dependentCollapsible } from './implementations/dependent-collapsible';
import { WFSettings } from '@bgroup/wise-form/settings';
import { modal } from './implementations/modal';
import { percentage } from './implementations/percentage-input';
import { Button } from 'pragmate-ui/components';
import { select } from './implementations/select';
import { trafficLight } from './implementations/input-traffic-ligth';

export class StoreManager extends ReactiveModel<StoreManager> {
	#forms: Map<string, FormModel> = new Map();
	#active: FormModel;
	get active() {
		return this.#active;
	}
	#instances = new Map();
	get forms() {
		// estos son los componentes
		return {
			currencyImplementation,
			totalizer,
			dependentCollapsible,
			modal,
			percentage,
			select,
			trafficLight
		};
	}

	constructor() {
		super();
		this.setForm(this.forms.currencyImplementation); // Aqui lo cambias
		WFSettings.setFields({
			button: Button,
		});
	}

	async setForm(item) {
			if (this.#instances.has(item.name)) {
			this.#active = this.#instances.get(item.name);
			return this.trigger('change');
		}
		
		const form = await FormModel.create({ ...item });
		this.#instances.set(item.name, form);
		this.#active = form;
		this.trigger('change');
	}
}
