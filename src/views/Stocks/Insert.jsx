import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl, HelpBlock, Form, InputGroup
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


class Insert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pharmacies: [],
            singleSelect: null
        }
    }



    componentWillMount() {
        fetch('https://lapr5-g6618-pharmacy-management.azurewebsites.net/api/pharmacy')
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
            })
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
                            <Card
                                title={<legend>Insert Stocks Form</legend>}
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
                                        <fieldset>
                                            <FormGroup>
                                                <ControlLabel className="col-sm-2">
                                                    Presentation ID
                                                </ControlLabel>
                                                <Col sm={4}>
                                                    <FormControl
                                                        type="text"
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
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </fieldset>
                                    </Form>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}
export default Insert;