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

class Consult extends Component {
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
            fetch('https://lapr5-g6618-pharmacy-management.azurewebsites.net/api/pharmacy/' + this.state.singleSelect.value + "/sale", {
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
                    try {
                        let rows = data.stocks.map((stock) => {
                            console.log("Stock", stock);
                            return [
                                stock._id,
                                stock.receiptId,
                                stock.prescriptionId,
                                stock.prescription.medicinePresentation.medicine,
                                stock.prescription.medicinePresentation.form,
                                stock.prescription.medicinePresentation.concentration,
                                stock.prescription.medicinePresentation.packageQtt,
                                stock.quantity,
                                stock.date
                            ];
                        });
                        console.log("DataRows", rows);
                        var stocks = {
                            headerRow: ["id", "Medicine", "Form", "Concentration", "PackageQtt", "Qtt", "Date"],
                            dataRows: rows
                        };
                        console.log("Data", data);
                        console.log("stocks", stocks);
                        this.setState({ dataTable: stocks, lastSelected: this.state.singleSelect });

                    } catch (err) {
                        console.log("No logs");
                    }
                }
                );
        }

    }

    render() {
        var table = null;
        if (this.state.dataTable.dataRows.length !== 0) {
            table = <Table content={this.state.dataTable} />
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
                                title={<legend>Check Pharmacy Logs</legend>}
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
export default Consult;
