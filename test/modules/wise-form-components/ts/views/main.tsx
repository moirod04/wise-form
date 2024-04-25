import React from 'react';
import { WiseForm } from '@bgroup/wise-form/form';
import { useFormContext } from './context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { Spinner } from 'pragmate-ui/components';
interface ISettings {
	[key: string]: any;
}

export /*bundle*/
function Main(): JSX.Element {
	const { store, types } = useFormContext();

	const [active, setActive] = React.useState(store.active);
	const title = `${active.name}`;
	useBinder([store], () => setActive(store.active));
	
	/* if(!store.ready) return <Spinner type="primary" active/> */
	return (
		<main>
			<h1>{title}</h1>
			<WiseForm types={types} model={active}></WiseForm>
		</main>
	);
}
