export interface ISimpleFormula {
	name: string;
	formula: string;
}

export interface IFormulaCondition {
	condition: 'hasValue' | 'upper' | 'lower' | 'equal' | 'different' | 'between';
	value?: string | number | [number, number];
	formula: string;
}

type FormulaFields = string | string[];
export interface IConditionalFormula {}
export interface IConditionalField {
	field?: string | string[];
	conditions: IFormulaCondition[];
}

export interface IComplexCondition {
	fields: FormulaFields;
	base?: string;
	conditions: IConditionalField[];
}

export interface IConditionalFormula {
	name: string;
	fields?: FormulaFields;
	formula: IComplexCondition | string;
	conditions?: IConditionalField[];
}

export type FormulaObserver = ISimpleFormula | IConditionalFormula;
