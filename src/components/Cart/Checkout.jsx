import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const has6Characters = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const [inputValidity, setInputValidity] = useState({
    name: true,
    street: true,
    pin: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const pinInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPinCode = pinInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const pinCodeIsValid = has6Characters(enteredPinCode);
    const cityIsValid = !isEmpty(enteredCity);

    setInputValidity({
      name: nameIsValid,
      street: streetIsValid,
      pin: pinCodeIsValid,
      city: cityIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && pinCodeIsValid && cityIsValid;

    if (!formIsValid) return;

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      pinCode: enteredPinCode,
      city: enteredCity,
    });
  };

  const nameInputClasses = `${classes.control} ${
    inputValidity.name ? "" : classes.invalid
  }`;
  const streetInputClasses = `${classes.control} ${
    inputValidity.street ? "" : classes.invalid
  }`;
  const pinInputClasses = `${classes.control} ${
    inputValidity.pin ? "" : classes.invalid
  }`;
  const cityInputClasses = `${classes.control} ${
    inputValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!inputValidity.name && <p>Name is not valid (Must not be empty).</p>}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!inputValidity.street && (
          <p>Street is not valid (Must not be empty).</p>
        )}
      </div>
      <div className={pinInputClasses}>
        <label htmlFor="pincode">Pin-code</label>
        <input type="text" id="pincode" ref={pinInputRef} />
        {!inputValidity.pin && (
          <p>Pincode is not valid(Must contain 6 characters).</p>
        )}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!inputValidity.city && <p>City is not valid (Must not be empty).</p>}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
