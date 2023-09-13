// import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";


export default function Header({ navigate, loggedIn, setLoggedIn, setCurrentBlog, setBlogId }) {

  const backHome = () => {
    setBlogId("");
    setCurrentBlog("");
  };

  const logOut = () => {
    localStorage.removeItem("Dev2User");
    setLoggedIn(false);
    navigate("/sign-up")
  }

  // NECESSARY TO CHANGE THE "VIEW-POSTER" BUTTON TO "CHANGE-POSTER" WHEN ON POSTER PAGE
  const currentScreen = useLocation().pathname;

  // **SHIFTING HEADER USESTATES AND FUNCTIONS
  const [scrollPosition, setScrollPosition] = useState({
    y: 0,
  });
  const [prevScrollPosition, setPreviousScrollPositiion] = useState({
    y: 0,
  })
  const handleScrollPositionChange = (e) => {
    setPreviousScrollPositiion({
      y: scrollPosition.y
      },);
    setScrollPosition({
      y: window.scrollY
    },);
  };
  window.addEventListener("scroll", handleScrollPositionChange);
  let headerPos =  scrollPosition.y>0 && scrollPosition.y>prevScrollPosition.y ?"hide": "show";

  return (
    <header
            className="nav-header"
            style={
              headerPos === "hide" ?
                {
                  position: "sticky",
                  top: "-100px",
                  animationName: "raise-nav"
                }
              :
              {
                position: "sticky",
                top: "0",
                animationName: "drop-nav"
              }
            }
    >
      <nav>
        <div className="banner" onClick={backHome}>
          {/* <img className="logo" src={logo} alt="target" /> */}
          <p className="banner-title">Dev^2</p>
        </div>
        <div className="nav-items">
            {
                currentScreen === "/blog" &&
                    <Link aria-label="On Click" to="/" className="button">Back to Blogs</Link>
            }
            {loggedIn ?
                <Link onClick={logOut} className="button">Logout</Link>
            :
                currentScreen === "/sign-in" ?
                    <Link aria-label="On Click" to="/sign-up" className="button">Register</Link>
                :
                    <Link aria-label="On Click" to="/sign-in" className="button">LogIn</Link>
            }
        </div>
      </nav>
    </header>
  );
};