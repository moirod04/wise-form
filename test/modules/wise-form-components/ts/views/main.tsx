import React from 'react';
import { WiseForm } from '@bgroup/wise-form/form';
import { useFormContext } from './context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { TrafficLight } from './components/traffic-ligth/light';
import { Totalizer } from './components/totalizer';
import { AlertModal } from './components/alert-modal';
import { CurrencyInput } from './components/currency-input';
import { DependentCollapsible } from './components/dependent-collapsible';
import { Modal } from './components/modal';
import { PercentageInput } from './components/percentage-input';
import { Select } from './components/select';
import { Div } from './components/div';

interface ISettings {
	[key: string]: any;
}

export /*bundle*/
function Main(): JSX.Element {
	const { store } = useFormContext();

	const [active, setActive] = React.useState(store.active);
	const title = `Form: ${active.name}`;
	useBinder([store], () => setActive(store.active));

	const types = {
		trafficLight: TrafficLight,
		alertModal: AlertModal,
		currency: CurrencyInput,
		totalizer: Totalizer,
		dependentCollapsible: DependentCollapsible,
		select: Select,
		modal: Modal,
		percentage: PercentageInput,
		div: Div
	};
	
	return (
		<main>
			<h1>{title}</h1>
			<WiseForm types={types} model={active}></WiseForm>
		</main>
	);
}
