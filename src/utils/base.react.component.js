import React from 'react';
import _ from 'lodash';

class BaseReactComponent extends React.Component {
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
      { value: 2019, label: '2019' },
      { value: 2020, label: '2020' },
      { value: 2021, label: '2021' },
      { value: 2022, label: '2022' },
      { value: 2023, label: '2023' },
    ];
  }

  getValueElement(el) {
    if (_.has(el, 'checked')) return el.checked;
    return el.value;
  }

  handleChange(name, value) {
    return (event) => {
      const setValue = value || (event ? this.getValueElement(event.target) : null);
      this.setState({ [name]: setValue });
    };
  }
}

export default BaseReactComponent;
