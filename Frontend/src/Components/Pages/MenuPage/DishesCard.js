import { useState } from 'react';
import {addToCart} from '../Cart/Cart'
import './DishesCard.css';

export function DishesCard(props) {
    const [quantity, setQuantity] = useState(1);
    
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
        <div class="col-3 ">
            <div class="card">
                <img src={props.dish.img} class="card-img-top" alt={props.dish.name} />
                <div class="card-body">
                    <h4 class="card-title">{props.dish.name}</h4>
                    <p class="card-text">{props.dish.desc}</p>
                    <p class="price">{formatNumber(props.dish.price)} VNĐ/phần</p>
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