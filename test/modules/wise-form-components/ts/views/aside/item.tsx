import React from 'react';
import { useFormContext } from '../context';
import { Button } from 'pragmate-ui/components';


export function AsideItem({ item }) {
	const { store } = useFormContext();
	
	const onClick = () => {
		store.setForm(item);
	};

	const attrs = { variant: 'primary', bordered: true, onClick };

	return (
		<li>
			<Button {...attrs}>{item.title}</Button>
		</li>
	);
}
