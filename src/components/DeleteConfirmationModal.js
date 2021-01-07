import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useTranslation } from 'react-i18next';


const DeleteConfirmationModal = (props) => {
  const {
    itemName
  } = props;

  const { t } = useTranslation('UserInterface');
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const _confirmDelete = () => {
  	props.onConfirmDelete();
  	toggle();
  }

  const _handleClick = (evt)  => {
  	evt.stopPropagation();
  	toggle();
  }

  return (
    <React.Fragment>
      <Button
      	size="sm"
		color="danger"
		outline
		onClick={_handleClick}
    className="delete-button"
	  >
		<i className="fas fa-trash"></i><span className="text"> { t('deleteButtonText', 'Delete', 'Text on a button that causes an object to be deleted.')}</span>
	  </Button>
      <Modal isOpen={modal} toggle={toggle} className="modal-danger">
        <ModalHeader toggle={toggle}>{t ('confirmationDialogHeader', 'Are you sure?', 'Header on a dialog box that confirms a potentially destructive action.')}</ModalHeader>
        <ModalBody>
          {`You are about to delete "${itemName}". This cannot be undone.`}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={_confirmDelete}>{t('confirmActionButtonText_Delete', 'Confirm Delete', 'Text on a button that confirms that on object should be deleted.')}</Button>{' '}
          <Button color="secondary" onClick={toggle}>{t('cancelButtonText','Cancel', 'Text on a button that cancels the current action.')}</Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

export default DeleteConfirmationModal;