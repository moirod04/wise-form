# **`Totalizer`**

## Proposito

El componente Totalizer tiene como objetivo calcular y mostrar un total basado en los valores ingresados en los campos de un formulario. Está diseñado para recibir un modelo que contiene la información necesaria para realizar los cálculos, como los nombres de los campos relevantes y dónde mostrar el total calculado.

## Funcionalidad

Algunos aspectos clave del componente son:

- Utiliza el hook useTotal para realizar el cálculo del total en función de los valores ingresados en los campos del formulario.
- El hook useTotal se encarga de escuchar los cambios en los campos del formulario y calcular el total en consecuencia.
- Los campos relevantes para el cálculo del total se especifican en el modelo proporcionado al Totalizer.
- El total calculado se muestra en el lugar especificado en el formulario, definido por el modelo.