import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import Button from 'elements/CustomButton/CustomButton.jsx';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: null,
            show: false
        }
        this.hideAlert = this.hideAlert.bind(this);
    }
    basicAlert() {
        this.setState({
            alert: (
                <SweetAlert
                    style={{ display: "block", marginTop: "-100px" }}
                    title="Authors"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnBsStyle="info"

                >
                    <ul className="list-unstyled">
                        <li>Pedro Fernandes (1060503)</li>
                        <li>Renato Oliveira (1140822)</li>
                        <li>Flávio Relvas (1140826)</li>
                        <li>Tiago Correia (1151031)</li>
                        <li>Diana Silva (1151088)</li>
                        <li>Ivo Ferro (1151159)</li>
                        <li>Daniel Gonçalves (1151452)</li>
                    </ul>
                </SweetAlert>

            )
        });
    }
    hideAlert() {
        this.setState({
            alert: null
        });
    }

    render() {
        return (
            <footer className={"footer" + (this.props.transparent !== undefined ? " footer-transparent" : "")}>
                <div className={"container" + (this.props.fluid !== undefined ? "-fluid" : "")}>{this.state.alert}
                    <p className="copyright pull-right">
                        &copy; Pharmacy Management Front-End -  {1900 + (new Date()).getYear()} <a>LAPR5-6618</a>
                        &nbsp; &nbsp;<Button onClick={this.basicAlert.bind(this)}>Authors</Button>
                    </p>
                </div>
            </footer>
        );
    }
}
export default Footer;
