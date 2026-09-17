import React from "react";
import { ShoppingCartPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/cartContext/CartContext";

const Navbar = () => {
  const { getCartCount } = useCartContext();
  return (
    <div className="w-full bg-zinc-700 text-white flex justify-between px-8 py-4 items-center ">
      <div className="logo text-2xl font-bold">LOGO</div>

      <div className="navLinks">
        <ul className="flex gap-5 font-bold">
          <Link to={"/"}>Home</Link>
          <Link to={"/"}>Product</Link>
          <Link to={"/"}>About</Link>
          <Link to={"/"}>Contact</Link>
        </ul>
      </div>

      <div className="actionBar">
        <Link to="/cart" className="relative">
          <ShoppingCartPlus size={25} />

          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {getCartCount()}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
