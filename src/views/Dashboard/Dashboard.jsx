import React, { Component } from 'react';
import { React3 } from 'react'
import { Grid, Col, Row } from 'react-bootstrap';
// react component used to create charts
import ChartistGraph from 'react-chartist';
// function that returns a color based on an interval of numbers
import { scaleLinear } from "d3-scale";

import {getStockInfo,getSalesInfo, getOrdersInfo} from '../../components/Information/Information';
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
import Simple from '../../components/Boards/Simple';

const colorScale = scaleLinear()
    .domain([0, 1, 6820])
    .range(["#E5E5E5", "#B2B2B2", "#000000"]);

var salesData;
var stocksData;
var ordersData;
var options = {

};

class Dashboard extends Component {

    componentWillMount()
    {


        getStockInfo().then((stock_info) =>{

            var series1 = [];
            var series2 = [];
            var data = {
                labels: [],
                series: []
            };
            for(var i = 0; i < stock_info.length;i++)
            {
                data.labels.push(stock_info[i][1] + " min/current stock");

                series1.push(stock_info[i][5]);
                series2.push(stock_info[i][6]);
            }
            data.series.push(series1);
            data.series.push(series2);
            stocksData = data;

            this.setState({ stocksData });

        });
        getSalesInfo().then((sales_info) =>{
            var series1 = [];
            var map = [];
            var data = {
                labels: [],
                series: []
            };

            for(var i = 0; i < sales_info.length;i++)
            {

                if(data.labels.indexOf(sales_info[i][3]) == -1)
                {
                    data.labels.push(sales_info[i][3]);
                    map[sales_info[i][3]] = sales_info[i][7];
                }
                else{
                    map[sales_info[i][3]] += sales_info[i][7];
                }
            }

            for(var i = 0 ; i < data.labels.length;i++)
            {
                series1.push(map[data.labels[i]]);
            }

            data.series.push(series1);

            salesData = data;

            this.setState({ salesData });
        });
        getOrdersInfo().then((orders_info) =>{
            var map = [];
            var series1 = [];

            var data = {
                labels: [],
                series: []
            };
            console.log(orders_info);
            for(var i = 0; i < orders_info.length;i++)
            {
                var formatedDate = orders_info[i][1].split("T")[0];
                if(data.labels.indexOf(formatedDate) == -1) {
                    data.labels.push(formatedDate);
                    map[formatedDate] = 0;
                }

            }
            for(var i = 0; i < orders_info.length;i++)
            {
                var formatedDate = orders_info[i][1].split("T")[0];
                map[formatedDate] += orders_info[i][6];
            }
            console.log(map);
            for(var i = 0 ; i < data.labels.length;i++)
            {

                series1.push(map[data.labels[i]]);
            }
            data.series.push(series1);

            ordersData = data;


            this.setState({ ordersData });

        });

    }
    render() {



        var type = 'Bar'
       // console.log(data);

        return (
          <div>
            <Card
                title={<legend>Stock information - Quantity overview</legend>}
                content={

                    <ChartistGraph data={stocksData} options={options} type={type}/>

                }
            />
          <Card
              title={<legend>Sales information - Quantity sold</legend>}
              content={

                  <ChartistGraph data={salesData} options={options} type={type}/>

              }
          />
          <Card
              title={<legend>Orders information - Overview by date</legend>}
              content={

                  <ChartistGraph data={ordersData} options={options} type='Line'/>

              }
          />

          </div>



        );







    }

}

export default Dashboard;
