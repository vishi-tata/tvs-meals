import classes from "./CartItem.module.css";

const CartItem = (props) => {
  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <div className={classes.price}>{`₹${props.price}`}</div>
          <div className={classes.amount}>{`x ${props.quantity}`}</div>
        </div>
      </div>
      <div>
        <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
