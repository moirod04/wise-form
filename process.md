# Pasos de actualización.

0. instalar mathjs `npm i mathjs`
1. los wrappers solo deben recibir el name del wrapper
    - name = `settings.name` ejemplo:
    ```
    // data es el objeto recibido en props
    	<WrappedForm
    		types={{
    			baseWrapper: Wrapper,
    			appInput: AppInput,
    		}}
    		name={data.settings.name}
    		settings={data.settings}
    	/>
    ```
2. los componentes `field` no reciben el modelo, solo reciben los atributos html imprimibles. El modelo es
   disponibilizado en el contexto, los componentes deben llamar al contexto y pedir el modelo del field directamente al
   modelo del form. 2.1 importar el `useWiseForm` 2.2 extraer el modelo del hook. 2.3 acceder al modelo del input usando
   el metodo getField del modelo del formulario.

```ts
function Input({ ...props}) {
      const { model: generalModel } = useWiseFormContext();
      const = model = generalModel.getField(props.name); }
```
