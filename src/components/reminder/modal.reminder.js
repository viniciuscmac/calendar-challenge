import React from 'react';
import {
  Button, Modal, ModalBody, ModalFooter, ModalHeader, Input, Label, Col, Row,
} from 'reactstrap';
import moment from 'moment';
import { TimePicker } from 'antd';
import { toast } from 'react-toastify';
import BaseReactComponent from '../../utils/base.react.component';
import ModalConfirmation from '../confirmation/modal.confirmation';
import './modal.reminder.scss';

class ModalReminder extends BaseReactComponent {
  constructor(props) {
    super(props);

    this.setInitialState();
  }

  setInitialState() {
    this.state = {
      time: this.props.date,
      reminder: '',
      city: '',
      color: '',
      id: 0,
      showModalConfirmation: false,
    };
  }

  componentWillMount() {
    if (this.props.reminder.id && this.props.reminder.id > 0) {
      this.setState({
        time: this.props.reminder.time,
        reminder: this.props.reminder.description,
        city: this.props.reminder.city,
        color: this.props.reminder.color,
        id: this.props.reminder.id,
      });
    }
  }

  changeHour(time, timeString) {
    const times = timeString.split(':');
    this.setState({
      time: moment(this.state.time).set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
      }).add(times[0], 'h').add(times[1], 'm'),
    });
  }

  handleChangeColor(value) {
    this.setState({ color: value });
  }

  validadeFileds() {
    if (this.state.reminder === '') {
      toast.error('Reminder can\'t be empty.');
      return false;
    }
    if (this.state.city === '') {
      toast.error('City can\'t be empty.');
      return false;
    }
    if (this.state.color === '') {
      toast.error('Please select a color.');
      return false;
    }
    return true;
  }

  save() {
    if (this.validadeFileds()) {
      this.props.save(this.state);
    }
  }

  delete() {
    this.setState({ showModalConfirmation: false });
    this.props.delete(this.state);
  }

  closeConfirmation() {
    this.setState({ showModalConfirmation: false });
  }

  openConfirmation() {
    this.setState({ showModalConfirmation: true });
  }

  render() {
    const { close, title } = this.props;
    const format = 'H:mm';
    return (
      <Modal isOpen className="modal-lg">
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <Row>
            <Col sm={12}>
              <Label>Reminder</Label>
              <Input
                data-cy="reminder-field"
                type="text"
                value={this.state.reminder}
                onChange={this.handleChange('reminder')}
                maxLength="30"
              />
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <Label>Time</Label>
              <TimePicker
                data-cy="time-field"
                format={format}
                value={this.state.time}
                onChange={this.changeHour.bind(this)}
              />
            </Col>
            <Col md="4">
              <Label>City</Label>
              <Input
                data-cy="city-field"
                value={this.state.city}
                onChange={this.handleChange('city')}
              />
            </Col>
            <Col md="1">
              <Label>Color</Label>
              <Input
                data-cy="color-field-gray"
                type="checkbox"
                className="graycheck"
                checked={this.state.color === 0}
                onChange={this.handleChangeColor.bind(this, 0)}
              />
            </Col>
            <Col md="1">
              <Label className="nolabel" />
              <Input
                data-cy="color-field-blue"
                type="checkbox"
                className="bluecheck"
                checked={this.state.color === 1}
                onChange={this.handleChangeColor.bind(this, 1)}
              />
            </Col>
            <Col md="1">
              <Label className="nolabel" />
              <Input
                data-cy="color-field-red"
                type="checkbox"
                className="redcheck"
                checked={this.state.color === 2}
                onChange={this.handleChangeColor.bind(this, 2)}
              />
            </Col>
            <Col md="1">
              <Label className="nolabel" />
              <Input
                data-cy="color-field-black"
                type="checkbox"
                className="blackcheck"
                checked={this.state.color === 3}
                onChange={this.handleChangeColor.bind(this, 3)}
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-primary" onClick={close.bind(this)}>Back</Button>
          {this.state.id > 0 && (
            <Button data-cy="btn-delete-reminder" className="btn btn-danger" onClick={this.openConfirmation.bind(this)}>Delete</Button>
          )}
          <Button data-cy="btn-save-reminder" className="btn btn-success" onClick={this.save.bind(this)}>Save</Button>
        </ModalFooter>
        {this.state.showModalConfirmation && (
          <ModalConfirmation
            title="Confirmation"
            message="Are you sure you want to delete this reminder ?"
            save={this.delete.bind(this)}
            close={this.closeConfirmation.bind(this)}
          />
        )}
      </Modal>
    );
  }
}
export default ModalReminder;
