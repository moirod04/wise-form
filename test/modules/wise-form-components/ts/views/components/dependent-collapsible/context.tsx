import React from 'react';

export interface ICollapsibleContext {
	open: boolean;
	items: any;
}
export const CollapsibleContext = React.createContext(null);
export const useCollapsibleContext = () => React.useContext(CollapsibleContext);
