export const trafficLight = {
    type: 'wrapper',
    control: 'div',
    name: 'trafficExample',
    template: ['1fr'],
    title: 'TrafficLight',
    fields: [
        {
            type: 'wrapper',
            control: 'div',
            template: [[3, 'calc(50% - 20px) 1fr']],
            name: 'divAuthor',
            fields: [
                {
                    name: 'porcentajeDerechoAutor',
                    label: '% d. autor: ',
                    type: 'percentage',
                    properties: ['condition', 'isChange'],
                    removeValueWhenFocus: false,
                    isSetDefaultValue: false,
                    toFixed: true,
                    isChange: false,
                },
                {
                    type: 'trafficLight',
                    value: '',
                    name: 'PorcentajeDA',
                    properties: ['condition'],
                    isPercent: true,
                    condition: {
                        red: '',
                        yellow: '',
                        green: '',
                        values: ['porcentajeDerechoAutor'],
                    },
                },
            ],
        },
    ]
};