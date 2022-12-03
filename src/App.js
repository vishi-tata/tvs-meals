import { useState } from 'react';

import CartProvider from './Store/CartProvider';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals';

function App() {

  const [cartIsOpen, setCartIsOpen] = useState(false);

  const showCartHandler = () => {
    setCartIsOpen(true);
  }

  const closeCartHandler = () => {
    setCartIsOpen(false);
  }

  return (
    <CartProvider>
      {cartIsOpen && <Cart onHideCart={closeCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
