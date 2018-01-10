import React, { Component } from 'react';
import {
    Grid, Row, Col,
    Accordion, PanelGroup, Panel,
    FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';
import Button from 'elements/CustomButton/CustomButton.jsx';
import Card from 'components/Card/Card.jsx';
import FormInputs from 'components/FormInputs/FormInputs.jsx';
import Table from 'components/Table/Table.jsx';
import SweetAlert from 'react-bootstrap-sweetalert';
import Select from 'react-select';
import { Link } from 'react-router-dom'

class Prescription extends Component {

    mapFills() {
        try {
            console.log("MAP");
            return (this.props.prescription.fills.map((fill) => {
                return [
                    fill.date,
                    fill.quantity
                ];
            }));
        } catch (error) {
            return null;
        }
    }

    render() {
        var handler = this.props.handler;
        var table = null;
        if (this.props.prescription.fills.length !== 0) {
            var data = this.mapFills();
            table = <Table id={this.props.prescription._id} content={{ headerRow: ["Date", "Qtt"], dataRows: data }} />
        } else {
            table = <p>Prescription has never been filled</p>;
        }
        return (
            <PanelGroup id="accordion" ref="panels" onClick={() => this.forceUpdate()}>
                <Panel
                    collapsible
                    header={
                        <div>
                            Prescription : {this.props.prescription._id}
                            <b className="caret"></b>
                        </div>
                    }
                    eventKey="1">
                    <Card
                        content={<div>
                            <FormInputs
                                ncols={["col-md-3", "col-md-3", "col-md-2", "col-md-4"]}
                                proprieties={[
                                    {
                                        label: "Drug",
                                        type: "text",
                                        bsClass: "form-control",
                                        placeholder: "Drug",
                                        value: this.props.prescription.drug,
                                        disabled: true
                                    },
                                    {
                                        label: "Medicine",
                                        type: "text",
                                        bsClass: "form-control",
                                        placeholder: "Medicine",
                                        value: this.props.prescription.medicine,
                                        disabled: true
                                    },
                                    {
                                        label: "Qtt",
                                        type: "text",
                                        bsClass: "form-control",
                                        placeholder: "Qtt",
                                        value: this.props.prescription.quantity,
                                        disabled: true
                                    },
                                    {
                                        label: "Exp. Date",
                                        type: "text",
                                        bsClass: "form-control",
                                        placeholder: "Exp. Date",
                                        value: this.props.prescription.expirationDate,
                                        disabled: true
                                    }
                                ]}
                            />
                            <Panel
                                collapsible
                                header={
                                    <div>
                                        Presentation
                                    <b className="caret"></b>
                                    </div>
                                }
                                eventKey="1">
                                <FormInputs
                                    ncols={["col-md-5", "col-md-5", "col-md-2"]}
                                    proprieties={[
                                        {
                                            label: "Form",
                                            type: "text",
                                            bsClass: "form-control",
                                            placeholder: "Form",
                                            value: this.props.prescription.presentation.form,
                                            disabled: true
                                        },
                                        {
                                            label: "Concentration",
                                            type: "text",
                                            bsClass: "form-control",
                                            placeholder: "Concentration",
                                            value: this.props.prescription.presentation.concentration,
                                            disabled: true
                                        },
                                        {
                                            label: "Package Qtt",
                                            type: "text",
                                            bsClass: "form-control",
                                            placeholder: "Package Qtt",
                                            value: this.props.prescription.presentation.quantity,
                                            disabled: true
                                        }
                                    ]}
                                />
                            </Panel>
                            <Panel
                                collapsible
                                header={
                                    <div>
                                        Posology
                                    <b className="caret"></b>
                                    </div>
                                }
                                eventKey="1">
                                <FormInputs
                                    ncols={["col-md-4", "col-md-4", "col-md-4"]}
                                    proprieties={[
                                        {
                                            label: "Technique",
                                            type: "text",
                                            bsClass: "form-control",
                                            placeholder: "Technique",
                                            value: this.props.prescription.prescribedPosology.technique,
                                            disabled: true
                                        },
                                        {
                                            label: "Interval",
                                            type: "text",
                                            bsClass: "form-control",
                                            placeholder: "Interval",
                                            value: this.props.prescription.prescribedPosology.interval,
                                            disabled: true
                                        },
                                        {
                                            label: "Period",
                                            type: "text",
                                            bsClass: "form-control",
                                            placeholder: "Period",
                                            value: this.props.prescription.prescribedPosology.period,
                                            disabled: true
                                        }
                                    ]}
                                />
                            </Panel>
                            <Panel
                                collapsible
                                header={
                                    <div>
                                        Fills
                                    <b className="caret"></b>
                                    </div>
                                }
                                eventKey="1">
                                {table}
                            </Panel>
                        </div>}
                        legend={

                            < Button fill wd onClick={() => handler(this.props.prescription)}>
                                Fill Prescription
                            </Button>

                        }

                    />
                </Panel>
            </PanelGroup >
        )
    }
}

export default Prescription