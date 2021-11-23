import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';
// import { PayPalButton } from "react-paypal-button-v2";

let userName = "";
let passWord = "";

const json = localStorage.getItem("account");
const saveAccount = JSON.parse(json);
if (saveAccount) {
  userName = saveAccount.userName;
  passWord = saveAccount.passWord;
}

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export default function Paypal(props) {

    const createOrder = (data, actions) => {
        // create();
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
        // cancel();
    }

    const onError = (err) => {
        handleError(err);
    }

    // let create = () => {
    //     var data = { text: 'hello, please create order for me!' };
    //     axios.post('/api/payment', data).then((res) => console.log(res.status));
    // }

    let complete = () => {
        // var data = { text: 'hello, please complete order for me!' };
        // axios.post('/api/payment', data).then((res)=>{
        //     if(res.status===200) 
        //         window.location.replace('http://localhost:3000/success');
        // })

        // var itemList = [
        //     {
        //         item_name: 'Hambuger',
        //         quantity: 2
        //     }            
        // ];
        console.log(props.orderItem);
        let itemList = props.orderItem.map((item)=>{
            return {item_name: item.dish.name, quantity: item.quantity};
        })
        var data = {
            username: userName,
            password: passWord,
            item_list: itemList
        };
        axios.post('/api/pay', data).then((res)=>{
            if(res.status===200) 
                window.location.replace('http://localhost:3000/success');
        }).catch((err)=>handleError(err))
    }

    // let cancel = () => {
    //     var data = { text: 'hello, please cancel order for me!' };
    //     axios.post('/api/payment', data).then((res) => console.log(res.status));
    // }

    let handleError = (err) => {
        console.log(err);
        window.location.replace('http://localhost:3000/fail');
    }

    return (
        <PayPalButton style={{layout:'horizontal', tagline:false, color:'gold', height:55, label:'buynow'}}
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
            onCancel={(data, actions) => onCancel(data, actions)}
            onError={err => onError(err)}
        />
    )
}
