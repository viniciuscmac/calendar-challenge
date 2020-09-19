import React from 'react';
import moment from 'moment';
import { Label, Row, Col } from 'reactstrap';
import Select from 'react-select';
import _ from 'lodash';
import './calendar.filter.scss';
import BaseReactComponent from '../../utils/base.react.component';

class CalendarFilter extends BaseReactComponent {
  constructor(props) {
    super(props);
    this.setInitialState();
  }

  setInitialState() {
    this.state = {
      month: moment().month() + 1,
      year: moment().year(),
    };
  }

  changeValue(event) {
    const value = this.getValueElement(event.target);
    if (value) {
      const { months } = this.state;
      const selectedMonth = _.find(months, { id: parseInt(value, 10) });
      this.setState({ month: selectedMonth });
      this.props.onChange(selectedMonth);
    } else {
      this.setState({ month: '' });
      this.props.onChange({});
    }
  }

  render() {
    return (
      <section className="calendar-filter">
        <Row className="actions">
          <Col sm={3}>
            <Label for="select-month">Month</Label>
            <Select
              name="select-month"
              id="select-month"
              value={this.state.month}
              options={this.getMonthsOptions()}
            />
          </Col>
          <Col sm={3}>
            <Label for="select-year">Year</Label>
            <Select
              name="select-year"
              id="select-year"
              value={this.state.year}
              options={this.getYearsOptions()}
            />
          </Col>
        </Row>
      </section>
    );
  }
}

export default CalendarFilter;
