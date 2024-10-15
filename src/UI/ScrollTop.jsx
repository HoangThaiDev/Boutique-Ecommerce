// Import Modules
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollTop() {
  //  Create + use Hooks
  const location = useLocation();

  // Side Effects
  useEffect(() => {
    const pathsNotScroll = ["/login", "/sign-up", "/shop"];

    if (!pathsNotScroll.includes(location.pathname)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);
  return <></>;
}
