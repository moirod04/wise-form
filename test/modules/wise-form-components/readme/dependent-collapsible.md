# **`Dependent Collapsible`**

El componente `DependentCollapsible` se compone de tres componentes que forman parte de un sistema de contenedores colapsables que pueden mostrar y ocultar contenido dependiendo de su estado:

## DependentCollapsible
El componente DependentCollapsible tiene como propósito crear un contenedor colapsable que puede depender de un modelo. Su funcionalidad básica incluye:

- Mostrar un encabezado con un título.
- Renderizar el contenido dentro del contenedor solo cuando está abierto (model.opened es verdadero).
- Utilizar el contexto de colapsibilidad para determinar si está abierto o cerrado.
- Escuchar cambios en el modelo y volver a renderizar el componente según sea necesario.

## CollapsibleContent

El componente CollapsibleContent es responsable de renderizar el contenido del contenedor colapsable. Su funcionalidad básica incluye:

- Mostrar el contenido del contenedor.
- Aplicar una clase para indicar si el contenedor está abierto o cerrado.

## CollapsibleHeader

El componente CollapsibleHeader representa el encabezado del contenedor colapsable. Su funcionalidad básica incluye:

- Mostrar el título del contenedor.
- Aplicar una clase para indicar si el contenedor está abierto o cerrado.