// Import Modules
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionUser } from "./redux/actionRedux";
import APIServer from "./API/customAPI";

// Import Component
// ------------ Layout --------------
import RootLayout from "./layout/RootLayout";

// ------------ Pages --------------
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import ProductDetail from "./page/ProductDetail";
import Shop from "./page/Shop";
import Cart from "./page/Cart";
import Checkout from "./page/Checkout";
import History from "./page/History";
import HistoryDetail from "./page/HistoryDetail";

// ------------ Component --------------
import PopupProduct from "./UI/PopupProduct";
import SidebarMenu from "./UI/SidebarMenu";
import ScrollTop from "./UI/ScrollTop";

function App() {
  // Create + use Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Create + use variables
  const pathsAuth = ["/login", "/signup"];

  // Sides Effect
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await APIServer.user.getUser();
        const { isLoggedIn, accessToken, cart } = res.data;

        // If client not logged in => keep going
        if (res.status === 200 && !isLoggedIn) return;

        // If client was logged in and lost accessToken => update new accessToken
        if (res.status === 201 && isLoggedIn) {
          return dispatch(
            actionUser.save({
              accessToken: accessToken,
              isLoggedIn: isLoggedIn,
              cart: cart,
            })
          );
        }
      } catch (error) {
        const { data, status } = error.response;

        if (status === 500) {
          alert(data.message);
          navigate("..");
          return false;
        }

        if (status === 401) {
          alert(data.message);
          return dispatch(
            actionUser.save({ accessToken: "", isLoggedIn: data.isLoggedIn })
          );
        }
      }
    };

    // Check path not in Page Login & Register
    if (!pathsAuth.includes(location.pathname)) {
      fetchUser();
    }
  }, []);

  return (
    <div className="App">
      <h1>Helooooooooooooooooooooooooooooo</h1>
      <ScrollTop />
      <SidebarMenu />
      <PopupProduct />

      {/* Route: All Pages */}
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:name" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/history" element={<History />} />
          <Route path="/history/:historyId" element={<HistoryDetail />} />
        </Route>

        {/* Route: User */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
