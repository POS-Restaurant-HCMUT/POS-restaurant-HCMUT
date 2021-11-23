import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
import { data } from 'jquery';
// import { PayPalButton } from "react-paypal-button-v2";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export default function Paypal(props) {

    const createOrder = (data, actions) => {
        create();
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: (props.amount/23000).toFixed(2).toString(),
                    },
                },
            ],
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then(()=>{
            complete();
        });
    };

    const onCancel = (data, actions) => {
        cancel();
    }

    const onError = (err) => {
        handleError(err);
    }

    let create = () => {
        var data = { text: 'hello, please create order for me!' };
        axios.post('/api/payment', data).then((res) => console.log(res.status));
    }

    let complete = () => {
        var data = { text: 'hello, please complete order for me!' };
        axios.post('/api/payment', data).then((res)=>{
            if(res.status===200) 
                window.location.replace('http://localhost:3000/success');
        })
    }

    let cancel = () => {
        var data = { text: 'hello, please cancel order for me!' };
        axios.post('/api/payment', data).then((res) => console.log(res.status));
    }

    let handleError = (err) => {
        console.log(err);
        window.location.replace('http://localhost:3000/fail');
    }

    return (
        <PayPalButton
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
            onCancel={(data, actions) => onCancel(data, actions)}
            onError={err => onError(err)}
        />
    )
}
