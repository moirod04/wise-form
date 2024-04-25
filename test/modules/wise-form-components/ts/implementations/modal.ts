export const modal = {
    name: 'form-modal',
    title: 'Modal',
    template: ['1fr', '1fr'],
    fields: [
        {
            type: 'wrapper',
            control: 'modal', // Indicamos en un wrapper que este sera el contenedor de la modal
            name: 'modal-wrapper',
            properties: ['open'],
            className: 'sm',
            title: 'Modal con Wrapper',
            open: false, // Que este cerrada la modal por defecto
            template: ['1fr'],
            fields: [
                {
                    type: 'wrapper',
                    control: 'div',
                    name: 'sub-wrapper',
                    template: ['1fr', '1fr'],
                    fields: [
                        {
                            name: 'input-content',
                            type: 'text',
                            placeholder: 'input text'
                        },
                        {
                            type: 'wrapper',
                            name: 'content-buttons',
                            control: 'div',
                            template: [[3, '3fr 1fr 1fr']],
                            fields: [
                                {
                                    type: 'wrapper',
                                    control: 'div',
                                    name: 'void',
                                    template: [],
                                    fields: [],
                                },
                                {
                                    type: 'submit',
                                    name: 'submit-button',
                                    label: 'Aceptar',
                                    className: 'form-button',
                                    id: 'derive',
                                    variant: 'primary',
                                    
                                },
                                {
                                    type: 'button',
                                    name: 'cancel-button',
                                    className: 'form-button',
                                    variant: 'secondary',
                                    label: 'Cerrar',
                                    onClick: [
                                        {
                                            to: 'modal-wrapper', // Para la moodal
                                            property: 'open',
                                            value: false, // Indicamos que se cierre
                                        },
                                    ],
                                },
                            ],
                        },
                    ]
                },
            ],
        },
        {
            type: 'button',
            name: 'openModal',
            label: 'open',
            className: 'form-button',
            variant: 'secondary',
            onClick: [
                {
                    to: 'modal-wrapper', // Accion que llegara a la modal
                    property: 'open', // Modificamos la propiedad open
                    value: true, // Valor en true (abierto)
                },
            ],
        },
    ],
};