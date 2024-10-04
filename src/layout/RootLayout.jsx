// Import Module
import React from "react";
import { Outlet } from "react-router-dom";

// Import Component
import Navigation from "./Navigation";
import Footer from "./Footer";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
}
1;
