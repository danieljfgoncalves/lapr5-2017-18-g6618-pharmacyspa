import React, { Component } from 'react';

// jQuery plugin - used for DataTables.net
import $ from 'jquery';


import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, HelpBlock, Form, InputGroup
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import Table from 'components/Table/Table.jsx';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

var config = require("../../config.js");

class Insert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pharmacies: [],
            dataTable: {
                headerRow: ["id", "Medicine", "Form", "Concentration", "PackageQtt", "MinQtt", "Qtt"],
                dataRows: []
            },
            singleSelect: null,
            lastSelected: null
        }
    }

    componentWillMount() {
        fetch('https://lapr5-g6618-pharmacy-management.azurewebsites.net/api/pharmacy', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem("token"),
                client_id: config.CLIENT_ID,
                client_secret: config.CLIENT_SECRET
            },
        })
            .then(results => {
                return results.json();
            })
            .then(data => {
                let pharmacies = data.map((pharmacy) => {
                    return {
                        value: pharmacy._id,
                        label: pharmacy.name
                    }
                });


                this.setState({ pharmacies: pharmacies });
                console.log("state", this.state.pharmacies);
            });


    }

    componentDidUpdate() {
        if (this.state.singleSelect !== null && this.state.lastSelected !== this.state.singleSelect) {
            fetch('https://lapr5-g6618-pharmacy-management.azurewebsites.net/api/pharmacy/' + this.state.singleSelect.value, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem("token"),
                    client_id: config.CLIENT_ID,
                    client_secret: config.CLIENT_SECRET
                },
            })
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    let rows = data.stocks.map((stock) => {
                        console.log("Stock", stock);
                        return [
                            stock._id,
                            stock.medicinePresentation.medicine,
                            stock.medicinePresentation.form,
                            stock.medicinePresentation.concentration,
                            stock.medicinePresentation.packageQtt,
                            stock.minQuantity,
                            stock.quantity
                        ];
                    });
                    console.log("DataRows", rows);
                    var stocks = {
                        headerRow: ["id", "Medicine", "Form", "Concentration", "PackageQtt", "MinQtt", "Qtt"],
                        dataRows: rows
                    };
                    console.log("Data", data);
                    console.log("stocks", stocks);
                    this.setState({ dataTable: stocks, lastSelected: this.state.singleSelect });

                }
                );
        }

    }

    /**render() {
        if (this.state.pharmacies.length === 0) {
            return null;
        }
        console.log("selected", this.state.singleSelect);
        console.log("last", this.state.lastSelected);
        let stocks = null;
        if (this.state.selectedStocks !== null) {
            stocks = <div className="main-content">
                <Grid fluid>
                    <Col md={12}>
                        <h4 className="title">DataTables.net</h4>
                        <p className="category">A powerful jQuery plugin handcrafted by our friends from <a href="https://datatables.net/" target="_blank" rel="noopener noreferrer">dataTables.net</a>. It is a highly flexible tool, based upon the foundations of progressive enhancement and will add advanced interaction controls to any HTML table. Please check out the <a href="https://datatables.net/manual/index" target="_blank" rel="noopener noreferrer">full documentation.</a></p>
                        <Card
                            title="DataTables.net"
                            content={
                                <div className="fresh-datatables">
                                    <table id="datatables" ref="main" className="table table-striped table-no-bordered table-hover" cellSpacing="0" width="100%" style={{ width: "100%" }}>
                                        <thead>
                                            <tr>
                                                <th>{this.state.selectedStocks.headerRow[0]}</th>
                                                <th>{this.state.selectedStocks.headerRow[1]}</th>
                                                <th>{this.state.selectedStocks.headerRow[2]}</th>
                                                <th>{this.state.selectedStocks.headerRow[3]}</th>
                                                <th>{this.state.selectedStocks.headerRow[4]}</th>
                                                <th>{this.state.selectedStocks.headerRow[5]}</th>
                                                <th>{this.state.selectedStocks.headerRow[6]}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.selectedStocks.dataRows.map((prop, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            {console.log("Key", key)}{
                                                                prop.map((prop, key) => {
                                                                    { console.log("Prop", prop) }
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
                </Grid>
            </div>
        }
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title={<legend>Check Pharmacy Stocks</legend>}
                                content={
                                    <Form horizontal>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Pharmacy
                                                </ControlLabel>
                                                <Col md={4}>
                                                    <Select
                                                        placeholder="Select Pharmacy"
                                                        name="singleSelect"
                                                        value={this.state.singleSelect}
                                                        options={this.state.pharmacies}
                                                        onChange={(value) => this.setState({ singleSelect: value })}
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                    </Form>
                                }
                            />
                        </Col>
                    </Row>
                    <Row>
                        {stocks}
                    </Row>
                </Grid>
            </div>
        )
    }*/
    render() {
        var table = null;
        if (this.state.dataTable.dataRows.length !== 0) {
            table = <Table title="Stocks" content={this.state.dataTable} />
            console.log("Table", table);
        } else {
            table = null;
        }
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title={<legend>Check Pharmacy Stocks</legend>}
                                content={
                                    <Form horizontal>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Pharmacy
                                                </ControlLabel>
                                                <Col md={4}>
                                                    <Select
                                                        placeholder="Select Pharmacy"
                                                        name="singleSelect"
                                                        value={this.state.singleSelect}
                                                        options={this.state.pharmacies}
                                                        onChange={(value) => this.setState({ singleSelect: value })}
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                    </Form>
                                }
                            />
                            {table}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
export default Insert;