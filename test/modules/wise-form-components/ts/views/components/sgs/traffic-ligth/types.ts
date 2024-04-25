export interface IProps {
	value?: string;
	condition?: ICondition;
	isPercent?: boolean;
	className?: string;
	name: string;
	model;
}

export interface ICondition {
	operator: '>' | '=' | '<';
	baseCondition: string | number;
}

export interface IParams {
	parameter: number | string;
	red: string;
	yellow: string;
	green: string;
	value: number | string;
	traffic?: string;
}

export interface IValidate {
	color: string;
}

export interface IProcessAndCondition {
	string: string;
	value: number;
}
