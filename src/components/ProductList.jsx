import React, { useEffect, useState } from "react";
import { useCartContext } from "../context/cartContext/CartContext";

const ProductList = () => {
  const [products, setproducts] = useState([]);
  const { addToCart } = useCartContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetch("https://fakestoreapi.com/products");
        const result = await data.json();
        setproducts(result);
  
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>

      <div className="flex justify-center flex-wrap gap-6 p-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-72 rounded-xl shadow-lg p-4 flex flex-col bg-amber-300"
          >
            {/* Image */}
            <div className="h-52 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-contain"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 gap-2">
              <h2 className="font-bold text-lg">
                {product.title.length > 40
                  ? product.title.slice(0, 40) + "..."
                  : product.title}
              </h2>

              <p className="text-sm opacity-70 flex-1">
                {product.description.length > 80
                  ? product.description.slice(0, 80) + "..."
                  : product.description}
              </p>

              <h3 className="font-bold text-xl">${product.price}</h3>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 btn btn-primary bg-orange-500 text-white rounded cursor-pointer"
                >
                  Add to Cart
                </button>

                <button className="flex-1 btn bg-blue-500 py-1 text-white rounded">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
