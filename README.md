# Biblioteca `wise-form`

## Introducción

`wise-form` es una biblioteca de gestión de formularios basada en modelos reactivos, diseñada para facilitar la
creación, manejo y extensión de formularios dinámicos. Su finalidad es ofrecer a los desarrolladores la posibilidad de
realizar implementaciones de formularios que puedan ser modificados a demanda, tanto desde el cliente como desde el
backend, proporcionando así una gran flexibilidad y adaptabilidad. Esta biblioteca es independiente del framework de UI,
permitiendo su integración con diversas bibliotecas o frameworks como React, Preact, Vue y Svelte.

## Uso

`wise-form` facilita dos métodos principales para trabajar con formularios:

### Configuración Directa con `WiseForm`

Puedes definir la configuración de tu formulario como un objeto JSON y pasarla directamente al componente `WiseForm`:

```javascript
import { WiseForm } from 'wise-form';

export const formSettings = {
	name: 'Contacto',
	fields: [
		{
			name: 'email',
			type: 'email',
			required: true,
			label: 'Email',
			variant: 'floating',
		},
		// Campos adicionales...
	],
};

// Uso en un componente
return <WiseForm settings={formSettings} />;
```

### Implementación Avanzada con `FormModel`

Para mayor control y flexibilidad, puedes instanciar un `FormModel` y pasarlo a `WiseForm`. Este método es ideal para
utilizar `wise-form` en distintos contextos o con diferentes frameworks de UI, permitiendo un manejo detallado de los
comportamientos del formulario:

```javascript
import { WiseForm, FormModel } from 'wise-form';

export const formDefinition = {
	name: 'Contacto',
	fields: [
		{
			name: 'email',
			type: 'email',
			required: true,
			label: 'Email',
			variant: 'floating',
		},
		// Campos adicionales...
	],
};

const formModel = await FormModel.create(formDefinition);

// Uso en un componente
return <WiseForm formModel={formModel} />;
```

## Características

`wise-form` ofrece características destacadas para la creación de formularios:

-   **Creación Dinámica de Formularios**: Permite la creación de formularios mediante configuración JSON.
-   **Modelos Reactivos**: Soporta una gestión integral del estado y el manejo de eventos, facilitando la reactividad en
    los formularios.
-   **Compatibilidad Amplia**: Diseñada para ser utilizada con múltiples bibliotecas/frameworks de UI, ampliando las
    posibilidades de implementación.
-   **Diseños Personalizables y Extensibles**: Proporciona herramientas para la personalización y extensión de
    formularios, incluyendo la integración con plugins.

## Enlaces de Interés

-   [Agregar componentes al formulario](features/add-components.md)
-   [Agregar callbacks](features/callbacks)
-   [Plugins](plugins/index.md)
-   [Plugin de fórmulas](plugins/formulas.md)
-   [BaseModel](models/base)
-   [WrapperFormModel](models/wrapper)
-   [FormModel](modes/form)
-   [FieldModel](modeles/field)
-   [Componentes de WiseForm](ui/wise-form)
-   [WrappedForm](ui/wrapped)
-   [WiseFormContext](ui/context)

Con `wise-form`, los desarrolladores tienen una poderosa herramienta para construir formularios complejos y dinámicos,
optimizando la experiencia de usuario y facilitando la gestión de datos de formulario de manera eficiente y flexible.
