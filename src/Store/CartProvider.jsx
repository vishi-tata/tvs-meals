import { useReducer } from "react";

import CartContext from "./CartContext";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (prevCart, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      prevCart.totalAmount + action.item.price * action.item.quantity;

    let existingCartItemIndex = prevCart.items.findIndex((item) => {
      return item.id === action.item.id;
    });
    let existingItem = prevCart.items[existingCartItemIndex];

    let updatedCartItems;

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + action.item.quantity,
      };
      updatedCartItems = [...prevCart.items];
      updatedCartItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedCartItems = prevCart.items.concat(action.item);
    }

    return {
      items: updatedCartItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = prevCart.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = prevCart.items[existingCartItemIndex];

    const updatedTotalAmount = prevCart.totalAmount - existingCartItem.price;

    let updatedCartItems;
    if (existingCartItem.quantity > 1) {
      const updatedCartItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedCartItems = [...prevCart.items];
      updatedCartItems[existingCartItemIndex] = updatedCartItem;
    } else {
      updatedCartItems = prevCart.items.filter((item) => item.id !== action.id);
    }

    return {
      items: updatedCartItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
