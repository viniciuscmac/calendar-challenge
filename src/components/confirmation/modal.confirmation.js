import React from 'react';
import {
  Button, Modal, ModalBody, ModalFooter, ModalHeader,
} from 'reactstrap';
import BaseReactComponent from '../../utils/base.react.component';

class ModalConfirmation extends BaseReactComponent {
  render() {
    const {
      save, close, title, message,
    } = this.props;

    return (
      <Modal isOpen className="modal-md">
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          {message}
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-primary" onClick={close.bind(this)}>No</Button>
          <Button className="btn btn-success" onClick={save.bind(this)}>Yes</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalConfirmation;
