import { type JSX, useEffect } from "react";
import { useLocation } from "react-router";

function ScrollToTop(): JSX.Element | null {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
