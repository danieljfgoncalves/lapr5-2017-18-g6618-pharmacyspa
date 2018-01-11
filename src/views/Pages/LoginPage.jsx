import React, { Text, Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';

import Button from 'elements/CustomButton/CustomButton.jsx';
import Checkbox from 'elements/CustomCheckbox/CustomCheckbox.jsx';
import * as jwt_decode from 'jwt-decode';
import Spinner from 'components/Spinner/Spinner.jsx';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardHidden: true,
            cardHidden2: true,
            cardTitle: "Login Failed",
            loading: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        setTimeout(function () { this.setState({ cardHidden: false }); }.bind(this), 700);
    }

    componentWillMount() {
        localStorage.clear();
    }

    handleSubmit(event) {
        //alert('A email was submitted: ' + this.email.value + ' Password: ' + this.password.value);
        event.preventDefault();
        this.setState({ loading: true });
        fetch('https://lapr5-g6618-receipts-management.azurewebsites.net/api/authenticate', {
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
            if (results.status !== 500)
                return results.json();
            else
                return null;
        }).then(data => {
            if (data !== null) {
                const tokenDecoded = jwt_decode(data.token);
                let userInfo = {
                    id: tokenDecoded.sub,
                    name: tokenDecoded["https://lapr5.isep.pt/username"],
                    email: tokenDecoded["https://lapr5.isep.pt/email"],
                    pharmacy: tokenDecoded["https://lapr5.isep.pt/user_info"].pharmacy_id,
                    roles: tokenDecoded["https://lapr5.isep.pt/roles"]
                }
                if (userInfo.roles.includes("pharmacist")) {
                    localStorage.setItem("token", data.token_type + " " + data.token);
                    localStorage.setItem("pharmacy_id", userInfo.pharmacy);
                    //localStorage.setItem("pharmacy_id", "5a3eb5857250df36a8a828cc");

                    localStorage.setItem("user", userInfo.name);


                    this.setState({ cardHidden2: false, cardTitle: "Login Sucessful", loading: false })
                    setTimeout(function () { this.props.history.push('/dashboard') }.bind(this), 1000);
                } else {
                    this.setState({ cardHidden2: false, cardTitle: "Login Failed", loading: false })
                }
            } else {
                this.setState({ cardHidden2: false, cardTitle: "Login Failed", loading: false })
            }
        }).catch(error => {
            this.setState({ cardHidden2: false, cardTitle: "Login Failed", loading: false })
        })
    }

    render() {
        /**
        if (this.state.loading) {
            return <Spinner />
        }*/
        return (
            < Grid >
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
                                    <div>
                                        <Spinner show={this.state.loading} />
                                        <Button type="submit" bsStyle="info" fill wd >
                                            Login
                                        </Button>
                                    </div>
                                } ftTextCenter

                            />

                            <Card
                                hidden={this.state.cardHidden2}
                                textCenter
                                content={<div className="text-center"><b>{this.state.cardTitle}</b></div>}
                            />
                        </form>
                    </Col>
                </Row>
            </Grid >
        );
    }
}

export default LoginPage;
