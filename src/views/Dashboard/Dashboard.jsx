import React, { Component } from 'react';
import { React3 } from 'react'
import { Grid, Col, Row } from 'react-bootstrap';
// react component used to create charts
import ChartistGraph from 'react-chartist';
// function that returns a color based on an interval of numbers
import { scaleLinear } from "d3-scale";
import Spinner from 'components/Spinner/Spinner.jsx';
import { getStockInfo, getSalesInfo, getOrdersInfo } from '../../components/Information/Information';
import $ from 'jquery';

// react components used to create a SVG / Vector map
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
} from "react-simple-maps";

import Card from 'components/Card/Card.jsx';
import StatsCard from 'components/Card/StatsCard.jsx';
import Tasks from 'components/Tasks/Tasks.jsx';
import SweetAlert from 'react-bootstrap-sweetalert';

import THREE from 'react-three-renderer'

import {
    dataPie,
    dataSales,
    optionsSales,
    responsiveSales,
    dataBar,
    optionsBar,
    responsiveBar,
    table_data
} from 'variables/Variables.jsx';


const colorScale = scaleLinear()
    .domain([0, 1, 6820])
    .range(["#E5E5E5", "#B2B2B2", "#000000"]);

var salesData;
var stocksData;
var ordersData;
var options = {

};

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth,
            loading1: false,
            loading2: false,
            loading3: false,
            alert: null,
            alertMessage: null,

        }
        this.hideAlert = this.hideAlert.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    handleResize(e) {
        this.setState({
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth
        })
    };
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
    componentWillMount() {

        this.setState({ loading1: true });
        getStockInfo().then((stock_info) => {

            var series1 = [];
            var series2 = [];
            var data = {
                labels: [],
                series: []
            };
            for (var i = 0; i < stock_info.length; i++) {
                data.labels.push(stock_info[i][1] + " min/current stock");

                series1.push(stock_info[i][5]);
                series2.push(stock_info[i][6]);
            }
            data.series.push(series1);
            data.series.push(series2);
            stocksData = data;

            this.setState({ stocksData, loading1: false });

        }).catch(error => {
            this.setState({ loading1: false, alertMessage: "Error loading stock logs." });
            this.failAlert();
        });

        this.setState({ loading2: true });
        getSalesInfo().then((sales_info) => {
            var series1 = [];
            var map = [];
            var data = {
                labels: [],
                series: []
            };

            for (var i = 0; i < sales_info.length; i++) {

                if (data.labels.indexOf(sales_info[i][3]) == -1) {
                    data.labels.push(sales_info[i][3]);
                    map[sales_info[i][3]] = sales_info[i][7];
                }
                else {
                    map[sales_info[i][3]] += sales_info[i][7];
                }
            }

            for (var i = 0; i < data.labels.length; i++) {
                series1.push(map[data.labels[i]]);
            }

            data.series.push(series1);

            salesData = data;

            this.setState({ salesData, loading2: false });
        }).catch(error => {
            this.setState({ loading2: false, alertMessage: "Error loading sale logs." });
            this.failAlert();
        });

        this.setState({ loading3: true })
        getOrdersInfo().then((orders_info) => {
            var map = [];
            var series1 = [];

            var data = {
                labels: [],
                series: []
            };
            console.log(orders_info);
            for (var i = 0; i < orders_info.length; i++) {
                var formatedDate = orders_info[i][1].split("T")[0];
                if (data.labels.indexOf(formatedDate) == -1) {
                    data.labels.push(formatedDate);
                    map[formatedDate] = 0;
                }

            }
            for (var i = 0; i < orders_info.length; i++) {
                var formatedDate = orders_info[i][1].split("T")[0];
                map[formatedDate] += orders_info[i][6];
            }
            console.log(map);
            for (var i = 0; i < data.labels.length; i++) {

                series1.push(map[data.labels[i]]);
            }
            data.series.push(series1);

            ordersData = data;


            this.setState({ ordersData, loading3: false });

        }).catch(error => {
            this.setState({ loading3: false, alertMessage: "Error loading order logs." });
            this.failAlert();
        });

    }



    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }


    render() {



        var type = 'Bar'
        // console.log(data);

        return (

            <div className="main-content">
                {this.state.alert}
                <Card
                    title={<legend>Stock information - Quantity overview</legend>}
                    content={
                        <div>
                            {this.state.loading1 ? <Spinner show={this.state.loading1} /> :
                                <ChartistGraph data={stocksData} options={options} type={type} />}
                        </div>
                    }
                />
                <Card
                    title={<legend>Sales information - Quantity sold</legend>}
                    content={
                        <div>
                            {this.state.loading2 ? <Spinner show={this.state.loading2} /> :
                                <ChartistGraph data={salesData} options={options} type={type} />}
                        </div>
                    }
                />
                <Card
                    title={<legend>Orders information - Overview by date</legend>}
                    content={
                        <div>
                            {this.state.loading3 ? <Spinner show={this.state.loading3} /> :
                                <ChartistGraph data={ordersData} options={options} type='Line' />}
                        </div>
                    }
                />

            </div>


        );







    }

}

export default Dashboard;
