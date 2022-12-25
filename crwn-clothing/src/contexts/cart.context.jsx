import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, product) => {
  const existingCartItemIdx = cartItems.findIndex(
    (cartItem) => cartItem.id === product.id
  );

  if (existingCartItemIdx !== -1) {
    cartItems[existingCartItemIdx].quantity += 1;
    return [...cartItems];
  }

  return [...cartItems, { ...product, quantity: 1 }];
};

const removeCartItem = (cartItems, product) => {
  const existingCartItemIdx = cartItems.findIndex(
    (cartItem) => cartItem.id === product.id
  );

  if (existingCartItemIdx === -1) {
    return [...cartItems];
  }

  if (cartItems[existingCartItemIdx].quantity === 1) {
    cartItems.splice(existingCartItemIdx, 1);
    return [...cartItems];
  }

  cartItems[existingCartItemIdx].quantity -= 1;
  return [...cartItems];
};

const clearCartItem = (cartItems, product) =>
  cartItems.filter((cartItem) => cartItem.id !== product.id);

export const CartContext = createContext({
  addItemToCart: () => { },
  cartCount: 0,
  cartItems: [],
  cartTotal: 0,
  clearItemFromCart: () => { },
  isCartOpen: false,
  removeItemFromCart: () => { },
  setIsCartOpen: () => { },
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  };

  const removeItemFromCart = (product) => {
    setCartItems(removeCartItem(cartItems, product));
  };

  const clearItemFromCart = (product) => {
    setCartItems(clearCartItem(cartItems, product));
  };

  const value = {
    addItemToCart,
    cartCount,
    cartItems,
    cartTotal,
    clearItemFromCart,
    isCartOpen,
    removeItemFromCart,
    setIsCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
