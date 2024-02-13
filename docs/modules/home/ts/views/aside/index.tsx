import React from 'react';
import { List } from 'pragmate-ui/list';
import { useFormContext } from '../context';
import { AsideItem } from './item';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
export function Aside() {
	const { store } = useFormContext();
	const items = Object.values(store.forms);
	const [update, setUpdate] = React.useState();

	return (
		<aside className='page__aside'>
			<List className='list-unstyled' items={items} control={AsideItem} />
		</aside>
	);
}
