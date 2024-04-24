## InputTrafficLight

### Vision General 

`InputTrafficLight` es un componente React que combina un campo de entrada con un indicador de semáforo. Permite a los usuarios mostrar un valor y personalizar el color según condiciones especificadas.

### Uso 

```jsx
import * as React from 'react';
import { InputTrafficLight } from 'sgs-workflow/input-traffic-light';

function Vista() {
    const condicion = { operator: '>', baseCondition: 20 };
    return (
        <main className="contenedor__semáforo-de-tráfico">
            <InputTrafficLight value="24" condition={condicion} />
        </main>
    );
}
```

### Propiedades 

- **`Value`**: (string | number) El valor que se mostrará en el campo de entrada.
- **`condition`**:  (object) Un objeto que define la condición para cambiar el color del semáforo. Tiene las siguientes propiedades:
    - **`operador`**: (string) El operador de comparación ('<', '>', '=').
    - **`baseCondition`**: (number) El valor base para la comparación.

### Ejemplo 

```jsx
<InputTrafficLight value="24" condition={{ operador: '>', baseCondition: 20 }} />
```

Aqui estamos diciendo que si el `valor` del input que es `24` es mayor al `baseCondition` que es `20` el semaforo sera de color **Verde**, si no cumple la condicion sera **Rojo** el semaforo 

### Lógica Interna


- El componente determina el color del semáforo según las condiciones especificadas y el valor proporcionado.
- Si el valor no está presente o está vacío, el semáforo permanece en gris.
- El campo de entrada es de solo lectura y está deshabilitado cuando no hay valor.