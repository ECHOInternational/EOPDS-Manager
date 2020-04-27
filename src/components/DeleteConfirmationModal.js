import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DeleteConfirmationModal = (props) => {
  const {
    itemName
  } = props;

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
    <div>
      <Button
      	size="sm"
		color="danger"
		outline
		onClick={_handleClick}
	  >
		<i className="fa fa-trash"></i> Delete
	  </Button>
      <Modal isOpen={modal} toggle={toggle} className="modal-danger">
        <ModalHeader toggle={toggle}>Are you sure?</ModalHeader>
        <ModalBody>
          {`You are about to delete "${itemName}". This cannot be undone.`}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={_confirmDelete}>Confirm Delete</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeleteConfirmationModal;