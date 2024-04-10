export const bindlessForm = {
	name: 'Bindless form',
	title: 'Bindless form',
	template: ['1fr'],
	fields: [
		{
			type: 'wrapper',
			control: 'div',
			template: ['1fr', '1fr'],
			name: 'blindessContainer',
			fields: [
				{
					name: 'bindless',
					label: 'Bindless Input',
					type: 'bindlessInput',
				},
				{
					type: 'percentageInput',
					name: 'percentageInput',
					label: 'Percentage Input',
				},
			],
		},
	],
};
