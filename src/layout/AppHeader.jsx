import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Layout, Space, Typography } from "antd";
import { Link, NavLink } from "react-router-dom";

import cx from "classnames";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineShoppingCart, AiFillSetting } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/AuthProvider";

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = () => {
   const navigate = useNavigate();

   const headerRef = useRef();
   const { auth, setAuth, cart } = useContext(AuthContext);
   const [toggleMenu, setToggleMenu] = useState(false);

   useEffect(() => {
      function stickyHeader() {
         if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            headerRef.current.classList.add("header-sticky");
         } else {
            headerRef.current.classList.remove("header-sticky");
         }
      }

      window.addEventListener("scroll", stickyHeader);

      return () => {
         window.removeEventListener("scroll", stickyHeader);
      };
   });

   const handleCheckAd = () => {
      navigate('/crud-admin');
   }


   const handleLogout = () => {
      if (confirm("Bạn có chắc muốn thoát ?")) {
         setAuth(null);
         localStorage.removeItem("auth");
         navigate('/');
      }
   };

   console.log(auth);

   return (
      <Header ref={headerRef} className="header">
         <div className="container header-wrapper">
            <Link to="/" className="header-logo">
               <img src="/images/logo.png" alt="" />
            </Link>

            <Space className={cx("header-right", toggleMenu && "isActive")}>
               <div className="overlay" onClick={() => setToggleMenu(!toggleMenu)} />
               <Button type="default" className="mobile-menu mobie-abs" onClick={() => setToggleMenu(!toggleMenu)}>
                  <GiHamburgerMenu />
               </Button>
               <Space size={36} align="center" direction="horizontal" className="header-navigate">
                  <NavLink to="/" className={({ isActive }) =>
                     cx("header-link", { "header-link-active": isActive })
                  } onClick={() => setToggleMenu(false)} >
                     <Title level={4}>Home</Title>
                  </NavLink>
                  <NavLink to="/about" className={({ isActive }) =>
                     cx("header-link", { "header-link-active": isActive })
                  }
                     onClick={() => setToggleMenu(false)}
                  >
                     <Title level={4}>About</Title>
                  </NavLink>
                  <NavLink to="/tours" className={({ isActive }) =>
                     cx("header-link", { "header-link-active": isActive })
                  }
                     onClick={() => setToggleMenu(false)}
                  >
                     <Title level={4}>Tours</Title>
                  </NavLink>
               </Space>
               <Space align="center" direction="horizontal">
                  {auth ? (
                     <>
                        <h3 style={{ fontSize: "16px" }} className="emaillogin">{auth?.email}</h3>
                        <Link to='/cart-tour' className="cart" counter={cart.length}>
                           <AiOutlineShoppingCart style={{ marginTop: "20px" }} />
                        </Link>
                        {
                           auth?.role === "admin" && <AiFillSetting style={{ marginTop: "20px" }} className="crud" onClick={handleCheckAd} />
                        }
                        <Button className="btnLogout" onClick={handleLogout}>
                           Logout
                        </Button>
                     </>
                  ) : (
                     <>
                        <Link to="/login" className="btn btn-secondary" onClick={() => setToggleMenu(false)} >
                           Login
                        </Link>
                        <Link to="/register" className="btn btn-primary" onClick={() => setToggleMenu(false)} >
                           Register
                        </Link>
                     </>
                  )}
               </Space>
            </Space>
            <Button type="default" className="mobile-menu" onClick={() => setToggleMenu(!toggleMenu)} >
               <GiHamburgerMenu />
            </Button>
         </div>
      </Header>
   );
};

export default AppHeader;
