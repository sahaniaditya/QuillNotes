import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// eslint-disable-next-line

function Navbar() {
  let location = useLocation();
  let history = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("token");
    history("/login");
  };
  useEffect(() => {
    
  }, [location]);
  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "navy", color: "white", marginBottom: 0 }}
      >
        <div className="container-fluid">
          <Link to="/">iNotebook</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item mx-5">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-item mx-5">
                <Link to="/about">About</Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <Link to="/login">
                  <button type="button" className="btn btn-primary mx-3">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button type="button" className="btn btn-primary mx-3">
                    SignUp
                  </button>
                </Link>
              </form>
            ) : (
              <button
                type="button"
                onClick={handleClick}
                className="btn btn-primary mx-3"
              >
                LogOut
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
