import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MoviesContext from "../../../context/context";
import "./HamburgerMenu.scss";

const HamburgerMenu = () => {
  const context = useContext(MoviesContext);
  const { isHamburgerMenuOpen } = context;

  return (
    <>
      <div className="hamburger">
        <ul
          className={
            isHamburgerMenuOpen ? "hamburger__list__open" : "hamburger__list"
          }
        >
          <div className="hamburger__list-container">
            <li
              className={
                isHamburgerMenuOpen
                  ? "hamburger__element__open"
                  : "hamburger__element"
              }
            >
              <Link className="hamburger__link" to="/">
                Home
              </Link>
            </li>
          </div>
          <div className="hamburger__list-container">
            <li
              className={
                isHamburgerMenuOpen
                  ? "hamburger__element__open"
                  : "hamburger__element"
              }
            >
              <Link className="hamburger__link" to="/movies">
                Search Movies
              </Link>
            </li>
          </div>
          <div className="hamburger__list-container">
            <li
              className={
                isHamburgerMenuOpen
                  ? "hamburger__element__open"
                  : "hamburger__element"
              }
            >
              <Link className="hamburger__link" to="/favorite_movies">
                Favorite Movies
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </>
  );
};
export default HamburgerMenu;
