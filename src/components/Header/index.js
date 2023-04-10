import React, { useState } from "react";
import { useEffect } from "react";
import "./index.css";
import UserService from "../../services/UserService";

/**
 * Header With Searchbar
 *
 * @description: Shows a header component with a search bar to input a github username
 * @returns Header Component
 */
function Header() {
    const [searchValue, setSearchValue] = useState("");
    const [username, setUsername] = useState("");
    const handleSearch = () => {
        const event = new CustomEvent("getSearchTerm", {
            detail: searchValue.trim(),
        });
        window.dispatchEvent(event);
    };

    
       
    useEffect(() => {
       
    }, []);
    return (
        <header className="border border-light bg-info">
            <div className="input-group d-flex justify-content-center mt-4 mb-4">
                <div className="form-outline shadow-lg col-3">
                    <input
                        type="text"
                        id="form1"
                        className="form-control"
                        placeholder="Github Username"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button
                        type="button"
                        className="btn btn-white close"
                        aria-label="Close"
                        style={
                            searchValue.trim().length === 0
                                ? { display: "none" }
                                : { display: "block" }
                        }
                        onClick={() => UserService.doLogin()}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <button
                    type="button"
                    className="btn btn-primary col-1"
                    onClick={handleSearch}
                    disabled={searchValue.trim().length === 0}
                >
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
            <div>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item dropdown">
                        <button
                            className="nav-link dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Welcome{" "}
                            {username.charAt(0).toUpperCase() +
                                username.slice(1)}
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <button className="dropdown-item" onClick={() => {
                                    localStorage.removeItem('user-token')
                                    window.location.href = process.env.LOGOUT_URL
                                }}>
                                <i className="fa fa-sign-out" aria-hidden="true"></i>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
