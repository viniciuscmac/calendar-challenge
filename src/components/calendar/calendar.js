import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';
import CalendarFilter from './calendar.filter';
import GridPanel from '../gridpanel/grid.panel';
import './calendar.scss';
import ModalReminder from '../reminder/modal.reminder';
import ModalConfirmation from '../confirmation/modal.confirmation';
import { getWeather } from '../../actions/weather.actions';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.setInitialState();
  }

  setInitialState() {
    this.state = {
      month: moment(),
      showModal: false,
      showModalConfirmation: false,
      dateSelected: moment(),
      reminders: [],
      reminderSelected: {},
    };
  }

  componentDidMount() {
    window.onresize = () => {
      this.forceUpdate();
    };
  }

  getHeader() {
    return moment.weekdaysShort();
  }

  getData() {
    let grid = [];
    grid = this.createCalendarGrid();
    this.createElements(grid);
    return grid;
  }

  createElements(grid) {
    _.forEach(grid, (line) => {
      _.forEach(line, (column) => {
        this.createElement(column);
      });
    });
  }

  createElement(cell) {
    if (cell.insideMonth) {
      this.createElementInfo(cell);
    } else {
      this.createEmptyElementInfo(cell);
    }
  }

  createElementInfo(cell) {
    const reminders = _.filter(this.state.reminders, (aux) => aux.day.format('MM/DD/yyyy') === cell.date.format('MM/DD/yyyy'));
    cell.className = 'green';
    if (reminders.length > 0) {
      cell.haveContent = true;
    }
    cell.el = (
      <div className="summary-item">
        <div className="summary-header">
          <h4>{cell.cellNumber}</h4>
          <i data-cy={`openmodal-${cell.cellNumber}`} className="fa fa-plus-circle fa-2x" role="contentinfo" onClick={this.openModal.bind(this, cell)} />
          <i data-cy={`openmodalexclude-${cell.cellNumber}`} className="fa fa-times-circle fa-2x" role="contentinfo" onClick={this.openModalConfirmation.bind(this, cell)} />
        </div>
        {this.getReminders(reminders)}
      </div>
    );
  }

  getReminders(reminders) {
    if (!_.isEmpty(reminders)) {
      return _.map(_.sortBy(reminders, ['time']), (value) => (
        <h5
          data-cy={`reminder-${value.id}`}
          className={this.getColor(value.color)}
          onClick={this.openModalEdit.bind(this, value)}
        >
          <p>{value.description}</p>
          <p>City: {value.city}</p>
          <p>Weather: {value.weather}</p>
        </h5>
      ));
    }
    return null;
  }

  getColor(color) {
    switch (color) {
      case 0:
        return 'summary-line box box-gray';
      case 1:
        return 'summary-line box box-blue';
      case 2:
        return 'summary-line box box-red';
      case 3:
        return 'summary-line box box-black';
      default:
        return 'summary-line box box-gray';
    }
  }

  createEmptyElementInfo(cell) {
    cell.className = 'gray';
    cell.el = (
      <div className="summary-item summary-item-readonly">
        <h4>{cell.cellNumber}</h4>
      </div>
    );
  }

  createCalendarGrid() {
    const grid = [];
    let lastCell = null;
    const startDate = moment(this.state.month).startOf('month');
    const endDate = moment(this.state.month).endOf('month');
    for (let i = 0; i < 5; i++) {
      const line = [];
      for (let j = 0; j < 7; j++) {
        lastCell = this.createItem(startDate, i, j);
        line.push(lastCell);
      }
      grid.push(line);
    }
    if (lastCell.date.date() !== endDate.date() && lastCell.date.month() === endDate.month()) {
      const line = [];
      const i = 5;
      for (let j = 0; j < 7; j++) {
        line.push(this.createItem(startDate, i, j));
      }
      grid.push(line);
    }
    return grid;
  }

  calculateCellNumber(startDate, line, column) {
    const startCellIndex = startDate.day();
    const currentCell = line * 7 + column;
    let cellNumber = null;
    let calculated = null;
    let insideMonth = true;
    if (currentCell < startCellIndex) {
      calculated = moment(startDate).subtract(startCellIndex - currentCell, 'days');
      cellNumber = calculated.date();
      insideMonth = false;
    } else {
      calculated = moment(startDate).add(currentCell - startCellIndex, 'days');
      cellNumber = calculated.date();
      if (calculated.month() > startDate.month()) {
        insideMonth = false;
      }
    }
    return {
      cellNumber,
      date: calculated,
      insideMonth,
    };
  }

  createItem(startDate, line, column) {
    const { cellNumber, date, insideMonth } = this.calculateCellNumber(startDate, line, column);
    return {
      cellNumber,
      date,
      insideMonth,
    };
  }

  reload(month, year) {
    this.setState({ month: moment(`${year}-${month}-01`) });
  }

  closeModal() {
    this.setState({ reminderSelected: {}, showModal: false });
  }

  openModal(cell) {
    if (cell && cell.insideMonth) {
      this.setState({
        title: `Reminder for ${cell.date.format('MM/DD/YYYY')}`,
        dateSelected: cell.date,
        showModal: true,
      });
    }
  }

  openModalConfirmation(cell) {
    if (cell && cell.insideMonth) {
      this.setState({
        reminderSelected: cell,
        showModalConfirmation: true,
      });
    }
  }

  openModalEdit(reminder) {
    this.setState({
      reminderSelected: reminder,
      showModal: true,
    });
  }

  deleteOne(content) {
    const tempState = this.state;
    if (content.id > 0) {
      tempState.reminders = _.filter(tempState.reminders, (aux) => aux.id !== content.id);
    }
    tempState.reminderSelected = {};
    tempState.showModal = false;
    this.setState({ tempState });
  }

  async saveReminder(content) {
    const tempState = this.state;
    if (content.id > 0) {
      tempState.reminders = _.filter(tempState.reminders, (aux) => aux.id !== content.id);
    }
    const weatherResponse = await getWeather(content.city);

    tempState.reminders.push({
      id: tempState.reminders.length + 1,
      description: content.reminder,
      time: moment(content.time),
      day: content.time.startOf('day'),
      city: content.city,
      weather: weatherResponse ? weatherResponse.weather[0].main : 'No weather available.',
      color: content.color,
    });
    tempState.reminderSelected = {};
    tempState.showModal = false;
    this.setState({ tempState });
  }

  closeConfirmarion() {
    this.setState({ reminderSelected: {}, showModalConfirmation: false });
  }

  deleteReminders() {
    const tempState = this.state;
    tempState.reminders = _.filter(tempState.reminders,
      (aux) => aux.day.format('MM/DD/yyyy') !== this.state.reminderSelected.date.format('MM/DD/yyyy'));
    tempState.reminderSelected = {};
    tempState.showModalConfirmation = false;
    this.setState({ tempState });
  }

  render() {
    return (
      <div className="planing">
        <CalendarFilter changeFilter={this.reload.bind(this)} />
        <GridPanel
          data={this.getData()}
          header={this.getHeader()}
          columnLabels={[]}
          defaultLines={5}
          onSelect={this.openModal.bind(this)}
        />
        {this.state.showModal
          && (
            <ModalReminder
              title={this.state.title}
              close={this.closeModal.bind(this)}
              date={this.state.dateSelected}
              save={this.saveReminder.bind(this)}
              delete={this.deleteOne.bind(this)}
              reminder={this.state.reminderSelected}
            />
          )}
        {this.state.showModalConfirmation && (
          <ModalConfirmation
            title="Confirmation"
            message="Are you sure you want to delete all reminders for the day ?"
            save={this.deleteReminders.bind(this)}
            close={this.closeConfirmarion.bind(this)}
          />
        )}
      </div>
    );
  }
}

export default Calendar;
