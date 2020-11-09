import React, { useContext } from "react";
import Navbar from "../navigation/Navbar/Navbar";
import { Link } from "react-router-dom";
import "./Home.scss";
import MoviesContext from "../../context/context";

const Home = () => {
  const context = useContext(MoviesContext);
  const { isHamburgerMenuOpen } = context;
  return (
    <div className="home">
      <Navbar />
      <div
        className={
          isHamburgerMenuOpen ? "home__content--open" : "home__content--closed"
        }
      >
        <h1 className="home__title">Movie Library</h1>
        <p className="home__text">Choose your favorite movie</p>
        <div className="home__btn-container">
          <Link to="/movies">
            <button className="home__button  draw-border">Try it out!</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
