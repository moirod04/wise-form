import React from 'react';
import { Modal } from 'pragmate-ui/modal';
import { Button } from 'pragmate-ui/components';
import { useWiseFormContext } from '@bgroup/wise-form/form';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';

export /*bundle*/ function AlertModal(props): JSX.Element {
	const { model } = useWiseFormContext();
	const instance = model.getField(props.name);
	useBinder([instance], () => {
		setOpen(instance.open);
	});
	const [open, setOpen] = React.useState(instance.open);
	if (!open) return null;
	const onClose = () => instance.set({ open: false });
	const message = instance.specs.message;
	return (
		<Modal show className="beauty-modal save-success modal-sgs alert-modal" onClose={onClose} closeClicked={false}>
			{' '}
			<h3 className="modal-title">{instance.specs.title}</h3> <p>{message}</p>{' '}
			<div className="actions">
				{' '}
				<Button variant="primary" label="Aceptar" className="form-button" onClick={onClose} />{' '}
			</div>{' '}
		</Modal>
	);
}
