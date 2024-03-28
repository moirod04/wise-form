const basic = { name: 'formula1', formula: 'totalGraphic * netGraphic + 1' };
const generalCondition = {
	name: 'formula2',
	formula: {
		base: 'discountPercentGraphic * discountAuthorGraphic',
		fields: ['totalGraphic', 'netGraphic', 'discountPercentGraphic', 'discountAuthorGraphic'],
		conditions: [
			{ condition: 'hasValue', formula: 'totalGraphic * discountAuthorGraphic' },
			{ condition: 'upper', value: 5, formula: 'totalGraphic * discountAuthorGraphic + 10' },
		],
	},
};
const hasValueCondition = {
	name: 'formula3',
	formula: {
		fields: 'country',
		conditions: [
			{
				condition: 'equal',
				values: [
					{ value: '0', formula: 'discountPercentGraphic + netGraphic' },
					{ value: '1', formula: 'totalGraphic * discountAuthorGraphic' },
					{ value: '2', formula: 'totalDigital * netDigital' },
				],
			},
		],
	},
};
const observers = [basic, generalCondition];
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
				structure: ['1x5'],
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
					label: 'Total digital',
					type: 'text',
				},
				{
					name: 'netDigital',
					type: 'text',
					required: true,
					label: 'Total neto digital',
				},
				{
					name: 'discountPercentDigital',
					label: '% de descuento digital',
					type: 'text',
				},
				{
					name: 'discountAuthorDigital',
					label: 'Porcentaje de autor digital',
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
