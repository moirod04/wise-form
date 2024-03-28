# Configuración de Observers

La configuración de observers en nuestra biblioteca proporciona una poderosa herramienta para definir y aplicar fórmulas
dinámicas basadas en los datos de los formularios. Esta característica está diseñada para permitir cálculos automáticos
y validaciones que responden en tiempo real a las interacciones del usuario, mejorando significativamente la
interactividad y la funcionalidad de los formularios.

## Utilidad para Fórmulas

Los observers son esenciales para implementar lógicas de cálculo y validación que dependen de los valores de uno o más
campos dentro de un formulario. Permiten:

-   Realizar cálculos automáticos que se actualizan según los datos ingresados o modificados por el usuario.
-   Aplicar validaciones dinámicas que pueden cambiar según el contexto del formulario o los valores de otros campos.
-   Mejorar la experiencia del usuario al proporcionar retroalimentación instantánea basada en sus acciones.

## Posibles Configuraciones

La flexibilidad de los observers se manifiesta en su capacidad para soportar diversas configuraciones, adaptándose a
necesidades específicas de cálculo o validación:

### Fórmulas Simples

Define cálculos directos que no requieren evaluación de condiciones. Útil para cálculos estándar que siempre se aplican.

```json
{
	"formula": "totalGraphic * netGraphic + 1",
	"name": "formula1"
}
```

### Fórmulas con Condiciones en Múltiples Campos

Permite la evaluación de condiciones sobre varios campos, aplicando fórmulas específicas si se cumplen dichas
condiciones.

```json
{
	"formula": "discountPercentGraphic * discountAuthorGraphic",
	"name": "formula2",
	"conditions": [
		{
			"fields": ["totalGraphic", "netGraphic", "discountPercentGraphic", "discountAuthorGraphic"],
			"conditions": [
				{ "condition": "hasValue", "formula": "totalGraphic * discountAuthorGraphic" },
				{ "upper": 5, "formula": "totalGraphic * discountAuthorGraphic + 10" }
			]
		}
	]
}
```

### Fórmulas Condicionales Basadas en el Valor de un Campo

Aplica diferentes fórmulas dependiendo del valor específico de un campo. Esta configuración es ideal para lógicas que
requieren una evaluación condicional basada en categorías o rangos.

```json
{
	"name": "formula3",
	"formula": {
		"field": "country",
		"conditions": [
			{ "equal": "0", "formula": "discountPercentGraphic + netGraphic" },
			{ "equal": "1", "formula": "totalGraphic * discountAuthorGraphic" },
			{ "equal": "2", "formula": "totalDigital * netDigital" }
		]
	}
}
```

Cada una de estas configuraciones proporciona un marco para la creación de formularios interactivos y altamente
funcionales, donde los cálculos y las validaciones se adaptan en tiempo real al flujo de datos ingresados por los
usuarios. Al implementar observers, se abren amplias posibilidades para diseñar formularios que no solo recopilan
información, sino que también la procesan de manera inteligente para ofrecer una experiencia de usuario optimizada y
eficiente.

## Soporte para Tipos de Condiciones

La estructura se ha enriquecido para admitir una variedad de condiciones explícitas, que permiten una evaluación
detallada de los campos del formulario:

-   **`equal`**: Evalúa si el campo es **igual** al valor dado.
-   **`lower`**: Comprueba si el campo es **menor** que el valor proporcionado.
-   **`upper`**: Determina si el campo es **mayor** que el valor especificado.
-   **`between`**: Verifica si el campo está **dentro de un rango** de valores.
-   **`different`**: Evalúa si el campo es **diferente** al valor dado.
-   **`hasValue`**: Comprueba si el campo **tiene algún valor** (no está vacío).
-   **`lessOrEqual`**: Evalúa si el campo es **menor o igual** que el valor dado.
-   **`greaterOrEqual`**: Determina si el campo es **mayor o igual** que el valor especificado.

Cada uno de estos identificadores y condiciones posibilita la realización de evaluaciones precisas y la adaptación de
las fórmulas de cálculo según los datos del formulario. Esta flexibilidad asegura una configuración dinámica y reactiva
que puede responder en tiempo real a los cambios en los campos del formulario, permitiendo una interacción más intuitiva
y precisa con el usuario.
