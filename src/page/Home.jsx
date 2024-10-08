// Import Modules
import React from "react";

// Import Components
import Header from "../component/Home/Header";
import Categories from "../component/Home/Categories";
import ServiceFeatures from "../component/Home/ServiceFeatures";
import SubscribeForm from "../component/Home/SubscribeForm";
import ProductTrending from "../component/Home/ProductTrending";

export default function Home() {
  return (
    <div id="home">
      <Header />
      <Categories />
      <ProductTrending />
      <ServiceFeatures />
      <SubscribeForm />
    </div>
  );
}
