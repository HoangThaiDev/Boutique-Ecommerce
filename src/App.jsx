// Import Modules
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import File CSS
// Import Component
// ------------ Layout --------------
import RootLayout from "./layout/RootLayout";

// ------------ Pages --------------
import Home from "./page/Home";

// ------------ Component --------------

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
