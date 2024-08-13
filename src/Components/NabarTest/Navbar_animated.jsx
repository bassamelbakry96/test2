import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/logo.svg'
import lines from '../../assets/lines.svg'
import { Link } from 'react-router-dom';
import About_us from '../../Pages/About_us';
import './Navbar_animated.css';
// import { WiNightFog } from 'react-icons/wi';
import { useSelector } from "react-redux";
import { selectUser } from "../../features/UserSlice";


function Navbar_animated({IsPage}) {

    const user = useSelector(selectUser);
    const isLoggedIn = user?.loggedin;
    
    const [IsMainPage, setIsMainPage] = useState(true);
    const [navbar, setnavbar] = useState(false);

    const changebg = () => {
        if(window.scrollY >= 600)
        {
            setnavbar(true);
        }
        else
        {
            setnavbar(false);
        }
    }
    
    window.addEventListener('scroll', changebg);
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleNavbar = () => {
      setIsCollapsed(!isCollapsed);
    };
  
    return (
      <nav className="navbar ">
        <div className="container-fluid">
          <div className="logo_home_nav">
            <Link to="/">
              <img src={logo} alt="logo" className="img-navbar ms-2 w-100 h-100" />
            </Link>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                {isLoggedIn ? 
                <>
                  <li>
                    <Link to="/myaccount" className="coll_list-item w-100" aria-current="page">&nbsp;&nbsp;  My Account&nbsp;
                    </Link>
                  </li>
                </>
                : 
                <></>}
                <li>
                <Link to="/" className="coll_list-item w-100" aria-current="page">&nbsp;&nbsp;  Home&nbsp;
                </Link>
                </li>
                <li>
                <Link to="/about-us" className="coll_list-item w-100" aria-current="page">&nbsp;&nbsp;  About&nbsp;
                </Link>
                </li>
                <li>
                <Link to="/" className="coll_list-item w-100" aria-current="page">&nbsp;&nbsp;  Board Members&nbsp;
                </Link>
                </li>
                <li>
                <Link to="/agenda" className="coll_list-item w-100" aria-current="page">&nbsp;&nbsp;  Event's Calender&nbsp;
                </Link>
                </li>
                <li>
                <Link to="/membership" className="coll_list-item w-100" aria-current="page">&nbsp;&nbsp;  Become a Member&nbsp;
                </Link>
                </li>
                <li>
                <Link to="/contactus" className="coll_list-item w-100" aria-current="page">&nbsp;&nbsp;  Contact us&nbsp;
                </Link>
                </li>
                <li>
                <Link to="/" className="coll_list-item w-100" aria-current="page">&nbsp;&nbsp;  Log In&nbsp;
                </Link>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </nav>
)}

export default Navbar_animated

/**
 *       <nav className={navbar ? "navbar " : "navbar fixed-top"}>
        <div className="container">
          <div className="logo_home_nav">
            <Link to="/">
              <img src={logo} alt="logo" className="img-navbar ms-2 w-100 h-100" />
            </Link>
          </div>
          <button className="navbar-toggler text-white-50" type="button" onClick={toggleNavbar} aria-controls="navbarNav" aria-expanded={!isCollapsed} aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarNav">
            <ul className="navbar-nav p-2">
                <li>
                <Link to="/" className="coll_list-item w-100" aria-current="page">&nbsp;&nbsp;  Home&nbsp;
                </Link>
                </li>
                <li>
                <Link to="/about-us" className="coll_list-item w-100" aria-current="page">&nbsp;&nbsp;  About&nbsp;
                </Link>
                </li>
                <li>
                <Link to="/" className="coll_list-item w-100" aria-current="page">&nbsp;&nbsp;  Board Members&nbsp;
                </Link>
                </li>
                <li>
                <Link to="/agenda" className="coll_list-item w-100" aria-current="page">&nbsp;&nbsp;  Event's Calender&nbsp;
                </Link>
                </li>
                <li>
                <Link to="/membership" className="coll_list-item w-100" aria-current="page">&nbsp;&nbsp;  Become a Member&nbsp;
                </Link>
                </li>
                <li>
                <Link to="/contactus" className="coll_list-item w-100" aria-current="page">&nbsp;&nbsp;  Contact us&nbsp;
                </Link>
                </li>
                <li>
                <Link to="/" className="coll_list-item w-100" aria-current="page">&nbsp;&nbsp;  Log In&nbsp;
                </Link>
                </li>
            </ul>
          </div>
        </div>
      </nav>
 * 
 * 
 */