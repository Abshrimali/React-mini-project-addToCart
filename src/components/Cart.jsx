import { Link } from "react-router-dom";
import { useCartContext } from "../context/cartContext/CartContext";
import Navbar from "./Navbar";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart,
  } = useCartContext();

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div>
            <p className="text-gray-500 mb-4">
              Your cart is empty.
            </p>

            <Link
              to="/products"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Products */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border rounded-lg p-4"
                >
                  {/* Product */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-contain"
                    />

                    <div>
                      <h2 className="font-semibold">
                        {item.title}
                      </h2>

                      <p>
                        ${item.price}
                      </p>

                      {/* Quantity */}
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              "decrease"
                            )
                          }
                          className="border px-3 py-1"
                        >
                          −
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              "increase"
                            )
                          }
                          className="border px-3 py-1"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-6 border-t pt-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">
                Total: $
                {getCartTotal().toFixed(2)}
              </h2>

              <div className="flex gap-3">
                <button
                  onClick={clearCart}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Clear Cart
                </button>

                <Link
                  to="/checkout"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;  