import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Label, Row, Col } from 'reactstrap';
import Select from 'react-select';
import './calendar.filter.scss';
import BaseReactComponent from '../../utils/base.react.component';

class CalendarFilter extends BaseReactComponent {
  constructor(props) {
    super(props);

    this.monthsOptions = this.getMonthsOptions();
    this.yearsOptions = this.getYearsOptions();

    this.setInitialState();
  }

  setInitialState() {
    this.state = {
      month: _.find(this.monthsOptions, (tempaux) => tempaux.value === moment().month() + 1),
      year: _.find(this.yearsOptions, (tempaux) => tempaux.value === moment().year()),
    };
  }

  handleChangeSelect(name, value) {
    if (value == null) {
      this.setState({ [name]: 0 });
    } else if (name === 'month') {
      this.setState({
        [name]: _.find(this.monthsOptions, (tempaux) => tempaux.value === value.value),
      });
      this.props.changeFilter(value.value, this.state.year.value);
    } else {
      this.setState({
        [name]: _.find(this.yearsOptions, (tempaux) => tempaux.value === value.value),
      });
      this.props.changeFilter(this.state.month.value, value.value);
    }
  }

  render() {
    return (
      <section className="calendar-filter">
        <Row className="actions">
          <Col sm={2}>
            <Label for="select-month">Month</Label>
            <Select
              name="select-month"
              noResultsText="No results found."
              placeholder="Month"
              value={this.state.month}
              options={this.monthsOptions}
              onChange={this.handleChangeSelect.bind(this, 'month')}
            />
          </Col>
          <Col sm={2}>
            <Label for="select-year">Year</Label>
            <Select
              name="select-year"
              noResultsText="No results found."
              placeholder="Year"
              value={this.state.year}
              options={this.yearsOptions}
              onChange={this.handleChangeSelect.bind(this, 'year')}
            />
          </Col>
        </Row>
      </section>
    );
  }
}

export default CalendarFilter;
