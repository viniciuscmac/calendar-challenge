import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';
import CalendarFilter from './calendar.filter';
import './calendar.scss';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.setInitialState();
  }

  setInitialState() {
    this.state = {
      showPlanningLaunch: false,
      baseDate: new Date(),
      HorariosDisponiveis: [],
      DisciplinasDisponiveis: [],
      CellSelected: [],
    };
  }

  componentDidMount() {
    window.onresize = () => {
      this.forceUpdate();
    };
  }

  getPlaninSummary(month) {
    const params = _.clone(this.props.filter);
    params.Month = month.id;
    return true;
  }

  async changeMonth(month) {
    const newState = {
      month: null,
      planingSummary: [],
    };
    if (this.hasAllParams(month)) {
      this.processing('grid_planing', true);
      let planingSummary = await this.getPlaninSummary(month);
      if (planingSummary && !_.isEmpty(planingSummary)) {
        planingSummary = this.formatSummary(planingSummary);
        newState.month = month;
        newState.planingSummary = planingSummary;
      }
      this.processing('grid_planing', false);
    }
    this.setState(newState);
  }

  hasAllParams(month) {
    const { filter } = this.props;
    return !_.isEmpty(month)
      && !_.isEmpty(filter.IdPLetivo.toString())
      && !_.isEmpty(filter.IdUEnsino.toString())
      && !_.isEmpty(filter.IdTurma.toString())
      && !_.isEmpty(filter.IdDisciplina.toString())
      && !_.isEmpty(filter.IdIAcademico.toString());
  }

  formatSummary(planingSummary) {
    const summary = {};
    _.forEach(planingSummary, (item) => {
      const keys = _.keys(item);
      _.forEach(keys, (key) => {
        const config = item[key];
        if (config) {
          summary[config.Data] = config;
        }
      });
    });
    return summary;
  }

  getHeader() {
    return moment.weekdaysShort();
  }

  getData() {
    let grid = [];
    if (this.state.month) {
      grid = this.createCalendarGrid();
      this.createElements(grid);
    }
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
    cell.info = this.state.planingSummary[cell.date.format('DD/MM/YYYY')];
    cell.className = _.get(cell, 'info.DiaLetivo') === 1 || _.get(cell, 'info.DiaLetivo') === 2 || _.get(cell, 'info.DiaLetivo') === 3 ? 'orange' : 'gray';
    cell.className += _.get(cell, 'info.Parametro') === 'S' ? ' pointer' : '';
    if (cell.info && !_.isEmpty(cell.info.Aulas)) {
      this.createElementInfo(cell);
    } else {
      this.createEmptyElementInfo(cell);
    }
  }

  createElementInfo(cell) {
    cell.className = cell.info.DiaLetivo === 1 || cell.info.DiaLetivo === 2 || cell.info.DiaLetivo === 3 ? 'green' : 'orange';
    cell.el = (
      <div className="summary-item">
        <h4>{cell.cellNumber}</h4>
        <h5 className="summary-line box box-gray">{this.translate('planing.grid.cast_content')}</h5>
      </div>
    );
  }

  createEmptyElementInfo(cell) {
    cell.el = (
      <div className="summary-item">
        <h4>{cell.cellNumber}</h4>
      </div>
    );
  }

  createCalendarGrid() {
    const grid = [];
    let lastCell = null;
    const startDate = moment(this.state.month.date).startOf('month');
    const endDate = moment(this.state.month.date).endOf('month');
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
    if (currentCell < startCellIndex) {
      calculated = moment(startDate).subtract(startCellIndex - currentCell, 'days');
      cellNumber = calculated.date();
    } else {
      calculated = moment(startDate).add(currentCell - startCellIndex, 'days');
      cellNumber = calculated.date();
    }
    return {
      cellNumber,
      date: calculated,
    };
  }

  createItem(startDate, line, column) {
    const { cellNumber, date } = this.calculateCellNumber(startDate, line, column);
    return {
      cellNumber,
      date,
    };
  }

  render() {
    return (
      <div className="planing">
        <CalendarFilter />

      </div>
    );
  }
}

export default Calendar;
