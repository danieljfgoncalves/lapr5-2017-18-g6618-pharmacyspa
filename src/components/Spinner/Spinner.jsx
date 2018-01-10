import React, { Component } from 'react';

import spinner from './oval.svg';

class Spinner extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.show) {
            console.log("LOADING!");
            return (
                <div className="content text-center" >
                    <img src={spinner} />
                </div>);
        } else {
            return null;
        }
    }
}

export default Spinner;