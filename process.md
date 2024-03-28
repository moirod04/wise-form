# Pasos de actualización.

0. instalar mathjs `npm i mathjs`
1. los wrappers solo deben recibir el settings y lo usan unicamente para acceder a la propiedad name, realmente no es
   necesario y mas adelante habria que cambiar esto, se maneja asi para mantener la compatibilidad.
   - name = `settings.name`
2. los componentes `field` no reciben el modelo, solo reciben los atributos html imprimibles. El modelo es
   disponibilizado en el contexto, los componentes deben llamar al contexto y pedir el modelo del field directamente al
   modelo del form.


function Input({ ...props}) {
   const { model: generalModel } = useWiseFormContext();
   const = model = generalModel.getField(props.name);
}