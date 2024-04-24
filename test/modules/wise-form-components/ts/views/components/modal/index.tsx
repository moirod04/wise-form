import React from 'react';
import { WrappedForm } from '@bgroup/wise-form/form';
import { useDinamycFormContext } from '../../context';
import { Modal as PUIModal } from 'pragmate-ui/modal';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';

export /*bundle*/ const Modal = ({ model }) => {
	const [open, setOpen] = React.useState(model.open);
	const { types } = useDinamycFormContext();
	const { title, className, resetWhenClosed } = model.specs;
	const [, setUpdate] = React.useState({});

	useBinder([model], () => {
		setOpen(model.open);
		setUpdate({});
	});

	useBinder([model], () => setUpdate({}), ['clear']);
	React.useEffect(() => {
		if (model.open || !resetWhenClosed) return;
		model.clear();
	}, [model.open, resetWhenClosed]);
	if (!open) return null;

	const onClose = () => {
		model.set({ open: false });
	};
	return (
		<PUIModal closeClicked={false} show={open} onClose={onClose} className={`beauty-modal modal-sgs ${className}`}>
			{title && <h3 className="modal-title">{title}</h3>}
			<div className="content">
				<WrappedForm types={types} name={model.name} />
			</div>
		</PUIModal>
	);
};

Modal.defaultProps = {
	data: { resetWhenClosed: true },
};
