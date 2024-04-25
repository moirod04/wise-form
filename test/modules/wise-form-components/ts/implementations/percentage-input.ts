export const percentage = {
    name: 'formPercentage',
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