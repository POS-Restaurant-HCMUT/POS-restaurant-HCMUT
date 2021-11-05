import React from 'react';
import Item from './Item';

export default function ItemList(props) {
  const { products, onAdd, onRemove, deleteItem, onPurchase, handleShow, handleClose} = props;
  let a = document.getElementsByClassName("check-all-items");
  if (products.length === 0) {
    a[0].checked = false;
  }
  return (
    <div>
      <div>
        {products.length === 0 && <div>Cart is empty</div>}
        {products.map((product) => (
          <Item key={product.id} product={product} onAdd={onAdd} onRemove={onRemove} onPurchase={onPurchase} deleteItem={deleteItem} handleShow={handleShow} handleClose={handleClose}></Item>
        ))}
      </div>
    </div>
  );
}