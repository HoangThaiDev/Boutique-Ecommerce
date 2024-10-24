// // Import Modules
// import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { actionUser } from "./redux/actionRedux";
// import APIServer from "./API/customAPI";

// // Import Component
// // ------------ Layout --------------
// import RootLayout from "./layout/RootLayout";

// // ------------ Pages --------------
// import Home from "./page/Home";
// import Login from "./page/Login";
// import Register from "./page/Register";
// import ProductDetail from "./page/ProductDetail";
// import Shop from "./page/Shop";
// import Cart from "./page/Cart";
// import Checkout from "./page/Checkout";
// import History from "./page/History";
// import HistoryDetail from "./page/HistoryDetail";

// // ------------ Component --------------
// import PopupProduct from "./UI/PopupProduct";
// import SidebarMenu from "./UI/SidebarMenu";
// import ScrollTop from "./UI/ScrollTop";
import { API_ROOT } from "./utils/constants";
import axios from "axios";
function App() {
  // Create + use Hooks
  // const navigate = useNavigate();
  // const location = useLocation();
  // const dispatch = useDispatch();

  // // Create + use variables
  // const pathsAuth = ["/login", "/signup"];

  // Sides Effect
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const res = await APIServer.user.getUser();
  //       const { isLoggedIn, accessToken, cart } = res.data;

  //       // If client not logged in => keep going
  //       if (res.status === 200 && !isLoggedIn) return;

  //       // If client was logged in and lost accessToken => update new accessToken
  //       if (res.status === 201 && isLoggedIn) {
  //         return dispatch(
  //           actionUser.save({
  //             accessToken: accessToken,
  //             isLoggedIn: isLoggedIn,
  //             cart: cart,
  //           })
  //         );
  //       }
  //     } catch (error) {
  //       const { data, status } = error.response;

  //       if (status === 500) {
  //         alert(data.message);
  //         navigate("..");
  //         return false;
  //       }

  //       if (status === 401) {
  //         alert(data.message);
  //         return dispatch(
  //           actionUser.save({ accessToken: "", isLoggedIn: data.isLoggedIn })
  //         );
  //       }
  //     }
  //   };

  //   // Check path not in Page Login & Register
  //   if (!pathsAuth.includes(location.pathname)) {
  //     fetchUser();
  //   }
  // }, []);

  // Create + use States
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_ROOT}/shop/products`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
          proxy: 1,
        });

        if (res.status === 200) {
          const products = res.data;
          console.log(res.data);

          setProducts(products);
          setIsLoading(true);
        }
      } catch (error) {
        console.log("API Context Error:", error);
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, []);

  return (
    <div className="App">
      <h1>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere aliquam
        tempore laborum nemo deleniti accusamus quas sequi? Voluptas, labore
        amet eos, impedit aliquam molestiae maxime rem at corporis, expedita
        eaque!
      </h1>
      <h1>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla
        doloremque dolore aspernatur tempora nostrum molestiae officia quidem
        aliquam quos incidunt, omnis eos ab odio fugit beatae totam dolorum
        accusamus quisquam!
      </h1>
      {isLoading && (
        <div>
          {products.map((p) => (
            <img src={p.images[0]} alt="" />
          ))}
        </div>
      )}
      {/* <ScrollTop />
      <SidebarMenu />
      <PopupProduct /> */}

      {/* Route: All Pages */}
      {/* <Routes>
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
      </Routes> */}
    </div>
  );
}

export default App;
