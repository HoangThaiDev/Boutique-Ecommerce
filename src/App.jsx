// Import Modules
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Component
// ------------ Layout --------------
import RootLayout from "./layout/RootLayout";

// ------------ Pages --------------
import Home from "./page/Home";

// ------------ Component --------------
import PopupProduct from "./UI/PopupProduct";
import SidebarMenu from "./UI/sidebarMenu";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SidebarMenu />
        <PopupProduct />
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
