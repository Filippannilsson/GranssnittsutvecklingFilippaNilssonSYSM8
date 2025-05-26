import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/ScrollToTop.css";
import { ReactComponent as ArrowIcon } from "../assets/logos/arrow-up.svg";

function ScrollToTop({ showButton = false }) {
  const { pathname } = useLocation();

  //Scrolla till toppen vid navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  //Manuell scroll till toppen
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      {showButton && (
        <button className="scroll-to-top-btn" onClick={scrollToTop}>
          <ArrowIcon className="arrow-icon" />
        </button>
      )}
    </>
  );
}

export default ScrollToTop;
