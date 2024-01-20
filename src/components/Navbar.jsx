/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { searchUser } from "../app/features/userDetailSlice";

const Navbar = () => {
  const { users } = useSelector((state) => state.app);

  const [searchData, setSearchData] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchUser(searchData));
  }, [searchData]);

  return (
    <nav className="navbar navbar-expand-sm bg-body-tertiary">
      <div className="container-fluid">
        <b className="navbar-brand ">Navbar</b>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                style={({ isActive }) => {
                  return isActive ? { color: "black" } : { color: "grey" };
                }}
                className="nav-link active"
                aria-current="page"
                href="#"
              >
                Create Post
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/users"
                style={({ isActive }) => {
                  return isActive ? { color: "black" } : { color: "grey" };
                }}
                className="nav-link"
                href="#"
              >
                All Post <b>({users.length})</b>
              </NavLink>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2 "
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearchData(e.target.value)}
            />
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
