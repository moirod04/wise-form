export const percentage = {
    type: 'wrapper',
    control: 'div',
    name: 'percentageExample',
    template: ['1fr'],
    title: 'Percentage',
    fields: [
        {
            type: 'percentage',
            isSetDefaultValue: false,
            toFixed: true,
            name: 'porcentaje',
            label: '% descuento:',
            removeValueWhenFocus: false,
            isChange: false,
        },
    ]
};