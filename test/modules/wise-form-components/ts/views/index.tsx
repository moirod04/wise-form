import React from 'react';
import { Aside } from './aside';
import { FormContext } from './context';
import { Main } from './main';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { types } from './types';

export /*bundle*/
function View({ store }): JSX.Element {
	const [form, useForm] = React.useState(store.forms[store.selected]);
	useBinder([store], () => useForm(store.selected));
	return (
		<FormContext.Provider value={{ current: form, store, types }}>
			<div className='page__container'>
				<Aside />
				<Main />
			</div>
		</FormContext.Provider>
	);
}
