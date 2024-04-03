const basic = { name: 'formula1', formula: 'totalGraphic * netGraphic + 1' };
const baseConditional = {
	name: 'formula2',
	formula: {
		base: 'discountPercentGraphic * discountAuthorGraphic',
		fields: ['totalGraphic', 'netGraphic', 'discountPercentGraphic', 'discountAuthorGraphic'],
		conditions: [
			{ condition: 'hasValue', formula: 'totalGraphic * discountAuthorGraphic' },
			{ condition: 'upper', value: 5, formula: 'totalGraphic * netGraphic + 1 + 10' },
		],
	},
};
const formula10 = {
	name: 'formula10',
	formula: '5*2',
};
const comparison = {
	fields: ['totalGraphic', 'netGraphic'],
	name: 'comparison',
	type: 'comparison',
	formula: {
		condition: 'upper',
		conditions: {
			totalGraphic: '50 * 2',
			netGraphic: 'netGraphic / 60',
		},
	},
};
const valueCondition = {
	name: 'formula3',

	formula: {
		fields: 'country',
		conditions: [
			{
				condition: 'equal',
				values: [
					{ value: '0', formula: 'formula10 + 50' },
					{ value: '1', formula: 'totalGraphic * discountAuthorGraphic' },
					{ value: '2', formula: 'totalGraphic * netGraphic' },
				],
			},
		],
	},
};

const form = [];
const observers = [basic, valueCondition, formula10, comparison];
export const formulasForm = {
	name: 'formulas-form',
	title: 'Formulas Form',
	// template: '1;1;1x3',
	template: ['1fr', '1fr', '1fr'],
	query: '',
	gap: '3rem',
	observers,
	fields: [
		{
			type: 'wrapper',
			template: {
				structure: ['1', '1x2', '1x2'],
				gap: '3rem',
			},
			control: 'baseWrapper',
			name: 'wrapper-element',
			fields: [
				{
					name: 'country',
					type: 'select',
					label: 'Country',
					options: [
						{ value: 0, label: 'Argentina' },
						{ value: 1, label: 'Chile' },
						{ value: 2, label: 'Brasil' },
					],
				},
				{
					name: 'totalGraphic',
					label: 'totalGraphic',
					type: 'text',
				},
				{
					name: 'netGraphic',
					type: 'text',
					required: true,
					label: 'netGraphic',
				},
				{
					name: 'discountPercentGraphic',
					label: 'discountPercentGraphic',
					type: 'text',
				},
				{
					name: 'discountAuthorGraphic',
					label: 'discountAuthorGraphic',
					value: 20,
					type: 'text',
				},
			],
		},

		{
			type: 'wrapper',
			template: {
				structure: ['1x4'],
				gap: '3rem',
			},
			control: 'baseWrapper',
			name: 'wrapper-element2',
			fields: [
				{
					name: 'totalDigital',
					label: 'totalDigital',
					type: 'text',
				},
				{
					name: 'netDigital',
					label: 'netDigital',
					type: 'text',
					required: true,
				},
				{
					name: 'discountPercentDigital',
					label: 'discountPercentDigital',
					type: 'text',
				},
				{
					name: 'discountAuthorDigital',
					label: 'discountAuthorDigital',

					type: 'text',
				},
			],
		},
		/// SECCION DE FORMULAS Deben estar deshabilitados, se pasa disabled true y dan error
		{
			type: 'wrapper',
			template: {
				structure: ['1x4'],
				gap: '3rem',
			},
			control: 'baseWrapper',
			name: 'wrapper-formulas',
			fields: [
				{
					name: 'formula1',
					label: 'formula 1',
					type: 'text',
				},
				{
					name: 'formula2',
					type: 'text',
					required: true,
					label: 'formula 2',
					formula: 'formula2',
				},
				{
					name: 'formula3',
					label: 'formula 3',
					type: 'text',
					formula: 'totalGraphic * discountPercentGraphic', // Si hay almenos 1 campo lleno en digitales
					//	formula: "discountPercentGraphic + netGraphic" Si no hay campos llenos en digitales
				},
				{
					name: 'formula4',
					label: 'formula 4',
					type: 'text',
					formula: 'A + B + C + / discountPercentGraphic', // B Viene de bd al seleccionar un sello con un select se busca,

					// A = al maximo entre totalGraphic * discountAuthorGraphic y totalDigital * netDigital
					// C = Se tienen 3 tabs
					// si se esta en tab 1 C = minimo ente totalGraphic * totalDigital y discountPercentGraphic * discountAuthorGraphic
					// si esta tab 2 0 3 totalGraphic
				},
			],
		},
	],
};

//'((totalGraphic * netGraphic) +
// (discountPercentGraphic * discountAuthorGraphic)) -
//((totalDigital * netDigital) * discountPercentDigital)',
