import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setcart] = useState([]);
useEffect(()=>{
    let exictence=localStorage.getItem('cart');
    if(exictence) setcart(JSON.parse(exictence))
})
  return (
    <CartContext.Provider value={[cart, setcart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
