import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add product
  function addToCart(product) {
    const existing = cart.find(
      (item) => item.id === product.id
    );

    if (!existing) {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    } else {
      const updatedCart = cart.map((item) => {
        return item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item;
      });

      setCart(updatedCart);
    }
  }

  // Remove product
  function removeFromCart(id) {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    setCart(updatedCart);
  }

  // Increase / decrease quantity
  function updateQuantity(id, type) {
    const updatedCart = cart
      .map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity:
              type === "increase"
                ? item.quantity + 1
                : item.quantity - 1,
          };
        }

        return item;
      })
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  }

  // Cart count
  function getCartCount() {
    return cart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }

  // Cart total
  function getCartTotal() {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  // Clear cart
  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartCount,
        getCartTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};

export default CartContext;