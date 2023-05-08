import React, { useState } from "react";
import { useEffect } from "react";
import "./index.css";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import MSysLogo from "../../assets/images/msysLogo.png";
import headers from "./headers.json";

/**
 * Header With Searchbar
 *
 * @description: Shows a header component with a search bar to input a github username
 * @returns Header Component
 */
function Header({ page }) {
  const navigate = useNavigate();
  const navigateTo = (path) => {
    if (path === "signin") {
      UserService.doLogin();
    } else if (page === "logout") {
      UserService.doLogout();
    } else {
      localStorage.setItem("position", "header");
      navigate("../" + path);
    }
  };

  const getMenu = (menu, index) => {
    return (
      <a key={index} className="" href="" onClick={() => navigateTo(menu.key)}>
        {menu.displayName}{" "}
      </a>
    );
  };

  useEffect(() => {}, []);
  return (

    
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
  <div className="container-fluid">
  <img
          alt="logo"
          className="img-logo"
          onClick={() => navigateTo("/")}
          src={MSysLogo}
          style={{ height: 50, width: 200, cursor: "pointer" }}
        />
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">
      <ul className="navbar-nav">

      {headers.map(
            (header) =>
              header.page === page &&
              header.menu.map((menu, index) => {
                return (
                  (process.env.REACT_APP_isKeycloak === menu.keyCloak ||
                    menu.keyCloak === null) && (
                      <li className="nav-item" onClick={() => navigateTo(menu.key)}>
          <a className="nav-link active" aria-current="page" href="#">{menu.displayName}</a>
        </li>
                    // <a
                    //   key={index}
                    //   className="action-link"
                    //   onClick={() => navigateTo(menu.key)}
                    // >
                    //   {menu.displayName}{" "}
                    // </a>
                  )
                );
              })
          )}
        
      </ul>
  {page!='welcome' && page!='signup' &&  (<><form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>

      <div className="dropdown pb-1">
                    <a href="#" className="d-flex  text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                        <span className="d-none d-sm-inline mx-1">loser</span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><a className="dropdown-item" href="#">New </a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li><a className="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div>
                </>)
}
     
    </div>
  </div>
</nav>
    </header>
  );
}

export default Header;
