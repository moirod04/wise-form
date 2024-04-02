# Sistema de Plugins para WiseForm

## Introducción

El Sistema de Plugins de WiseForm está diseñado para permitir a los desarrolladores extender y personalizar el
comportamiento del formulario. Mediante la implementación de plugins, es posible introducir lógicas específicas, manejar
eventos del formulario de manera detallada y acceder a las configuraciones definidas para cada instancia del formulario.
Esto ofrece una flexibilidad significativa para adaptar el comportamiento del formulario a requisitos complejos y
específicos.

## Objetivo

La finalidad de los plugins es brindar un mecanismo mediante el cual el comportamiento estándar de WiseForm pueda ser
extendido o modificado. Los plugins permiten:

-   Capturar y manejar eventos específicos del formulario.
-   Realizar cálculos o validaciones adicionales basados en la entrada del usuario.
-   Interactuar con otras APIs o servicios externos basados en la actividad del formulario.
-   Modificar el flujo estándar de lógica del formulario para cumplir con requisitos específicos.

## Desarrollo de un Plugin

Para crear un plugin para WiseForm, los desarrolladores deben extender de una clase abstracta proporcionada por el
sistema. Esta clase abstracta define un contrato que todos los plugins deben seguir, asegurando una integración fluida
con el sistema de formularios.

### Clase Abstracta: WiseFormPluginBase

La `WiseFormPluginBase` es una clase abstracta que todos los plugins deben extender. Define la estructura básica y los
métodos obligatorios que cada plugin debe implementar.

#### Propiedades y Métodos Requeridos

-   **name**: Un identificador único para el plugin.
-   **ready**: Una propiedad booleana que indica si el plugin está listo para ser utilizado.
-   **init()**: Un método que se invoca para inicializar el plugin. Este método debe retornar una promesa que se
    resuelva una vez que el plugin esté completamente inicializado.
-   **settings(model: FormModel, specs: IPluginFormSpecs)**: Un método estático obligatorio que permite configurar e
    inicializar una instancia del plugin basada en un modelo de formulario y especificaciones dadas. Este método debe
    retornar una promesa que resuelva a la instancia del plugin.

#### Ejemplo de Implementación

```typescript
import { FormModel } from '../model';
import { IPluginFormSpecs } from '../types/plugins';
import { WiseFormPluginBase } from '../path/to/WiseFormPluginBase';

class MyCustomPlugin extends WiseFormPluginBase {
	readonly name: string = 'MyCustomPlugin';
	readonly ready: boolean = false;

	constructor() {
		super();
		// Inicialización adicional aquí
	}

	async init(): Promise<void> {
		// Lógica de inicialización
		console.log(`${this.name} initializing...`);
		// Establecer la propiedad 'ready' según corresponda
	}

	static async settings(model: FormModel, specs: IPluginFormSpecs): Promise<WiseFormPluginBase> {
		const instance = new MyCustomPlugin();
		await instance.init();
		return instance;
	}
}
```

## Uso de Plugins

Para utilizar un plugin en WiseForm, debe instanciarse y configurarse adecuadamente. Se recomienda usar el método
estático `settings` para inicializar el plugin con configuraciones específicas antes de añadirlo al formulario,
asegurando que el plugin esté listo para su uso.
