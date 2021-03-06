import { useState } from 'react';
import './DishesCard.css';
import axios from "axios";
import { store } from 'react-notifications-component';

let userName = "";
let passWord = "";

const json = localStorage.getItem("account");
const saveAccount = JSON.parse(json);
if (saveAccount) {
  userName = saveAccount.userName;
  passWord = saveAccount.passWord;
}

export function DishesCard(props) {
    const [quantity, setQuantity] = useState(1);
    
    const addToCart = (dish, quantity) => {
        if (userName === "" || passWord === "") {
          alert("Please sign in to add to cart!");
        } else {
            axios.post("api/update-cart", {
                username: userName,
                password: passWord,
                dish: dish.name,
                quantity: quantity,
            }).then(function (response) {
                console.log(response);
                store.addNotification({
                    title: "Notify",
                    message: `Successfully added ${dish.name} to your cart!`,
                    type: "info",
                    insert: "top",
                    container: "bottom-left",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 2000,
                      onScreen: true
                    },
                    width: 300
                  });
            }).catch(function (error) {
                store.addNotification({
                    title: "Error",
                    message: `Add ${dish.name} to your cart fail!`,
                    type: "danger",
                    insert: "top",
                    container: "bottom-left",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 2000,
                      onScreen: true
                    },
                    width: 300
                  });
                console.log(error);
            });
        }
    } 

    let setQuantityUtl = (quan)=>{
        setQuantity(quan);
        if(quan<1){
            setQuantity(1);
        }
    }

    let formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }

    return (
        <div class="col-xl-3 col-lg-6 col-md-6 col-12 ">
            <div class="card">
                <img src={props.dish.img} class="card-img-top" alt={props.dish.name} />
                <div class="card-body">
                    <h4 class="card-title">{props.dish.name}</h4>
                    <p class="card-text">{props.dish.desc}</p>
                    <p class="price">{formatNumber(props.dish.price)} VN??/ph???n</p>
                    <div class="input-num">
                        <button class="btn-quan" onClick={()=>setQuantityUtl(quantity-1)}>-</button>
                        <input className="input-number" type='number' value={quantity} disabled='disabled'/>
                        <button class="btn-quan" onClick={()=>setQuantityUtl(quantity+1)}>+</button>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-dark" onClick={()=>{addToCart(props.dish, quantity)}}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}