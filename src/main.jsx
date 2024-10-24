// Import Modules
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import store from "./redux/store.js";
import { Provider as ProviderRedux } from "react-redux";
import ContextProvider from "./context/StoreContext.jsx";
import { BrowserRouter } from "react-router-dom";

// Import File CSS
import "./index.css";

// Import Components
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  // <ContextProvider>
  //   <ProviderRedux store={store}>
  //     <BrowserRouter>

  //     </BrowserRouter>
  //   </ProviderRedux>
  // </ContextProvider>
  //</StrictMode>
  <App />
);
