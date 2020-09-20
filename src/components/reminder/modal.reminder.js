import React from 'react';
import {
  Button, Modal, ModalBody, ModalFooter, ModalHeader, Input, Label, Col, Row,
} from 'reactstrap';
import moment from 'moment';
import { TimePicker } from 'antd';
import { toast } from 'react-toastify';
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
      color: '',
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

  handleChangeColor(value) {
    this.setState({ color: value });
  }

  validadeFileds() {
    if (this.state.reminder === '') {
      toast.error('Reminder can\'t be empty.');
      return false;
    }
    if (this.state.time === this.props.date) {
      toast.error('Please select a time.');
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
            <Col md="4">
              <Label>City</Label>
              <Input
                value={this.state.city}
                onChange={this.handleChange('city')}
              />
            </Col>
            <Col md="1">
              <Label>Color</Label>
              <Input
                type="checkbox"
                className="graycheck"
                checked={this.state.color === 0}
                onChange={this.handleChangeColor.bind(this, 0)}
              />
            </Col>
            <Col md="1">
              <Label className="nolabel" />
              <Input
                type="checkbox"
                className="bluecheck"
                checked={this.state.color === 1}
                onChange={this.handleChangeColor.bind(this, 1)}
              />
            </Col>
            <Col md="1">
              <Label className="nolabel" />
              <Input
                type="checkbox"
                className="redcheck"
                checked={this.state.color === 2}
                onChange={this.handleChangeColor.bind(this, 2)}
              />
            </Col>
            <Col md="1">
              <Label className="nolabel" />
              <Input
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
          <Button className="btn btn-success" onClick={this.save.bind(this)}>Save</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
export default ModalReminder;
