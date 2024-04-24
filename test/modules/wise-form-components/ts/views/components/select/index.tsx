import React from 'react';
import { ReactSelect } from '../react-select/ts';
import { useWiseFormContext } from '@bgroup/wise-form/form';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { Icon } from 'pragmate-ui/icons';
import CreatableSelect from 'react-select/creatable';
import { Controller } from './controller';
import { StyleObserver } from './observer';

export /*bundle*/ const Select = props => {
	const { model: generalModel } = useWiseFormContext();
	const [, setUpdate] = React.useState({});
	const instance = generalModel.getField(props.name);
	const ref: React.MutableRefObject<HTMLDivElement> = React.useRef(null);
	const { current: controller } = React.useRef(new Controller({ ...instance.specs, generalModel, instance, ref }));
	const { options, disabled, name, icon } = instance;
	const { className, label } = instance.specs;
	const itemsPerPage = instance.specs.itemsPerPage ?? 15;

	useBinder([instance], () => {
		controller.options = instance?.options ? instance.options.slice(0, itemsPerPage) : [];
		setUpdate({});
	});

	useBinder([controller], () => setUpdate({}));

	React.useEffect(() => {
		controller.loadOptions();
		if (!ref.current) return;
		const element = ref.current.querySelector('.sgs-react-select');
		const observer = new StyleObserver({ node: element, callback: controller.handleScroll });
		observer.startObserving();
		return () => observer.stopObserving();
	}, [ref.current]);
	if (!options || !options?.find) {
		console.error(`No options provided for ${name}`);
		return null;
	}

	const cls = `${className ?? ''} pui-input pui-react-select`;
	const onCreateOption = props => {
		instance.set({ value: props });
	};

	const formatCreateLabel = inputValue => {
		return `Crear "${inputValue}"`;
	};

	const { canCreate, dependentOn, ...selectProps } = instance.specs;
	const Control = canCreate ? CreatableSelect : ReactSelect;
	// @todo Remove property label,alredy on pui
	delete selectProps.label;
	const iconTootip = typeof icon === 'object' ? { ...icon } : {};

	return (
		<div ref={ref} className={cls}>
			<label>
				<span>
					{label}
					{icon && (
						<span {...iconTootip}>
							<Icon {...icon} />
						</span>
					)}
				</span>
				<Control
					{...selectProps}
					onChange={controller.onChange}
					isDisabled={disabled}
					value={controller.value}
					onCreateOption={onCreateOption}
					classNamePrefix="sgs-react-select"
					formatCreateLabel={formatCreateLabel}
					className="sgs-react-select"
					noOptionsMessage={controller.customNoOptionsMessage}
					isLoading={instance?.fetching}
					onInputChange={controller.customFilter}
					options={controller.options}
				/>
			</label>
		</div>
	);
};
