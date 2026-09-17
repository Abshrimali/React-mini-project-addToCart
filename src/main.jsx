import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App, { router } from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import { CartContextProvider } from "./context/cartContext/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
  </StrictMode>,
);
