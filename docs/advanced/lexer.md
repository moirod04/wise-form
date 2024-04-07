# Documentación del Objeto Lexer y Tokens

## Lexer

### Descripción

El objeto `Lexer` es responsable de convertir una cadena de texto que representa una fórmula matemática o lógica en una
lista de tokens. Los tokens pueden ser números, operadores o variables, y pueden estar organizados en una estructura
anidada o plana dependiendo de la configuración.

### Constructor

-   `flattenTokens: boolean` (opcional): Determina si los tokens generados deben aplanarse en un único nivel o mantener
    su estructura anidada. El valor predeterminado es `false`.

### Métodos

#### tokenize(formula: string): Token[]

Analiza la cadena de texto `formula` y devuelve una lista de tokens estructurada según la configuración de
`flattenTokens`.

-   `formula: string`: Cadena de texto que contiene la fórmula a tokenizar.

### Uso

```typescript
const lexer = new Lexer(true); // Crea una instancia que aplana los tokens
const tokens = lexer.tokenize('pvp * (1 - descuento) + impuesto');
```

## Token

### Descripción

Representa los componentes individuales de una fórmula, tales como números, operadores y variables, así como
agrupaciones de estos componentes en expresiones entre paréntesis.

### Constructor

-   `type: TokenType`: Tipo del token, que puede ser 'number', 'operator', 'variable', o 'parenthesis'.
-   `value: string`: Valor literal del token como cadena de texto.
-   `stringValue?: string` (opcional): Representación en cadena de la expresión dentro de los paréntesis, si el token es
    de tipo 'parenthesis'.
-   `children?: Token[]` (opcional): Lista de tokens que son hijos de este token, utilizado para expresiones anidadas.
-   `parent?: Token` (opcional): Referencia al token padre en el árbol de tokens, si aplica.

### Propiedades

-   `type`: Tipo del token.
-   `value`: Valor del token.
-   `stringValue`: Cadena de texto de la expresión entre paréntesis.
-   `children`: Lista de tokens hijos, en caso de estructuras anidadas.
-   `parent`: Token que actúa como padre de este token en la estructura.

### Uso

```typescript
const numberToken = new Token('number', '123');
const operationToken = new Token('operator', '+');
const parenthesisToken = new Token('parenthesis', '()', null, [numberToken, operationToken]);
```

## TokenType

### Descripción

`TokenType` es una enumeración de los tipos posibles de tokens que el `Lexer` puede generar. Los valores posibles
incluyen:

-   `'number'`: Representa un número.
-   `'operator'`: Representa un operador matemático (como +, -, \*, /).
-   `'variable'`: Representa una variable alfanumérica.
-   `'parenthesis'`: Representa una agrupación de tokens en una subexpresión entre paréntesis.

### Uso

Utilizado para definir y controlar los tipos de tokens que se pueden generar y cómo deben ser tratados durante el
análisis léxico.
