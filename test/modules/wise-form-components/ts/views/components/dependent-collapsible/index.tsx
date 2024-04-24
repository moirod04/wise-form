import React from 'react';
import { CollapsibleContext } from './context';
import { CollapsibleHeader } from './header';
import { WrappedForm } from '@bgroup/wise-form/form';
import { CollapsibleContent } from './content';
import { useDinamycFormContext } from '../../context';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';

export /*bundle */ function DependentCollapsible({ model }: { model }): JSX.Element {
	const [state, setState] = React.useState({});
	const { types } = useDinamycFormContext();
	useBinder(
		[model],
		() => {
			setState({});
		},
		['change', 'clear']
	);

	const { title, className } = model.specs;
	const value = { open: model?.opened, state };
	let cls = model.className || model.className === "" ? model.className : className
	cls = `collapsible__container ${cls ? ` ${cls}` : ''} `;
	return (
		<CollapsibleContext.Provider value={value}>
			<article className={cls}>
				<CollapsibleHeader>
					<h3>{title}</h3>
				</CollapsibleHeader>
				{model.opened && (
					<CollapsibleContent>
						<WrappedForm types={types} name={model.name} />
					</CollapsibleContent>
				)}
			</article>
		</CollapsibleContext.Provider>
	);
}
