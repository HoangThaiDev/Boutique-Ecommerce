// Import Modules
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { lazy, useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";
import { actionUser } from "./redux/actionRedux";
import APIServer from "./API/customAPI";

// Import Component
// ------------ Layout --------------
const RootLayout = lazy(() => import("./layout/RootLayout"));

// ------------ Pages --------------
const Home = lazy(() => import("./page/Home"));
const Login = lazy(() => import("./page/Login"));
const Register = lazy(() => import("./page/Register"));
const ProductDetail = lazy(() => import("./page/ProductDetail"));
const Shop = lazy(() => import("./page/Shop"));
const Cart = lazy(() => import("./page/Cart"));
const Checkout = lazy(() => import("./page/Checkout"));
const History = lazy(() => import("./page/History"));
const HistoryDetail = lazy(() => import("./page/HistoryDetail"));

// ------------ Component --------------
const PopupProduct = lazy(() => import("./UI/PopupProduct"));
const SidebarMenu = lazy(() => import("./UI/SidebarMenu"));
const ScrollTop = lazy(() => import("./UI/ScrollTop"));
const Loading = lazy(() => import("./UI/Loading"));

function App() {
  // Create + use Hooks
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // // Create + use variables
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
      <ScrollTop />
      <SidebarMenu />
      <PopupProduct />

      {/* Route: All Pages */}
      <Suspense fallback={<Loading />}>
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

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
