# Agregar Componentes al Formulario con `wise-form`

`wise-form` ofrece flexibilidad en la creación de formularios al permitirte incorporar componentes React personalizados
en tus formularios. Esto se logra mediante el registro de estos componentes, ya sea de forma global para toda la
aplicación o específicamente para un formulario individual. A continuación, te explicamos cómo puedes hacerlo.

## Registro Global de Componentes

Para registrar componentes globalmente, de modo que estén disponibles en todos los formularios de tu aplicación,
`wise-form` proporciona el módulo `WFSettings`. Aquí puedes definir un conjunto de componentes que quieres reutilizar en
varios formularios.

Primero, importa `WFSettings` desde `wise-form`:

```javascript
import { WFSettings } from '@bgroup/wise-form/settings';
```

Luego, utiliza el método `setFields` para registrar tus componentes:

```javascript
WFSettings.setFields({
	select: ReactSelect, // Componente personalizado para selecciones
	baseWrapper: Wrapper, // Un contenedor base para agrupar campos
	appInput: AppInput, // Input personalizado de la aplicación
	div: Div, // Un componente que simplemente renderiza un <div>
	section: Section, // Componente para secciones dentro del formulario
});
```

## Registro de Componentes por Formulario

Si prefieres registrar componentes específicamente para un formulario, puedes hacerlo pasando la propiedad `types` al
componente `WiseForm`. Esta propiedad acepta el mismo tipo de objeto que el método `setFields` de `WFSettings`.

```javascript
import { WiseForm } from '@bgroup/wise-form';
import ReactSelect from 'react-select'; // Asumiendo que es tu componente personalizado

const MyForm = () => {
	const formSettings = {
		// Tu configuración del formulario
	};

	const customTypes = {
		select: ReactSelect,
		// Otros componentes personalizados
	};

	return <WiseForm settings={formSettings} types={customTypes} />;
};
```

## Especificar Componentes en la Configuración del Formulario

Una vez que has registrado tus componentes, ya sea globalmente o por formulario, puedes especificar estos componentes en
la configuración de tu formulario. Esto te permite controlar exactamente qué componente se utiliza para cada campo.

```javascript
const formSettings = {
	name: 'MiFormulario',
	fields: [
		{
			name: 'miCampoSelect',
			type: 'select', // Este 'type' corresponde al key usado en el registro de componentes
			label: 'Seleccione una opción',
			options: [
				{ value: '1', label: 'Opción 1' },
				{ value: '2', label: 'Opción 2' },
			],
		},
		{
			name: 'miSeccion',
			type: 'section', // Utiliza el componente 'Section' registrado
			fields: [
				{
					name: 'miInputPersonalizado',
					type: 'appInput', // Utiliza 'AppInput' para este campo
					label: 'Ingresa tu nombre',
				},
			],
		},
	],
};
```

Al seguir estos pasos, podrás enriquecer tus formularios con componentes personalizados, adaptándolos a las necesidades
específicas de tu aplicación y mejorando la experiencia del usuario.

# Acceso a los Modelos

Para interactuar con los modelos de formulario y acceder a la información y funcionalidades que estos ofrecen,
`wise-form` provee un mecanismo a través del contexto del formulario. Este enfoque facilita el acceso a los datos y
métodos del modelo de formulario desde cualquier componente dentro del árbol de componentes de `WiseForm`.

## Uso del Contexto de WiseForm

Para acceder al contexto y a los modelos del formulario, los componentes deben utilizar el hook `useWiseFormContext`, el
cual se importa de la siguiente manera:

```javascript
import { useWiseFormContext } from '@bgroup/wise-form/form';
```

Mediante este hook, tus componentes pueden acceder de manera sencilla a diversas propiedades y métodos proporcionados
por el contexto de `WiseForm`, como el modelo del formulario (`FormModel`), valores actuales del formulario,
configuraciones de campos y más.

### Ejemplo de Uso

```javascript
import React from 'react';
import { useWiseFormContext } from '@bgroup/wise-form/form';

const MyCustomComponent = () => {
	const { model, values, formTypes } = useWiseFormContext();

	// Ahora puedes utilizar 'model', 'values', y 'formTypes' según necesites
	console.log(values); // Muestra los valores actuales del formulario

	return <div>{/* Ejemplo de uso del contexto en un componente */}</div>;
};
```

Este enfoque proporciona una integración fluida y eficiente con los formularios `wise-form`, permitiendo a los
desarrolladores construir componentes altamente interactivos y reactivos a los cambios del formulario.

Para más detalles sobre la estructura y propiedades disponibles en el contexto de `WiseForm`, consulta la documentación
específica del contexto [aquí](../ui/context.md).
