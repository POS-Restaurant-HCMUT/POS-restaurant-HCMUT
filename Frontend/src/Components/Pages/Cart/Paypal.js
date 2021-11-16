import React, {useRef, useEffect, useState} from 'react';
import axios from 'axios'

export default function Paypal(props) {
    const paypal = useRef();
    const exchangeRate = 23000; // 1USD = 23000 VND

    let createOrder = () => {
        var data = {text: 'hello, please create order for me!'};
        axios.post('/api/payment',data).then((res)=>console.log(res.status));
    }

    let completeOrder = () => {
        var data = {text: 'hello, please complete order for me!'};
        axios.post('/api/payment',data)
            .then((res)=>{
                console.log(res.status);
                window.location.replace('http://localhost:3000/success');
            });
    }

    let cancelOrder = () => {
        var data = {text: 'hello, please cancel order for me!'};
        axios.post('/api/payment',data).then((res)=>console.log(res.status));
    }

    let handleError = (err) => {
        console.log(err);
        window.location.replace('http://localhost:3000/fail');
    }

    useEffect(()=>{
        window.paypal.Buttons({
            style: {
                color:  'blue',
                shape:  'pill',
                label:  'pay',
                height: 40
            },

            createOrder: function(data, actions) {
                createOrder();
                return actions.order.create({
                    intent: 'CAPTURE',
                    purchase_units: [{
                        amount: {
                            value: (props.amount/exchangeRate).toFixed(2)
                        }
                    }]
                });      
            },

            onApprove: async function(data, actions) {
                return actions.order.capture().then(function(orderData) {
                    // Successful capture! For demo purposes:
                    console.log('Capture result', orderData);
                    completeOrder();
                    // var transaction = orderData.purchase_units[0].payments.captures[0];                
                });
            },

            onCancel: async function(){
                cancelOrder()
            },

            onError: (err)=>{
                cancelOrder();
                handleError(err);
            }

        }).render(paypal.current);
    }, [])

    return (
        <div ref={paypal} style={props.style}></div>
    )
}
