import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, HelpBlock, Form, InputGroup
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import Select from 'react-select';
import Button from 'elements/CustomButton/CustomButton.jsx';
import 'react-select/dist/react-select.css';
var config = require("../../config.js")

class Insert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            presentationsDisabled: true,
            medicinesDisabled: true,
            pharmacies: [],
            presentations: [],
            medicines: [],
            singleSelect: null,
            selectedPresentation: null,
            selectedMedicine: null,
            lastSelected: null,
            lastPresentation: null
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(event);
        if (this.state.singleSelect == null || this.state.selectedPresentation == null || this.state.selectedMedicine == null || this.qtd == null) {
            alert("BAD INFO");
        } else {
            //todo validate qtd
            //console.log("Selected Presentation", this.state.selectedPresentation);
            //console.log("Selected Medicine", this.state.selectedMedicine);
            fetch('https://lapr5-g6618-pharmacy-management.azurewebsites.net/api/restock', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem("token"),
                    client_id: config.CLIENT_ID,
                    client_secret: config.CLIENT_SECRET
                },
                body: JSON.stringify({
                    id_pharmacy: this.state.singleSelect.value,
                    quantity: this.qtd.value,
                    medicinePresentation: {
                        id_medicine: this.state.selectedMedicine.value,
                        id_presentation: this.state.selectedPresentation.value
                    }
                }),
            }).then(results => {
                return results.json();
            }).then(data => {
                try {
                    if (data.message == "Restock Created") {
                        alert("Successfull!");
                    }
                } catch (err) {
                    console.log("Error getting medicines", err);
                }
            });
        }
    }

    componentWillMount() {

        fetch('https://lapr5-g6618-pharmacy-management.azurewebsites.net/api/pharmacy/' + localStorage.pharmacy_id, {
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


                this.setState({
                    pharmacies: [{
                        value: data._id,
                        label: data.name
                    }]
                });
                console.log("state", this.state.pharmacies);
            });


        fetch('https://lapr5-g6618-pharmacy-management.azurewebsites.net/api/medicinePresentation', {
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
                console.log("PRESENTATIONS", data);
                let presentations = data.map((presentation) => {
                    return {
                        value: presentation.id,
                        label: presentation.drug.name + ", " + presentation.form + ", " + presentation.concentration + ", " + presentation.packageQuantity + " uni."
                    }
                })
                console.log("Presentations", presentations);
                this.setState({ presentations: presentations });
            });
    }
    componentDidUpdate() {
        if (this.state.singleSelect !== null && this.state.lastSelected !== this.state.singleSelect) {
            if (this.setState.presentationsDisabled !== false)
                this.setState({ lastSelected: this.state.singleSelect, presentationsDisabled: false });
        }
        if (this.state.selectedPresentation !== null && this.state.lastPresentation !== this.state.selectedPresentation) {
            fetch('https://lapr5-g6618-pharmacy-management.azurewebsites.net/api/medicinePresentation/' + this.state.selectedPresentation.value, {
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
                        console.log("Medicine", this.state.selectedPresentation);
                        console.log("Data", data);
                        let med = data.medicines.map((medicine) => {
                            return {
                                value: medicine.id,
                                label: medicine.name
                            };
                        });

                        console.log("Medicines", med);
                        this.setState({ lastPresentation: this.state.selectedPresentation, medicines: med, medicinesDisabled: false });
                    } catch (err) {
                        console.log("Error getting medicines", err);
                    }
                });
        }
    }
    render() {
        if (this.state.pharmacies.length === 0) {
            return null;
        }

        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                <Card
                                    title={<legend>Insert Stocks Form</legend>}
                                    content={<div>
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
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Presentation
                                                </ControlLabel>
                                                <Col sm={4}>
                                                    <Select
                                                        placeholder="Select Drug"
                                                        name="singleSelect2"
                                                        value={this.state.selectedPresentation}
                                                        options={this.state.presentations}
                                                        onChange={(value) => this.setState({ selectedPresentation: value })}
                                                        disabled={this.state.presentationsDisabled}
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Medicine
                                                </ControlLabel>
                                                <Col sm={4}>
                                                    <Select
                                                        placeholder="Select Medicine"
                                                        name="singleSelect2"
                                                        value={this.state.selectedMedicine}
                                                        options={this.state.medicines}
                                                        onChange={(value) => this.setState({ selectedMedicine: value })}
                                                        disabled={this.state.medicinesDisabled}
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Quantity
                                                </ControlLabel>
                                                <Col sm={4}>
                                                    <FormControl
                                                        placeholder="1"
                                                        type="text"
                                                        inputRef={(qtd) => this.qtd = qtd}
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                    </div>}
                                    legend={
                                        <Button type="submit" bsStyle="info" fill wd >
                                            Insert
                                    </Button>
                                    }

                                />
                            </Form>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}
export default Insert;