import React from "react";
import "./cart.css";
import Popup from "./Popup";

export default function Item(props) {
    const { product, onAdd, onRemove, onPurchase, deleteItem, handleShow, handleClose } = props;
    
    var totalPrice = product.quantity * product.dish.price;
    return (
        <div className="row align-items-center abcd-e">
            <div className="form-check col-md-4 ps-5">
                <input className="form-check-input item-checked check-item" type="checkbox" value={product.dish.id} id="formCheckDefault" onClick={(e) => onPurchase(product, e)} />
                <label className="form-check-label" for="formCheckDefault"><img className="small" src={product.dish.img} alt={product.dish.name} />
                <div className="fw-bold">{product.dish.name}</div></label>
                <div>{product.dish.desc}</div>
            </div>
            <div className="col-md-2">${product.dish.price}</div>
            <div className="col-md-3 qty-btn">
                <button onClick={() => onRemove(product)} className="btn btn-primary">
                    -
                </button>
                <span className="itemQuantity"> {product.quantity} </span>
                <button onClick={() => onAdd(product)} className="btn btn-primary">
                    +
                </button>
            </div>
            <div className="col-md-2">
                <div>${totalPrice}</div>
            </div>
            <div className="col-md-1 delete-item">
                <i className="far fa-trash-alt" onClick={() => handleShow(product)}></i>
                <Popup handleClose={handleClose} deleteItem={deleteItem} product={product}></Popup>
            </div>
        </div>
    );
}