import React, { Component } from 'react';

// jQuery plugin - used for DataTables.net
import $ from 'jquery';


import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, HelpBlock, Form, InputGroup
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


// DataTables.net plugin - creates a tables with actions on it
require('datatables.net-responsive');
$.DataTable = require('datatables.net-bs');

class Table extends Component {
    constructor(props, state) {
        super(props);
        this.state = {
            dataTable: {
                headerRow: this.props.content.headerRow,
                dataRows: this.props.content.dataRows
            }
        }
    }
    componentDidMount() {

        // $(this.refs.main).DataTable({
        //     dom: '<"data-table-wrapper"t>',
        //     data: this.props.names,
        //     columns,
        //     ordering: false
        // });
        $("#" + this.props.id).DataTable({
            "pagingType": "full_numbers",
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            responsive: true,
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Search records",
            }
        });
        var table = $('#' + this.props.id).DataTable();
    }
    componentWillUnmount() {
        $('.data-table-wrapper')
            .find('table')
            .DataTable()
            .destroy(true);
    }
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return <Col md={12}>
            <Card
                title={this.props.title}
                content={
                    <div className="fresh-datatables">
                        <table id="datatables" ref="main" className="table table-striped table-no-bordered table-hover" cellSpacing="0" width="100%" style={{ width: "100%" }}>
                            <thead>
                                <tr>
                                    {this.state.dataTable.headerRow.map((header, key) => {
                                        return (<th key={key}>{header}</th>)
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.dataTable.dataRows.map((prop, key) => {
                                        return (
                                            <tr key={key}>
                                                {
                                                    prop.map((prop, key) => {
                                                        return (
                                                            <td key={key}>{prop}</td>
                                                        );
                                                    })
                                                }
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                }
            />
        </Col>
    }
}

export default Table;