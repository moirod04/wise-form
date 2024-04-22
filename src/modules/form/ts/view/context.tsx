import React from 'react';
import type { FormModel } from '@bgroup/wise-form/models';
export interface IFormContext {
	model?: FormModel;
	name?: string;
	values?: Record<string, any>;
	items?: any;
	rows?: [number, string][];
	template?: {
		type: string;
		styles: any;
		items: any[];
	};
	formTypes?: Record<string, React.ElementType>;
}

export /*bundle */ interface IWrappedFormContext extends IFormContext {
	parent: IFormContext;
}
const value: IFormContext = {};
export const WiseFormContext = React.createContext(value);
export /*bundle*/ const useWiseFormContext = () => React.useContext(WiseFormContext);

export const WrappedWiseFormContext = React.createContext(value);
export /*bundle*/ const useWrappedWiseFormContext = () => React.useContext(WrappedWiseFormContext);
