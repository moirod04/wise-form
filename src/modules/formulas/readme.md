# How it works.

Las formulas se ejcutan por medio de la observacion de eventos en los campos del formulario, cada vez que uno de los
campos implicados en la formula cambia, esta se ejecuta y recalcula.

Pueden existir distintos tipos de formula

1. Formula simple

La formula simple es una operación mátematica aplicada sobre distintos campos del formulario

su estructura es la siguiente:

```
{ name: 'formula1', formula: 'totalGraphic * netGraphic + 1' };
```

En este caso, el Manager de formulas se limita a identificar los campos, suscribirse a los cambios y ejecutar el calculo
ante cada cambio.

2. Formula `base-conditional`

Implica que existe una formula simple, del primer tipo pero que bajo determinadas condiciones debe entonces aplicarse
una nueva formula. En este escenario, la definición puede ser la siguiente:

```
{
	name: 'formula2',
	formula: {
		base: 'discountPercentGraphic * discountAuthorGraphic',
		fields: ['totalGraphic', 'netGraphic', 'discountPercentGraphic', 'discountAuthorGraphic'],
		conditions: [
			{ condition: 'hasValue', formula: 'totalGraphic * discountAuthorGraphic' },
			{ upper: 5, formula: 'totalGraphic * discountAuthorGraphic + 10' },
		],
	},
};
```

Para esto, el Manager realiza en primer lugar, la misma lógica que con las formulas simples, pero además, se suscribirá
a los campos especificados en fields, en caso de que exista algún cambio en algun campo definido en la propiedad
`fields` entonces, el Manager, recorrerá las condiciones a ver si alguna de estas aplica y reemplazará la formula base
por la que aplique.

La propiedad condition, recibe un arreglo de objetos de tipo `IFormulaCondition`.

```
export interface IFormulaCondition {
	condition: 'hasValue' | 'upper' | 'lower' | 'equal' | 'different' | 'between';
	value?: string | number | [number, number];
	formula: string;
}
```

3. Condición según valor

Se utiliza para casos en los que se necesita implementar una formula según el valor de un campo. Para esto, la formula
debe tener especificada la propiedad "fields" con el campo indicado. Posteriormente, se puede configurar el arreglo de
valores, el cual recibe un objeto de tipo `IFormulaCondition` como el siguiente:

```ts
{ value: '0', formula: 'discountPercentGraphic + netGraphic' },
```

Siendo la estructura completa de la siguiente forma:

```ts
const valueCondition = {
	name: 'formula3',
	formula: {
		fields: 'country',
		conditions: [
			{
				condition: 'equal',
				values: [
					{ value: '0', formula: 'discountPercentGraphic + netGraphic' },
					{ value: '1', formula: 'totalGraphic * discountAuthorGraphic' },
					{ value: '2', formula: 'totalDigital * netDigital' },
				],
			},
		],
	},
};
```

En este escenario, el analizador de formula wse encargara de validar el valor actual del campo especificado y aplicar la
formula correspondiente.
