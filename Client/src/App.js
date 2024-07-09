import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// @action
import { getCart } from "./redux/cart/actions";

// @component
import Navbar from "./Components/Navbar/Navbar";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Footer from "./Components/Footer/Footer";
import ShopCategory from "./Pages/ShopCategory";
import LoginSignup from "./Pages/LoginSignup";
import Checkout from "./Pages/Checkout"
import ManageOrder from "./Pages/ManageOrder";
import OrderDetail from "./Pages/OrderDetail";
import Thank from "./Pages/Thank";
import PayWithMetamask from "./Pages/PayWithMetamask";

// @assets
import men_banner from "./Components/Assets/Banner-2.png";
import kid_banner from "./Components/Assets/Banner-1.png";
// import women_banner from "./Components/Assets/banner_women.png";

// @utility
import { getUserInfo, getUserToken } from "./utility";

// @selector
import { cartUser } from "./redux/cart/selector";

function App() {
  const dispatch = useDispatch()
  const userCart = useSelector(cartUser)

  const accessToken = getUserToken() ?? ""
  const userId = getUserInfo()?.id

  useEffect(() => {
    if (Object.keys(userCart).length === 0 && accessToken && userId) {
      dispatch(getCart({ userId }))
    }
  }, [accessToken, userId])

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop gender="all" />} />
          <Route path="/category/:categoryId" element={<ShopCategory banner={men_banner} category="men" />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/manage-orders" element={<ManageOrder />} />
          <Route path='/manage-orders/:orderId' element={<OrderDetail />} />
          <Route path='/thank' element={<Thank />} />
          <Route path='/pay-with-metamask' element={<PayWithMetamask />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
