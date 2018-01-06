import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';

import Button from 'elements/CustomButton/CustomButton.jsx';
import Checkbox from 'elements/CustomCheckbox/CustomCheckbox.jsx';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardHidden: true,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        setTimeout(function () { this.setState({ cardHidden: false }); }.bind(this), 700);
    }

    handleSubmit(event) {
        alert('A email was submitted: ' + this.email.value + ' Password: ' + this.password.value);
        event.preventDefault();
        fetch('http://lapr5-g6618-receipts-management.azurewebsites.net/api/authenticate', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.email.value,
                password: this.password.value,
            }),
        }).then(results => {
            return results.json();
        })
            .then(data => {
                
            })
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col md={4} sm={6} mdOffset={4} smOffset={3}>
                        <form onSubmit={this.handleSubmit}>
                            <Card
                                hidden={this.state.cardHidden}
                                textCenter
                                title="Login"
                                content={
                                    <div>
                                        <FormGroup>
                                            <ControlLabel>
                                                Email address
                                            </ControlLabel>
                                            <FormControl
                                                placeholder="Enter email"
                                                type="name"
                                                inputRef={(email) => this.email = email}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>
                                                Password
                                            </ControlLabel>
                                            <FormControl
                                                placeholder="Password"
                                                type="password"
                                                inputRef={(password) => this.password = password}
                                            />
                                        </FormGroup>
                                    </div>
                                }
                                legend={
                                    <Button type="submit" bsStyle="info" fill wd >
                                        Login
                                    </Button>
                                }
                                ftTextCenter
                            />
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default LoginPage;
