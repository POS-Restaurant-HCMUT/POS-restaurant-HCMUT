import React from "react";
import "./cart.css";
import Popup from "./Popup";

export default function Item(props) {
    const { product, onAdd, onRemove, onPurchase, deleteItem, handleShow, handleClose } = props;
    
    var totalPrice = product.quantity * product.dish.price;
    return (
        <div className="row align-items-center abcd-e">
            <div className="form-check col-md-4 col-12 ps-5">
                <input className="form-check-input item-checked check-item" type="checkbox" value={product.dish.name} id="formCheckDefault" onClick={(e) => onPurchase(product, e)} />
                <label className="form-check-label" for="formCheckDefault"><img className="small" src={product.dish.img} alt={product.dish.name} />
                <div className="fw-bold">{product.dish.name}</div></label>
                <div>{product.dish.desc}</div>
            </div>
            <div className="col-md-2 col-12 item-price-des"><span className="hide-des">Đơn giá:</span>{product.dish.price} VNĐ</div>
            <div className="col-md-3 col-12 qty-btn">
                <span className="hide-des">Số lượng:</span>
                <button onClick={() => onRemove(product)} className="btn-qty">-</button>
                <input className="input-number" type='number' value={product.quantity} disabled='disabled'/>
                <button onClick={() => onAdd(product)} className="btn-qty">+</button>
            </div>
            <div className="col-md-2 col-7 item-total-price-des">
                <span className="hide-des">Thành tiền:</span><div>{totalPrice} VNĐ</div>
            </div>
            <div className="col-md-1 col-4 delete-item">
                <i className="far fa-trash-alt" onClick={() => handleShow(product)}></i>
                <Popup handleClose={handleClose} deleteItem={deleteItem} product={product}></Popup>
            </div>
        </div>
    );
}