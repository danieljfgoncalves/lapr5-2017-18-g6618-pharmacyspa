import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, Form
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import Receipt from 'components/Receipt/Receipt.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import 'react-select/dist/react-select.css';
import FormInputs from 'components/FormInputs/FormInputs.jsx';
import Select from 'react-select';
import Spinner from 'components/Spinner/Spinner.jsx';
import SweetAlert from 'react-bootstrap-sweetalert';

var config = require("../../config.js")

class NewSale extends Component {
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
            lastPresentation: null,
            receipt: null,
            prescription: null,
            loading: false,
            alert: null,
        }
        this.hideAlert = this.hideAlert.bind(this);
        this.handleFillPrescription = this.handleFillPrescription.bind(this)


    }
    resetState() {
        this.setState({
            presentationsDisabled: true,
            medicinesDisabled: true,
            pharmacies: [],
            presentations: [],
            medicines: [],
            singleSelect: null,
            selectedPresentation: null,
            selectedMedicine: null,
            lastSelected: null,
            lastPresentation: null,
            receipt: null,
            prescription: null,
            loading: false,
            alert: null,
        })
    }
    hideAlert() {
        this.setState({
            alert: null
        });
        //setTimeout(window.location.reload(), 2000);
    }

    failAlert() {
        this.setState({
            alert: (
                <SweetAlert
                    success={false}
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Failed!"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnBsStyle="info"
                >
                    {this.state.alertMessage}
                </SweetAlert>
            )
        });
    }
    successAlert() {
        this.setState({
            alert: (
                <SweetAlert
                    success
                    style={{ display: "block" }}
                    title="Created!"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnBsStyle="info"
                >
                    This operation was successfull.
                </SweetAlert>
            )
        });
    }
    handleSubmitFill(event) {
        event.preventDefault();
        if (this.qtt === null || this.state.selectedMedicine === null) {
            this.setState({ loading: false, alertMessage: "All fields must be filled." });
            this.failAlert();
        } else {
            this.setState({ loading: true });
            console.log("REQUEST", {
                id_pharmacy: localStorage.pharmacy_id,
                quantity: this.qtt.value,
                prescription: {
                    receiptId: this.state.receipt.id,
                    prescriptionId: this.state.prescription._id,
                    medicinePresentation: {
                        id_medicine: this.state.selectedMedicine.value,
                        id_presentation: this.state.prescription.presentation._id
                    }
                }
            });
            fetch('https://lapr5-g6618-pharmacy-management.azurewebsites.net/api/sale', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem("token"),
                    client_id: config.CLIENT_ID,
                    client_secret: config.CLIENT_SECRET
                },
                body: JSON.stringify({
                    id_pharmacy: localStorage.pharmacy_id,
                    quantity: this.qtt.value,
                    prescription: {
                        receiptId: this.state.receipt._id,
                        prescriptionId: this.state.prescription._id,
                        medicinePresentation: {
                            id_medicine: this.state.selectedMedicine.value,
                            id_presentation: this.state.prescription.presentation._id
                        }
                    }
                }),
            }).then(results => {
                return results.json();
            }).then(data => {
                try {
                    if (data.message === "Sale Created") {
                        this.setState({ loading: false });
                        this.successAlert();
                    } else {
                        this.setState({ loading: false, alertMessage: data.message });
                        this.failAlert();
                    }
                } catch (err) {
                    console.log("Error getting medicines", err);
                }
            }).catch(error => {
                this.setState({ loading: false, alertMessage: "Error loading receipt." });
                this.failAlert();
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.resetState();
        console.log(event);
        if (this.mrid === null) {
            alert("BAD INFO");
        } else {
            this.setState({ loading: true });
            //todo validate qtd
            //console.log("Selected Presentation", this.state.selectedPresentation);
            //console.log("Selected Medicine", this.state.selectedMedicine);
            fetch('https://lapr5-g6618-pharmacy-management.azurewebsites.net/api/receipt/' + this.mrid.value, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem("token"),
                    client_id: config.CLIENT_ID,
                    client_secret: config.CLIENT_SECRET
                },
            }).then(results => {
                console.log(results);
                return results.json();
            }).then(data => {
                try {
                    console.log(data.error);
                    if (data.error === undefined) {
                        this.setState({ receipt: data, loading: false })
                        console.log("Receipt", data);
                    } else {
                        this.setState({ loading: false, alertMessage: "Error loading receipt." });
                        this.failAlert();
                    }
                } catch (err) {
                    console.log("Error getting receipt", err);
                }
            }).catch(error => {
                this.setState({ loading: false, alertMessage: "Error loading receipt." });
                this.failAlert();
            });
        }
    }

    handleFillPrescription(prescription) {
        this.setState({
            prescription: prescription
        })
    }

    componentWillMount() {

    }
    componentDidUpdate() {
        if (this.state.prescription !== null && this.state.selectedPresentation === null) {
            this.setState({ selectedPresentation: this.state.prescription.presentation, loading: true });
            fetch('https://lapr5-g6618-pharmacy-management.azurewebsites.net/api/medicinePresentation/' + this.state.prescription.presentation._id, {
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
                        console.log("Presentation", this.state.selectedPresentation);
                        console.log("Data", data);
                        let med = data.medicines.map((medicine) => {
                            return {
                                value: medicine.id,
                                label: medicine.name
                            };
                        });

                        console.log("Medicines", med);
                        this.setState({ medicines: med, medicinesDisabled: false, loading: false });
                    } catch (err) {
                        console.log("Error getting medicines", err);
                    }
                }).catch(error => {

                });
        }
    }
    render() {
        console.log("Filling", this.state.prescription);
        console.log("Medicine", this.state.selectedMedicine);
        if (this.state.prescription === null) {
            var receiptCard = null;
            if (this.state.receipt !== null) {
                receiptCard = <Receipt receipt={this.state.receipt} handleFillPrescription={this.handleFillPrescription.bind(this)} />;
            }

            return (
                <div className="main-content">
                    {this.state.alert}
                    <Grid fluid>
                        <Row>
                            <Col md={12}>
                                <Card
                                    hidden={true}
                                    title={<legend>New Sale Form</legend>}
                                    content={
                                        <form onSubmit={this.handleSubmit.bind(this)}>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2"> Medical Receipt </ControlLabel>
                                                <FormControl
                                                    placeholder="Enter medical receipt id"
                                                    type="name"
                                                    inputRef={(mrid) => this.mrid = mrid}
                                                />
                                            </FormGroup>
                                            <Button type="submit" bsStyle="info" fill wd > Check </Button>
                                            <Spinner show={this.state.loading} />
                                        </form>
                                    }
                                />
                                {receiptCard}
                            </Col>
                        </Row>

                    </Grid>
                </div >
            )
        } else {
            return (
                <div className="main-content">
                    {this.state.alert}
                    <Grid fluid>
                        <Row>
                            <Col md={12}>

                                <Card
                                    title={<legend>New Sale Form</legend>}
                                    content={
                                        <form onSubmit={this.handleSubmitFill.bind(this)}>
                                            <FormGroup>
                                                <ControlLabel>
                                                    Drug
                                                        </ControlLabel>
                                                <FormControl type="text" value={this.state.prescription.drug} disabled />
                                            </FormGroup>
                                            <FormGroup>

                                                <ControlLabel>
                                                    Medicine
                                                        </ControlLabel>
                                                <Select
                                                    placeholder="Select Medicine"
                                                    name="singleSelect2"
                                                    value={this.state.selectedMedicine}
                                                    options={this.state.medicines}
                                                    onChange={(value) => this.setState({ selectedMedicine: value })}
                                                    disabled={this.state.medicinesDisabled}
                                                />

                                            </FormGroup>
                                            <FormGroup>

                                                <ControlLabel>
                                                    Quantity
                                                        </ControlLabel>
                                                <FormControl
                                                    disabled={this.state.selectedMedicine ? false : true}
                                                    placeholder="Enter quantity to fill"
                                                    type="text"
                                                    inputRef={(qtt) => this.qtt = qtt}
                                                />

                                            </FormGroup>
                                            <Spinner show={this.state.loading} />
                                            <Button type="submit" bsStyle="info" fill wd >
                                                Fill
                                            </Button>
                                        </form>
                                    }
                                    text-Center
                                />
                            </Col>
                        </Row>
                    </Grid>
                </div>
            )
        }
    }
}
export default NewSale;