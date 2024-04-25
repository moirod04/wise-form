import { ReactiveModel } from '@beyond-js/reactive/model';

export class Controller extends ReactiveModel<Controller> {
	#options = [];
	get options() {
		return this.#options;
	}

	set options(value) {
		this.#options = value;
		this.triggerEvent();
	}

	private defaultOptions = [];
	private instance;
	private generalModel;
	private endIndex = 15;
	private itemsPerPage = 15;
	private ref;
	private props;
	private canCreate: boolean = false;

	get value() {
		if (!this.instance) return '';

		const selectableValue = this.instance.options.find(option => option.value === this.instance?.value) ?? {
			label: this.instance.value,
			value: this.instance.value,
		};
		const value = this.instance.value ? selectableValue : '';
		return value;
	}

	get customNoOptionsMessage() {
		return () => 'No hay opciones';
	}

	constructor(props) {
		super();
		this.#options = props.options;
		this.instance = props.instance;
		this.generalModel = props.generalModel;
		this.ref = props.ref;
		this.props = props;
		this.defaultOptions = this.instance.options.slice(0, this.endIndex);
		this.canCreate = props.canCreate;
	}

	onChange = event => {
		const value = this.canCreate ? event.value : event.target.value;

		const selectedOptionLabel = this.instance.options.find(option => option.value === value);
		this.instance.set({ value: value, selectedOptionLabel: selectedOptionLabel.label });
		if (!this.props.onSelect && typeof this.props.onSelect !== 'object') return;

		const updatedProps = {
			...this.props,
			value: value,
		};
		const properties = Object.keys(this.props).map(item => `this.${item}`);
		this.props.onSelect.forEach(action => {
			const isAnInternalValue = properties.includes(action?.value);
			const value = isAnInternalValue ? updatedProps[action.value.split('.')[1]] : action.value;
			this.generalModel.getField(action.to).set({ [action.property]: value });
		});
	};

	customFilter = search => {
		if (!search) {
			this.defaultOptions = this.instance.options.slice(0, this.endIndex);
			this.#options = this.defaultOptions;

			this.triggerEvent();
			return;
		}
		const searchingOptions = [...this.instance.options];
		let orderedOptions = searchingOptions.sort((optionA, optionB) => {
			let aStartsWith = optionA.label.toLowerCase().startsWith(search.toLowerCase());
			let bStartsWith = optionB.label.toLowerCase().startsWith(search.toLowerCase());

			if (aStartsWith && !bStartsWith) {
				return -1;
			}

			if (!aStartsWith && bStartsWith) {
				return 1;
			}

			let aIncludes = optionA.label.toLowerCase().includes(search.toLowerCase());
			let bIncludes = optionB.label.toLowerCase().includes(search.toLowerCase());

			if (aIncludes && !bIncludes) {
				return -1;
			}

			if (!aIncludes && bIncludes) {
				return 1;
			}

			return 0;
		});

		orderedOptions = orderedOptions.slice(0, this.itemsPerPage);
		this.options = orderedOptions;
		const element = this.ref.current.querySelector('.sgs-react-select__menu > .sgs-react-select__menu-list');
		element.scrollTop = 0;
		this.triggerEvent();
	};

	loadOptions = () => {
		const newOptionsToShow = this.instance.options.slice(0, this.endIndex);
		this.#options = newOptionsToShow;
		this.defaultOptions = newOptionsToShow;
		this.triggerEvent();
	};

	handleScroll = event => {
		const bottom = Math.round(event.target.scrollHeight - event.target.scrollTop) === event.target.clientHeight;
		const newIndex = this.endIndex + this.itemsPerPage;
		const displayingOpts = this.#options.length;
		const instanceOpts = this.instance.options.length;
		const loadMore = bottom && displayingOpts < instanceOpts;

		if (!loadMore) return;
		const newOptionsToShow = this.instance.options.slice(0, newIndex);
		this.endIndex = newIndex;
		this.#options = newOptionsToShow;
		this.triggerEvent();
	};
}
