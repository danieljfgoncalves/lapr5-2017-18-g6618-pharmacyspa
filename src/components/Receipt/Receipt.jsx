import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';
import Button from 'elements/CustomButton/CustomButton.jsx';
import Card from 'components/Card/Card.jsx';
import FormInputs from 'components/FormInputs/FormInputs.jsx';
import Prescription from './Prescription';

class Receipt extends Component {
    render() {
        var presc;
        if (this.props.receipt !== null) {
            console.log("Received Receipt", this.props.receipt);
            let prescriptions = this.props.receipt.prescriptions;
            presc = this.props.receipt.prescriptions.map((prescription, key) => {
                return (
                    <Prescription key={key} prescription={prescription} handler={this.props.handleFillPrescription} />
                );
            });
        }

        return (
            <Card
                title={<legend> Medical Receipt </legend>}
                content={
                    <div>
                        <FormInputs
                            ncols={["col-md-6", "col-md-6"]}
                            proprieties={[
                                {
                                    label: "Patient",
                                    type: "text",
                                    bsClass: "form-control",
                                    placeholder: "Patient",
                                    value: this.props.receipt.patient.username,
                                    disabled: true
                                },
                                {
                                    label: "Physician",
                                    type: "text",
                                    bsClass: "form-control",
                                    placeholder: "Physician",
                                    value: this.props.receipt.physician.username,
                                    disabled: true
                                }
                            ]}
                        />
                        {presc}
                    </div>
                } text-Center

            />
        );
    }
}

export default Receipt; 