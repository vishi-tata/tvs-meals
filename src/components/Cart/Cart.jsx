import { Fragment, useContext, useState } from "react";

import CartContext from "../../Store/CartContext";
import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    return cartCtx.addItem({ ...item, quantity: 1 });
  };

  const totalAmount = `₹${Math.abs(cartCtx.totalAmount.toFixed(2))}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItems = cartCtx.items.map((item) => (
    <CartItem
      name={item.name}
      price={item.price}
      quantity={item.quantity}
      id={item.id}
      key={item.id}
      onAdd={cartItemAddHandler.bind(null, item)}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
    />
  ));

  const orderButtonClickHandler = () => {
    console.log("Order Successful");
    setIsCheckingOut(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://tvs-react-meals-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderButtonClickHandler}>
          Order
        </button>
      )}
    </div>
  );

  const showCartModalContent = (
    <Fragment>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckingOut && (
        <Checkout onCancel={props.onHideCart} onConfirm={submitOrderHandler} />
      )}
      {!isCheckingOut && cartActions}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Ordering items...</p>;

  const didSubmitModalContent = (
    <Fragment>
      <p>Your order has been successfully placed...</p>
      <div className={classes.actions}>
        <button onClick={props.onHideCart} className={classes.button}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {isSubmitting && isSubmittingModalContent}
      {didSubmit && didSubmitModalContent}
      {!isSubmitting && !didSubmit && showCartModalContent}
    </Modal>
  );
};

export default Cart;
