import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';
import CalendarFilter from './calendar.filter';
import GridPanel from '../gridpanel/grid.panel';
import './calendar.scss';
import ModalReminder from '../reminder/modal.reminder';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.setInitialState();
  }

  setInitialState() {
    this.state = {
      month: moment(),
      showModal: false,
      dateSelected: moment(),
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
    cell.className = 'green';
    cell.el = (
      <div className="summary-item">
        <h4>{cell.cellNumber}</h4>
        <h5 className="summary-line box box-gray">Day inside month</h5>
      </div>
    );
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
    this.setState({ showModal: false });
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
            />
          )}
      </div>
    );
  }
}

export default Calendar;
