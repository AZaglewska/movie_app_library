import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import HamburgerMenuIcon from "react-hamburger-menu";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import MoviesContext from "../../../context/context.js";

const Navbar = () => {
  const context = useContext(MoviesContext);
  const { isHamburgerMenuOpen, toggleHamburgerMenuOpen } = context;
  return (
    <div className="nav-container">
      <HamburgerMenuIcon
        isOpen={isHamburgerMenuOpen}
        menuClicked={toggleHamburgerMenuOpen}
        width={25}
        height={20}
        strokeWidth={3}
        rotate={0}
        color="orange"
        borderRadius={0}
        animationDuration={0.5}
        className="hamburgerMenuIcon"
      />
      <HamburgerMenu />
      <div className="nav">
        <ul className="nav__list">
          <div className="nav__list-container">
            <li className="nav__element">
              <Link className="nav__link" to="/">
                Home
              </Link>
            </li>
          </div>
          <div className="nav__list-container">
            <li className="nav__element">
              <Link className="nav__link" to="/movies">
                Search Movies
              </Link>
            </li>
          </div>
          <div className="nav__list-container">
            <li className="nav__element">
              <Link className="nav__link" to="/favorite_movies">
                Favorite Movies
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
