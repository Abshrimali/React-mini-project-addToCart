Add to Cart
Remove Product
Increase / Decrease Quantity
Auto-remove at 0
Cart Total
Cart Count
LocalStorage
Clear Cart
Empty Cart UI





React Add to Cart — Today's Notes
1. Cart Context

Cart ka data multiple components mein share karne ke liye Context API use ki.

const CartContext = createContext();

Provider:

<CartContext.Provider value={...}>
  {children}
</CartContext.Provider>

Custom hook:

const useCartContext = () => {
  return useContext(CartContext);
};
2. Cart State

Cart ke products store karne ke liye:

const [cart, setCart] = useState([]);

Cart ka structure:

[
  {
    id: 1,
    title: "Product",
    price: 20,
    image: "...",
    quantity: 2
  }
]
3. Add to Cart

Pehle check kiya product already cart mein hai ya nahi.

const existing = cart.find(
  (item) => item.id === product.id
);
Product nahi mila
if (!existing) {
  setCart([
    ...cart,
    {
      ...product,
      quantity: 1,
    },
  ]);
}
Product already hai

map() se uski quantity increase ki:

const updatedCart = cart.map((item) => {
  return item.id === product.id
    ? {
        ...item,
        quantity: item.quantity + 1,
      }
    : item;
});

setCart(updatedCart);
Important
find() → product find/check
map()  → product update
4. Remove Product

Product remove karne ke liye filter():

function removeFromCart(id) {
  const updatedCart = cart.filter(
    (item) => item.id !== id
  );

  setCart(updatedCart);
}
Concept
filter()
→ jis item ki condition true hai woh array mein rahega

Isliye:

item.id !== id

ka matlab:

jis product ko remove karna hai, usko mat rakho.

5. Quantity Increase / Decrease
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

Use:

updateQuantity(item.id, "increase")

ya:

updateQuantity(item.id, "decrease")
Quantity 0
.filter((item) => item.quantity > 0)

Agar quantity 0 ho gayi:

quantity = 0
      ↓
filter()
      ↓
product removed
6. Cart Total

Har product:

price × quantity

Total ke liye reduce():

function getCartTotal() {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

Example:

T-Shirt  $20 × 2 = $40
Shoes     $50 × 1 = $50
--------------------
Total              $90
reduce() ka basic purpose
Multiple values
      ↓
combine
      ↓
one value
7. Cart Count

Header mein cart count:

function getCartCount() {
  return cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
}

Example:

T-Shirt × 2
Shoes × 1

Cart (3)

Ye unique products count nahi, balki total quantity hai.

8. Header Cart Badge
<Link to="/cart" className="relative">
  <ShoppingCartPlus size={25} />

  {getCartCount() > 0 && (
    <span>
      {getCartCount()}
    </span>
  )}
</Link>
Conditional rendering
condition && <Component />

Agar:

getCartCount() > 0

true → badge show.

Agar 0 → badge hide.

9. Cart Page

Cart ko context se liya:

const {
  cart,
  removeFromCart,
  updateQuantity,
  getCartTotal,
  clearCart,
} = useCartContext();

Products:

{cart.map((item) => (
  <div key={item.id}>
    {item.title}
    {item.price}
    {item.quantity}
  </div>
))}

key ke liye:

key={item.id}

use kiya.

10. Empty Cart
{cart.length === 0 ? (
  <p>Your cart is empty.</p>
) : (
  // Cart products
)}

Ye ternary conditional rendering hai.

cart.length === 0
       ↓
   ┌───┴───┐
 true     false
  ↓         ↓
Empty     Products
11. Clear Cart

Context:

function clearCart() {
  setCart([]);
}

Cart Page:

<button onClick={clearCart}>
  Clear Cart
</button>

Ek click mein poora cart empty.

12. LocalStorage

Refresh ke baad cart lose na ho isliye localStorage use kiya.

Initial state
const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem("cart");

  return savedCart
    ? JSON.parse(savedCart)
    : [];
});
Cart change hone par save
useEffect(() => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );
}, [cart]);
Important

localStorage sirf strings store karta hai.

Isliye:

JSON.stringify(cart)

Object/array → string

Aur:

JSON.parse(savedCart)

String → object/array

13. Checkout Route

Cart se:

<Link to="/checkout">
  Checkout
</Link>

Router:

{
  path: "/checkout",
  element: <Checkout />,
}

Flow:

/cart
  ↓
Checkout button
  ↓
/checkout
14. Checkout Page

Checkout par cart products aur total show kiya:

const {
  cart,
  getCartTotal,
} = useCartContext();

Product total:

item.price * item.quantity

Overall total:

getCartTotal()
15. Customer Form

State:

const [form, setForm] = useState({
  name: "",
  email: "",
  phone: "",
  address: "",
});

Input:

<input
  name="name"
  value={form.name}
  onChange={handleChange}
/>
16. handleChange
const handleChange = (e) => {
  const { name, value } = e.target;

  setForm({
    ...form,
    [name]: value,
  });
};

Yahan important concept:

[name]

Computed Property Name hai.

Agar:

name = "email"

to:

[name]

becomes:

email

Result:

{
  name: "...",
  email: "...",
  phone: "",
  address: ""
}
17. Form Submit

Form:

<form onSubmit={handleSubmit}>

Handler:

const handleSubmit = (e) => {
  e.preventDefault();
};

preventDefault() browser ke default form submission ko rokta hai.

18. Basic Validation
if (
  !form.name ||
  !form.email ||
  !form.phone ||
  !form.address
) {
  setError("Please fill all fields");
  return;
}

Error:

{error && (
  <p className="text-red-500">
    {error}
  </p>
)}

Again && conditional rendering use hua.

19. Place Order

Successful validation ke baad:

const order = {
  customer: form,
  products: cart,
  total: getCartTotal(),
};

console.log("Order:", order);

Abhi ye backend mein save nahi ho raha.

Sirf frontend testing hai.

20. Order Success

Order successfully place hone ke baad:

clearCart();
setOrderPlaced(true);

Phir:

{orderPlaced && ...}

ke through success screen show ki.

Complete Flow
Product List
     ↓
Add to Cart
     ↓
CartContext
     ↓
cart state
     ↓
┌─────────────────────────┐
│ Cart Page               │
│                         │
│ + Quantity              │
│ - Quantity              │
│ Remove                  │
│ Clear Cart              │
│ Cart Total              │
└─────────────────────────┘
     ↓
Checkout
     ↓
Order Summary
     ↓
Customer Details
     ↓
Form Validation
     ↓
Place Order
     ↓
Order Success
Array Methods jo aaj important rahe
Method	Humne kis liye use kiya
find()	Product cart mein already hai?
map()	Quantity update karna
filter()	Product remove karna
reduce()	Cart count aur total calculate karna

Ye 4 methods tumhare Add-to-Cart feature ke core JavaScript concepts hain.