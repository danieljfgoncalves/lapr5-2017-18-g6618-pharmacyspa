import React, { Component } from 'react';

import 'react-select/dist/react-select.css';
var config = require("../../config.js");

class Information extends Component {
    constructor(props) {
        super(props);

    }



}
export function getSalesInfo() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve()
        }, 100000)

        fetch('https://lapr5-g6618-pharmacy-management.azurewebsites.net/api/pharmacy/' + localStorage.pharmacy_id + "/sale", {
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

                let sales = data.map((sale) => {

                    return [
                        sale._id,
                        sale.receiptId,
                        sale.prescriptionId,
                        sale.prescription.medicinePresentation.medicine,
                        sale.prescription.medicinePresentation.form,
                        sale.prescription.medicinePresentation.concentration,
                        sale.prescription.medicinePresentation.packageQtt,
                        sale.quantity,
                        sale.date
                    ];
                });
                resolve(sales);
            }).catch(error => { })
    })
}

export function getOrdersInfo() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve()
        }, 100000)

        fetch('https://lapr5-g6618-pharmacy-management.azurewebsites.net/api/pharmacy/' + localStorage.pharmacy_id + "/order", {
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

                let orders = data.map((order) => {

                    return [
                        order._id,
                        order.date,
                        order.medicinePresentation.medicine,
                        order.medicinePresentation.form,
                        order.medicinePresentation.concentration,
                        order.medicinePresentation.packageQtt,
                        order.qttNeeded,
                        order.period_day
                    ];
                });
                resolve(orders);
            }).catch(error => { });
    })
}
export function getStockInfo() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve()
        }, 100000)

        fetch('https://lapr5-g6618-pharmacy-management.azurewebsites.net/api/pharmacy/' + localStorage.pharmacy_id, {
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
                let stocks = data.stocks.map((stock) => {

                    return [
                        stock._id,
                        stock.medicinePresentation.medicine,
                        stock.medicinePresentation.form,
                        stock.medicinePresentation.concentration,
                        stock.medicinePresentation.packageQtt,
                        stock.minQuantity,
                        stock.quantity
                    ];
                });
                resolve(stocks);
            }
            ).catch(error => { resolve(null) });
    })
}

export default Information;
