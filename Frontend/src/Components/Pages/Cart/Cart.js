import React, {useState} from "react";
import "./cart.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemList from "./ItemList";
import DiscountCode from "./discountCode";
import axios from 'axios';

let cartItems = []
let dishes = []
axios.post('api/dishes-in-cart', {
    "username": "customer",
    "password": "12345"
}).then(function (response) {
    if (response.status === 200) {
        response.data.forEach(({ dish, quantity }) => {
            cartItems.push({dish, quantity});
        });
        axios.get('/api/menu').then((res) => {
            if (res.status === 200) {
                res.data.forEach(({ name, desc, img, price }) => {
                    dishes.push({ name, desc, img, price });
                });
                for (let i = 0; i < cartItems.length; i++) {
                    for (let j = 0; j < dishes.length; j++) {
                        if (cartItems[i].dish === dishes[j].name) {
                            cartItems[i] = {...cartItems[i], dish: dishes[j]};
                        }
                    }
                }
            }
        }).catch(err => console.log(err));
    }
}).catch(function (error) {
    console.log(error);
});
let DishesInCart = cartItems;

export const addToCart = (dish, quantity) => {
  let isDeleted = false;
  let a = false;
  
  if (DishesInCart.length > 0) {
    for (let i of DishesInCart) {
      if (i.dish.name === dish.name) {
        i.quantity += quantity;
        a = true;
        axios.put('api/update-cart', {
          "username": "customer",
          "password": "12345",
          "dish": dish.name,
          "quantity": i.quantity
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        break;
      }
    }
  }
  
  if (a === false) {
    DishesInCart.push({dish, quantity, isDeleted});
    axios.post('api/update-cart', {
      "username": "customer",
      "password": "12345",
      "dish": dish.name,
      "quantity": quantity
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

function Order() {
  const handleClose = (product) => {
    const item = quantity.find((x) => x.dish.name === product.dish.name);
    setQuantity(quantity.map((x) => x.dish.name === item.dish.name ? {...item, showed: !item.showed} : x));
  }
  const handleShow = (product) => {
    const item = quantity.find((x) => x.dish.name === product.dish.name);
    setQuantity(quantity.map((x) => x.dish.name === item.dish.name ? {...item, showed: true} : {...x, showed: false}));

  }
  const [quantity, setQuantity] = useState(DishesInCart);
  const [price, setPrice] = useState(0);

  const [finalPrice, setFinalPrice] = useState(0);

  const [discount, setDiscount] = useState('');

  const [addedDiscount, setAddedDiscount] = useState(false);

  const [discountData] = useState(DiscountCode);

  const [codeAdded, setCodeAdded] = useState('');

  
  const onAdd = (product) => {
    const item = quantity.find((x) => x.dish.name === product.dish.name);
    setQuantity(quantity.map((x) => x.dish.name === product.dish.name ? {...item, quantity: item.quantity + 1} : x));
    if (product.check === true) {
      setPrice(price + product.dish.price);
      setFinalPrice(finalPrice + product.dish.price);
    }
    axios.put('api/update-cart', {
      "username": "customer",
      "password": "12345",
      "dish": product.dish.name,
      "quantity": product.quantity + 1
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  const onRemove = (product) => {
    const item = quantity.find((x) => x.dish.name === product.dish.name);
    if (item.quantity === 1) {
      handleShow(product);
      
      //setQuantity(quantity.filter((x) => x.name !== product.name)); 
    } else {
      setQuantity(quantity.map((x) => x.dish.name === product.dish.name ? {...item, quantity: item.quantity - 1} : x));
      if (product.check === true) {
        setPrice(price - product.dish.price);
        setFinalPrice(finalPrice - product.dish.price);
      }
      axios.put('api/update-cart', {
        "username": "customer",
        "password": "12345",
        "dish": product.dish.name,
        "quantity": product.quantity - 1
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
  };
  const deleteItem = (product) => {
    let a = document.getElementsByClassName("check-all-items");
    let b = document.getElementsByClassName("check-item");
    let isAllChecked = 0;
    setQuantity(quantity.filter((x) => x.dish.name !== product.dish.name));
    for (let i of DishesInCart) {
      if (product.dish.name === i.dish.name) {
        i.isDeleted = true;
      } 
    }
    for (let i = 0; i < DishesInCart.length; i++) {
      if (DishesInCart[i].isDeleted === true) {
        DishesInCart.splice(i, 1);
      }
    }
    if (product.check === true) {
      setPrice(price - product.dish.price * product.quantity);
      setFinalPrice(finalPrice - product.dish.price * product.quantity);
    }
    for (let i of b) {
      if ((i.checked === true && i.value !== product.dish.name) || (i.value === product.dish.name)) {
        isAllChecked += 1;
      }
      if (isAllChecked === b.length) {
        a[0].checked = true;
      }
    }
    axios.delete('api/update-cart', {
      data: {
        "username": "customer",
        "password": "12345",
        "dish": product.dish.name
      }
    });
  }

  const onPurchase = (product, e) => {
    const item = quantity.find((x) => x.dish.name === product.dish.name);
    const checked = e.target.checked;
    let a = document.getElementsByClassName("check-all-items");
    let b = document.getElementsByClassName("check-item");
    let isAllChecked = 0;

    if (checked === true) {
      setPrice(price + product.dish.price * product.quantity);
      setFinalPrice(finalPrice + product.dish.price * product.quantity);
      setQuantity(quantity.map((x) => x.dish.name === product.dish.name ? {...item, check: true} : x));
    } else {
      a[0].checked = false;
      setPrice(price - product.dish.price * product.quantity);
      setFinalPrice(finalPrice - product.dish.price * product.quantity);
      setQuantity(quantity.map((x) => x.dish.name === product.dish.name ? {...item, check: !item.check} : x));
    }

    for (let i of b) {
      if (i.checked === true) {
        isAllChecked += 1;
      }
      if (isAllChecked === b.length) {
        a[0].checked = true;
      }
    }
  }
  const checkAllItem = (e) => {
    const checked = e.target.checked;
    let itemPrice = 0;
    let x = document.getElementsByClassName("check-item");
    if (checked === true) {
      for (let i of x) {
        for (let j of quantity) {
          if (i.value === j.dish.name && i.checked === false) {
            i.checked = true;
            itemPrice = itemPrice + j.dish.price * j.quantity;
            j.check = true;
          }
        }
      }
      setPrice(price + itemPrice);
      setFinalPrice(finalPrice + itemPrice)
    } else {
      for (let i of x) {
        i.checked = false;
        for (let j of quantity) {
          j.check = false;
        }
      }
      setPrice(0);
      setFinalPrice(0);
    }
  }
  if (DishesInCart.length === 0) {
    return (
      <div className="cart-empty">
        <h1>Cart is Empty</h1>
        <p>Please go to menu and select dishes and enjoy our website</p>
      </div>
    )
  } else {
    return (
      <div className="cart-bg">
        <div className="cart-header">
          <h1 className="fw-normal">Giỏ hàng của bạn</h1>
        </div>
        
        <div className="row justify-content-md-center h-100">
          <div className="col-md-8">
            <div className="card mt-3 ms-5 cart-left-header">
              <div className="card-header">
                <div className="row">
                  <div className="form-check col-md-4 ps-5">
                    <input className="form-check-input check-all-items" type="checkbox" value="" id="formCheckDefault" onClick={(e) => checkAllItem(e)} />
                    <label className="form-check-label fw-bold" for="formCheckDefault">Tất cả</label>
                  </div>
                  <div className="col-md-2 fw-bold">Đơn giá</div>
                  <div className="col-md-3 fw-bold">Số lượng</div>
                  <div className="col-md-2 fw-bold">Thành tiền</div>
                  <div className="col-md-1 fw-bold"> </div>
                </div>
              </div>
              <div className="card-body scrollspy-example" data-bs-spy="scroll">
                <ItemList products={quantity} onAdd={onAdd} onRemove={onRemove} deleteItem={deleteItem} onPurchase={onPurchase} handleShow={handleShow} handleClose={handleClose}></ItemList>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card me-5 ms-3 discount-code mt-3">
              <form className="card-body">
                <label>Mã giảm giá (nếu có)</label>
                <input type="text" name="discount" onChange={event => setDiscount(event.target.value)} className="form-control" ></input>
                <div className="d-flex justify-content-end mt-2">
                  <button type="button" onClick = {() => {

                    const code = discountData.find((x) => x.value === discount);

                    if (addedDiscount === false && code){
                      setCodeAdded(code.value)
                      if(finalPrice - code.discount < 0){
                        setFinalPrice(0);
                      }
                      else {
                        setFinalPrice(finalPrice - code.discount);
                      }
                      setAddedDiscount(true)
                    }
                    else if (discount !== codeAdded && code) {
                      const old_code = discountData.find((x) => x.value === codeAdded);
                      let old_price = finalPrice + old_code.discount
                      let new_code = old_price - code.discount
                      if(new_code < 0){
                        setFinalPrice(0);
                      }
                      else {
                        setFinalPrice(new_code);
                      }
                      setCodeAdded(code.value)
                    }

                    }} className="btn btn-outline-primary">Áp dụng</button>
                </div>
              </form>
            </div>

            <div className="card me-5 ms-3 mt-3 total-cost">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <p>Tạm tính:</p>
                  <p>{price} VNĐ</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Giảm giá:</p>
                  <p>{price-finalPrice} VNĐ</p>
                </div>
                <hr></hr>
                <div className="d-flex justify-content-between">
                  <div className="flex-column">
                    <div>Tổng tiền:</div>
                    <div>(Bao gồm VAT)</div>
                  </div>
                  <p>{price*110/100 - (price-finalPrice)} VNĐ</p>
                </div>
              </div>
            </div>

            <div className="card me-5 ms-3 mt-3 purchase-btn">
              <button type="button" className="btn btn-success card-body fs-5 fw-bold">Thanh toán ngay</button>
            </div>
          </div>
        </div>
      </div>
    )}
}

export default Order;