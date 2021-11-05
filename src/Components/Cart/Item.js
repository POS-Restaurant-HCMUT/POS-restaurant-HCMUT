import React from "react";
import "../Cart/cart.css";
import Popup from "../Cart/Popup";

export default function Item(props) {
    const { product, onAdd, onRemove, onPurchase, deleteItem, handleShow, handleClose } = props;
    
    var totalPrice = product.qty * product.price;
    return (
        <div className="row align-items-center abcd-e">
            <div className="form-check col-md-4 ps-10">
                <input className="form-check-input item-checked check-item" type="checkbox" value={product.id} id="formCheckDefault" onClick={(e) => onPurchase(product, e)} />
                <label className="form-check-label" for="formCheckDefault"><img className="small" src={product.image} alt={product.name} />
                <span>{product.name}</span></label>
            </div>
            <div className="col-md-2">${product.price}</div>
            <div className="col-md-3">
                <button onClick={() => onRemove(product)} className="btn btn-primary">
                    -
                </button>
                <span className="itemQuantity"> {product.qty} </span>
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