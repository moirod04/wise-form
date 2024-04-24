export const modal = {
    name: 'data',
    type: 'wrapper',
    title: 'Modal',
    template: ['1fr',],
    fields: [
        {
            type: 'wrapper',
            control: 'modal',
            className: 'md ',
            name: 'modalExample',
            properties: ['open'],
            open: false,
            title: 'Estructura de Articulo',
            template: ['1fr', '1fr'],
            fields: [
                {
                    type: 'wrapper',
                    control: 'div',
                    name: 'actions',
                    template: [[2, '1fr 1fr']],
                    fields: [
                        {
                            type: 'button',
                            label: 'Aceptar',
                            variant: 'primary',
                            name: 'treeAcceptButton',
                            className: 'form-button',
                            onClick: [
                                {
                                    to: 'data.modalExample',
                                    property: 'open',
                                    value: false,
                                },
                                {
                                    to: 'structureOfArt',
                                },
                            ],
                        },
                        {
                            type: 'button',
                            label: 'Cancelar',
                            name: 'cancelStructureBtn',
                            variant: 'secondary',
                            className: 'form-button',
                            onClick: [
                                {
                                    to: 'data.modalExample',
                                    property: 'open',
                                    value: false,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};