import type { Parser } from '../helpers/parser';
import type { Token } from '../helpers/token';

export interface ISimpleFormula {
	name: string;
	formula: string;
	type?: FormulaType;
	emptyValue?: string | number;
	fields?: FormulaFields;
}

export interface IFormulaCondition {
	condition: 'hasValue' | 'upper' | 'lower' | 'equal' | 'different' | 'between' | 'lessOrEqual' | 'greaterOrEqual';
	value?: string | number | [number, number];
	formula: string;
	conditions?: IConditionalField[],
	fields?: string[]
}

type FormulaFields = string | string[];
export type EvaluatedFormula = { value?: string | number; formula: string; condition?: string };
export interface IConditionalFormula { }

export interface IConditionalField {
	field?: string | string[];
	condition?: string;
	values?: [EvaluatedFormula];
	conditions?: IFormulaCondition[];
	fields?: string[];
	formula?: string;
	type?: string,
	value: string | number
}

export interface IComplexCondition {
	fields: FormulaFields;
	base?: string;
	conditions: IConditionalField[];
}

export interface IConditionalFormula {
	name: string;
	type?: FormulaType;
	fields?: FormulaFields;
	formula: IComplexCondition | string;
	conditions?: IConditionalField[];
	emptyValue?: string | number
}

export type ParserData = {
	parser: Parser;
	tokens: Token[];
	[key: string]: any;
};

export type FormulaType = 'basic' | 'base-conditional' | 'value-conditions' | undefined;

export type FormulaObserver = ISimpleFormula | IConditionalFormula;
