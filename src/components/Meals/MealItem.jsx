import { useContext } from "react";

import CartContext from "./../../Store/CartContext";
import MealItemForm from "./MealItemForm";

import classes from "./MealItem.module.css";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `₹${props.price.toFixed(2)}`;

  const addToCartHandler = (enteredQuantity) => {
    const item = {
      name: props.name,
      price: props.price.toFixed(2),
      quantity: enteredQuantity,
      id: props.id,
    };
    cartCtx.addItem(item);
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
