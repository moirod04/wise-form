export const totalizer = {
    name: 'formTotalizer',
    template: ['1fr'],
    title: 'form Totalizer',
    fields: [
        {
            name: 'totalizerExample',
            type: 'wrapper',
            control: 'totalizer',
            title: 'Totalizer',
            dataHead: ['Example', 'Test'],
            displayTotalIn: 'totalMaterial',
            template: ['1fr', '1fr'],
            fields: [
                {
                    label: 'Example with currency',
                    type: 'currency',
                    value: 0,
                    roundUp: true,
                    className: 'left-label',
                    name: 'adaptation',
                    decimalsLimit: 0,
                    removeValueWhenFocus: true,
                },
                {
                    name: 'totalMaterial',
                    type: 'currency',
                    disabled: true,
                }
            ],
        },
    ],
};