import { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};

const CartModalOverLay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}></div>
      {props.children}
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onHideCart} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <CartModalOverLay>{props.children}</CartModalOverLay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
