import React from 'react';
import { useCollapsibleContext } from './context';
import { IconButton } from 'pragmate-ui/icons';

interface ICollapsibleProps {
	children: React.ReactNode;
	className?: string;
	toggleTitle?: boolean;
}
export /*bundle */ function CollapsibleHeader({ children, className }: ICollapsibleProps): JSX.Element {
	const { open } = useCollapsibleContext();

	const cls = `collapsible__header ${className ? ` ${className}` : ''} ${open ? 'open' : ''}`;
	// const clsButton = `collapsible__button ${open ? ' collapsible__button--opened' : ''}`;
	const attrs: { className: string; onClick?: () => void } = { className: cls };
	return (
		<header {...attrs}>
			<div className="collapsible__header-content">{children}</div>
			{/* <IconButton onClick={onClick} className={clsButton} icon={'left'} /> */}
		</header>
	);
}
