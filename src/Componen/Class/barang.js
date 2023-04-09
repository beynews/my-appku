import React, {Component} from 'react'
import {BootstrapTable, TableHeaderColumn} 
from 'react-bootstrap-table'
import '../css/Table.css'
import '../dist/react-bootstrap-table-all.min.css'
const loveMap = {
  Gob: 'Martha',
  Buster: 'Lucile 2',
}
function isExpandableRow(row) {
  return row['name'] in loveMap;
}
function expandRow(row) {
  return (
    <p>{row['name']} loves {loveMap[row['name']]}.</p> 
  );
}
class Table5 extends Component {
  render() {
    const options = {
      expandRowBgColor: 'pink',
      expanding: [1] // initially expanded 
    }
    return (
      <div>
        <BootstrapTable data={this.props.data}
                        expandableRow={isExpandableRow}
                        expandComponent={expandRow}
                        expandColumnOptions={ 
                            {expandColumnVisible: true}}
                        options={options}
        >
          <TableHeaderColumn isKey dataField='id'
          >
            ID
          </TableHeaderColumn> 
          <TableHeaderColumn dataField='name'
          >
            Name
          </TableHeaderColumn> 
          <TableHeaderColumn dataField='value'
          >
            Value
          </TableHeaderColumn> 
        </BootstrapTable> 
      </div> 
    )
  }
}
export default Table5