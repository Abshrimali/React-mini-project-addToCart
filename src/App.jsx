import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
  path: "/checkout",
  element: <Checkout />,
}
]);
function App() {
  return (
    <>
      <Navbar />
      <ProductList />
    </>
  );
}

export default App;

