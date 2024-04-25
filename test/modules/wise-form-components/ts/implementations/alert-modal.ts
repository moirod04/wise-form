export const alertModal = {
    name: 'form-alert-modal',
    title: 'Alert Modal',
    template: ['1fr', '1fr'],
    fields: [
        {
            type: 'alertModal',
            open: false,
            message: 'Modal de Alerta abierta',
            title: 'Aviso !',
            name: 'alert-modal',
            properties: ['open'],
        },
        {
            type: 'button',
            name: 'button-alert',
            label: 'open alert',
            className: 'form-button',
            variant: 'secondary',
            onClick: [
                {
                    to: 'alert-modal', // Accion que llegara a la alerModal
                    property: 'open', // Modificamos la propiedad open
                    value: true, // Valor en true (abierto)
                },
            ],
        },
    ],
};