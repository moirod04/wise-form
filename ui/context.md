# WiseFormContext

## interfaz

```ts
export interface IFormContext {
	model?: FormModel;
	name?: string;
	values?: Record<string, any>;
	items?: any;
	rows?: [number, string][];
	template?: {
		type: string;
		styles: any;
		items: any[];
	};
	formTypes?: Record<string, React.ElementType>;
}
```
