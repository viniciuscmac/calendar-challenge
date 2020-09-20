import React from 'react';
import {
  Button, Modal, ModalBody, ModalFooter, ModalHeader, Input, Label, Col, Row,
} from 'reactstrap';
import moment from 'moment';
import { TimePicker } from 'antd';
import BaseReactComponent from '../../utils/base.react.component';
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
    };
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

  render() {
    const { close, title } = this.props;
    const format = 'hh:mm';
    return (
      <Modal isOpen className="modal-lg">
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <Row>
            <Col sm={12}>
              <Label>Reminder</Label>
              <Input
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
                format={format}
                onChange={this.changeHour.bind(this)}
              />
            </Col>
            <Col md="8">
              <Label>City</Label>
              <Input
                value={this.state.city}
                onChange={this.handleChange('city')}
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-primary" onClick={close.bind(this)}>Back</Button>
          <Button className="btn btn-success" onClick={close.bind(this)}>Save</Button>
        </ModalFooter>
      </Modal>
    );
  }

}
export default ModalReminder;
