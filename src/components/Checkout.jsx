import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../context/cartContext/CartContext";
import Navbar from "./Navbar";

const Checkout = () => {
  const {
    cart,
    getCartTotal,
    clearCart,
  } = useCartContext();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState("");

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.address
    ) {
      setError("Please fill all fields");
      return;
    }

    setError("");

    const order = {
      customer: form,
      products: cart,
      total: getCartTotal(),
    };

    console.log("Order:", order);

    clearCart();

    setOrderPlaced(true);
  };

  // Empty cart
  if (cart.length === 0 && !orderPlaced) {
    return (
      <>
        <Navbar />

        <div className="max-w-5xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-4">
            Checkout
          </h1>

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
      </>
    );
  }

  // Order successfully placed
  if (orderPlaced) {
    return (
      <>
        <Navbar />

        <div className="max-w-5xl mx-auto p-6 text-center">
          <h1 className="text-3xl font-bold mb-4">
            Order Placed Successfully
          </h1>

          <p className="text-gray-600 mb-6">
            Thank you for your order.
          </p>

          <Link
            to="/products"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Continue Shopping
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          Checkout
        </h1>

        {/* Order Summary */}
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border rounded-lg p-4"
            >
              <div>
                <h2 className="font-semibold">
                  {item.title}
                </h2>

                <p>
                  ${item.price} × {item.quantity}
                </p>
              </div>

              <p className="font-semibold">
                $
                {(
                  item.price * item.quantity
                ).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-6 border-t pt-4">
          <h2 className="text-xl font-bold">
            Total: ${getCartTotal().toFixed(2)}
          </h2>
        </div>

        {/* Customer Details */}
        <form
          onSubmit={handleSubmit}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold mb-4">
            Customer Details
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded p-3"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded p-3"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded p-3"
            />

            <textarea
              name="address"
              placeholder="Delivery Address"
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded p-3"
              rows="4"
            />

            {error && (
              <p className="text-red-500">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-3 rounded"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Checkout;