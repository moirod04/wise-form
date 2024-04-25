export const select = {
    name: 'formSelect',
    template: ['1fr'],
    title: 'Select',
    fields: [
        {
            type: 'wrapper',
            control: 'div',
            name: 'selectExample',
            template: ['1fr'],
            title: 'Select',
            fields: [
                {
                    name: 'select',
                    type: 'select',
                    label: 'Select Example ',
                    placeholder: 'Seleccione..',
                    options: [
                        {
                            value: 'yes',
                            label: 'Si',
                        },
                        {
                            value: 'no',
                            label: 'No',
                        },
                    ],
                },
            ]
        },
    ]
};