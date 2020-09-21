import React from 'react';

import _ from 'lodash';
import './grid.panel.scss';
import BaseReactComponent from '../../utils/base.react.component';

class GridPanel extends BaseReactComponent {
  getHeader() {
    const headers = [];
    if (!_.isEmpty(this.props.columnLabels)) {
      headers.push(<th key="header-empty" className="header-empty" />);
    }
    _.forEach(this.props.header, (item, index) => {
      headers.push(<th key={`header-${index}`}>{item}</th>);
    });
    return headers;
  }

  getBody() {
    if (_.isEmpty(this.props.data)) return this.getEmptyBody();
    return this.buildBody();
  }

  getEmptyBody() {
    const lines = [];
    for (let i = 0; i < this.props.defaultLines; i++) {
      lines.push((
        <tr key={`tbody-line-${i}`}>
          {this.insertColumnLabel(i)}
          {this.createEmptyColumns(i)}
        </tr>
      ));
    }
    return lines;
  }

  insertColumnLabel(index) {
    if (!_.isEmpty(this.props.columnLabels) && this.props.columnLabels.length >= index) {
      return (
        <td key={`column-header-${index}`} className="column-header">{this.props.columnLabels[index]}</td>
      );
    }
    return null;
  }

  createEmptyColumns(line) {
    return _.map(this.props.header, (head, index) => (
      <td key={`cell-${line}-${index}`} className="gray" onMouseDown={this.props.onSelect} />
    ));
  }

  buildBody() {
    const lines = [];
    _.forEach(this.props.data, (line, indexLine) => {
      lines.push((
        <tr key={`tbody-line-${indexLine}`}>
          {this.insertColumnLabel(indexLine)}
          {this.createColumns(line, indexLine)}
        </tr>
      ));
    });
    return lines;
  }

  createColumns(line, indexLine) {
    return _.map(line, (column, indexColumn) => {
      if (column.haveContent) {
        return (
          <td key={`cell-${indexLine}-${indexColumn}`} className={column.className}>
            {column.el}
          </td>
        );
      }
      return (
        <td key={`cell-${indexLine}-${indexColumn}`} className={column.className}>
          {column.el}
        </td>
      );
    });
  }

  onSelect(column) {
    return () => {
      this.props.onSelect(column);
    };
  }

  getTableGrid() {
    return (
      <table>
        <thead>
          <tr>
            {this.getHeader()}
          </tr>
        </thead>
        <tbody>
          {this.getBody()}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div className="grid-panel">
        {this.getTableGrid()}
      </div>
    );
  }
}

export default GridPanel;
