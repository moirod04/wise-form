export class StyleObserver {
	private observer: MutationObserver;
	private node: HTMLElement;

	constructor({ node, callback }) {
		this.node = node;
		this.observer = new MutationObserver(mutations => {
			mutations.forEach((mutation: MutationRecord) => {
				if (mutation.type !== 'childList') return;
				const element: HTMLElement = node.querySelector(
					'.sgs-react-select__menu > .sgs-react-select__menu-list'
				);
				if (!element) return;
				element.addEventListener('scroll', callback);
			});
		});
	}

	startObserving(): void {
		if (!this.node) return;
		const config = { childList: true };
		this.observer.observe(this.node, config);
	}

	stopObserving(): void {
		this.observer.disconnect();
	}
}
