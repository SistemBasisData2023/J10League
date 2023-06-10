import { useState, useEffect } from "react";
import style from "../style.js";
import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const loginStatus = sessionStorage.getItem("isLogin");
    setIsLogin(loginStatus === "true");
  }, []);

  const updatedNavLinks = isLogin
    ? navLinks.map((nav) =>
        nav.id === "login" ? { ...nav, title: "Log Out" } : nav
      )
    : navLinks;

  const handleLogout = () => {
    sessionStorage.setItem("isLogin", "false");
    setIsLogin(false);
    window.alert("You have been logged out!");
    window.location.href = "/";
   };

  return (
    <>
      <div className={`${style.paddingX} w-full flex justify-center ${style.nempelAtas} transition-colors duration-300 z-50 ${scrolled ? "bg-gray-800" : "bg-transparent"}`}>
        <div className={`${style.boxWidth}`}>
          <div className="w-full flex py-6 justify-between items-center navbar">
            <img src={logo} alt="j10league" className="w-[px] h-[50px]" />

            <ul className="list-none sm:flex hidden justify-end items-center flex-1">
              {updatedNavLinks.map((nav, index) => (
                // START
                <li
                  key={nav.id}
                  className={`font-poppins font-normal cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-dimWhite"
                  } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
                  onClick={() => {
                    setActive(nav.title);
                    if (nav.id === "login" && isLogin){
                      handleLogout();
                    }
                  }}
                >
                  <a href={`/${nav.id}`}>{nav.title}</a>
                </li>
                // END
              ))}
            </ul>

            <div className="sm:hidden flex flex-1 justify-end items-center">
              <img
                src={toggle ? close : menu}
                alt="menu"
                className="w-[28px] h-[28px] object-contain"
                onClick={() => setToggle(!toggle)}
              />

              <div
                className={`${
                  !toggle ? "hidden" : "flex"
                } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
              >
                <ul className="list-none flex justify-end items-start flex-1 flex-col">
                  {navLinks.map((nav, index) => (
                    <li
                      key={nav.id}
                      className={`font-poppins font-medium cursor-pointer text-[16px] ${
                        active === nav.title ? "text-white" : "text-dimWhite"
                      } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                      onClick={() => {
                        setActive(nav.title);
                        if (nav.id === "login" && isLogin){
                          handleLogout();
                        }
                      }}
                    >
                      <a href={`/${nav.id}`}>{nav.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;