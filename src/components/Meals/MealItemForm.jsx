import { useRef, useState } from "react";

import Input from "./../UI/Input/Input";

import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [quantityIsValid, setQuantityIsValid] = useState(true);
  const quantityInputRef = useRef();

  const addToCartButtonClickHandler = (event) => {
    event.preventDefault();

    const enteredQuantity = quantityInputRef.current.value;

    if (
      enteredQuantity.trim().lenth === 0 ||
      enteredQuantity < 1 ||
      enteredQuantity > 5
    ) {
      setQuantityIsValid(false);
      return;
    }

    props.onAddToCart(+enteredQuantity);
  };

  return (
    <form className={classes.form} onSubmit={addToCartButtonClickHandler}>
      <Input
        label="Quantity"
        input={{
          id: props.id,
          type: "number",
          min: 0,
          max: 5,
          step: 1,
          defaultValue: 1,
        }}
        ref={quantityInputRef}
      />
      <div>
        <button type="submit"> + Add</button>
        {!quantityIsValid && <p>Enter a valid quantity(1-5)</p>}
      </div>
    </form>
  );
};

export default MealItemForm;
