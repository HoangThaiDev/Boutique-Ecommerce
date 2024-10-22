// Import Modules
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import APIServer from "../../API/customAPI";

// Import File CSS
import classes from "./css/layout.module.css";

// Import Component
import Title from "./Title";
import Items from "./Items";

export default function Layout() {
  // Create + use States
  const [checkouts, setCheckouts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.user);

  // Side Effects
  useEffect(() => {
    const fetchCheckout = async () => {
      try {
        const res = await APIServer.checkout.getCheckout();
        if (res.status === 200) {
          setCheckouts(res.data);
          setIsLoading(true);
        }
      } catch (error) {
        const { data } = error.response;

        alert(data.message);
        setIsLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchCheckout();
    }
  }, [isLoggedIn]);

  return (
    <div className={classes["history"]}>
      <div className={classes["history-container"]}>
        <Title />
        {isLoading && <Items checkouts={checkouts} />}
      </div>
    </div>
  );
}
