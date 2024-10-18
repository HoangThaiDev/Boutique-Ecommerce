// Import Modules
import React from "react";
import { useLocation } from "react-router-dom";

// Import Components
import Layout from "../component/ProductDetail/Layout";
import Header from "../UI/Header";

export default function ProductDetail() {
  // Create + use Hooks
  const { state } = useLocation();

  return (
    <>
      <Header title="SHOP" path="PRODUCT DETAIL" />
      <Layout product={state.productDetail} />
    </>
  );
}
