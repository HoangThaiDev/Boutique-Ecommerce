// Import Modules
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import store from "./redux/store.js";
import { Provider as ProviderRedux } from "react-redux";
import ContextProvider from "./context/StoreContext.jsx";

// Import Components
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <ProviderRedux store={store}>
        <App />
      </ProviderRedux>
    </ContextProvider>
  </StrictMode>
);
