import React from 'react';
import type { StoreManager } from '../store';


export /*bundle*/ interface IContext {
	types: Record<string, any>;
}

export /*bundle*/ const DinamycFormContext = React.createContext({} as IContext);
export /*bundle*/ const useDinamycFormContext = () => React.useContext(DinamycFormContext);


export const FormContext = React.createContext({} as any);
export const useFormContext = () => React.useContext(FormContext);
