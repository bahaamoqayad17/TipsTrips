import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Box from "@mui/material/Box";

export default function SiteLayout({ children }) {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {showTopBtn && (
        <Box
          sx={{
            position: "fixed",
            bottom: 30,
            right: 30,
            zIndex: 1000,
            cursor: "pointer",
            color: "#fff",
          }}
          onClick={goToTop}
        >
          <img src="./arrow-up.svg" alt="" />
        </Box>
      )}
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
