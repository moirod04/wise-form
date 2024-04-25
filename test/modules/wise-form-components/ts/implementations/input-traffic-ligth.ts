export const trafficLight = {
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
                    value: 0,
                    properties: ['condition'],
                    isPercent: true,
                    condition: {
                        parameter: 33,
                        red: '<= -2%',
                        yellow: '< 0 y > - 2%',
                        green: '>= 0%',
                        values: ['porcentajeDerechoAutor'],
                    },
                },
            ],
        },
    ]
};