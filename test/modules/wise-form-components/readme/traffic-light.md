# **`InputTrafficLight`**

## Proposito

El componente `InputTrafficLight` tiene el propósito de proporcionar una interfaz visual intuitiva para evaluar el estado de un valor numérico ingresado en un campo de entrada de texto dentro de un formulario. Esto puede ser útil en situaciones donde se necesite una representación visual rápida y clara del valor ingresado, especialmente si este valor está sujeto a ciertas condiciones o rangos predefinidos. El componente combina un campo de entrada de texto con un indicador visual de semáforo que cambia de color según ciertas condiciones.

## Funcionalidad 

- La funcionalidad del componente InputTrafficLight es proporcionar una representación visual del estado de un valor numérico ingresado en un campo de entrada de texto. Esta representación se realiza a través de un indicador visual de semáforo que cambia de color según ciertas condiciones predefinidas.

## Explicacion avanzada del Componente 

- **Input:** El componente utiliza el formato de entrada definido en `test\modules\wise-form-components\ts\views\components\traffic-ligth\format-to-display.ts` para formatear el valor que se muestra en el campo de entrada de texto. Esto incluye la capacidad de mostrar el valor como un porcentaje si se establece la bandera isPercent en true.

- **Cálculo del color del semáforo:** La lógica para determinar el color del semáforo se encuentra en el archivo `test\modules\wise-form-components\ts\views\components\traffic-ligth\verification.ts`. Aquí, se definen las condiciones bajo las cuales el semáforo debe cambiar de color. Por ejemplo, si el valor ingresado en el campo es menor o igual a un cierto porcentaje, el semáforo se muestra en rojo.

- **Actualización del semáforo:** El color del semáforo se calcula utilizando el hook useCalculate (`test\modules\wise-form-components\ts\views\components\traffic-ligth\use-calculate.ts`), que se encarga de realizar la verificación y actualizar el estado del color del semáforo en respuesta a los cambios en el valor del campo de entrada.


- **Interacción con el formulario:** El componente utiliza el contexto del formulario proporcionado por `useWiseFormContext` para acceder al modelo de formulario y sus campos. Se utiliza el hook useBinder para escuchar los cambios en el campo y actualizar el valor que se muestra en el campo de entrada.