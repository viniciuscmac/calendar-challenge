import React from 'react';
import _ from 'lodash';

class BaseReactComponent extends React.Component {
  getIconProcessing() {
    return (
      <i className="fa fa-spinner fa-spin" />
    );
  }

  getMonthsOptions() {
    return [
      { value: 1, label: 'January' },
      { value: 2, label: 'February' },
      { value: 3, label: 'March' },
      { value: 4, label: 'April' },
      { value: 5, label: 'May' },
      { value: 6, label: 'June' },
      { value: 7, label: 'July' },
      { value: 8, label: 'August' },
      { value: 9, label: 'September' },
      { value: 10, label: 'October' },
      { value: 11, label: 'November' },
      { value: 12, label: 'December' },
    ];
  }

  getYearsOptions() {
    return [
      { value: 2020, label: '2020' },
      { value: 2021, label: '2021' },
      { value: 2022, label: '2022' },
      { value: 2023, label: '2023' },
    ];
  }

  handleChange(name, value) {
    return (event) => {
      const setValue = value || (event ? this.getValueElement(event.target) : null);
      this.setState({ [name]: setValue });
    };
  }

  showError(message, error) {
    console.log(message, error); //eslint-disable-line
  }
}

export default BaseReactComponent;
