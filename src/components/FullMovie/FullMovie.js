import React, { useContext } from "react";
import MoviesContext from "../../context/context";
import { Link } from "react-router-dom";
import "./FullMovie.scss";
import Navbar from "../navigation/Navbar/Navbar";

const FullMovie = () => {
  const context = useContext(MoviesContext);
  const { moviesDetails, isHamburgerMenuOpen } = context;

  const {
    Title,
    Poster,
    Plot,
    Actors,
    Director,
    Production,
    Released,
    imdbRating,
  } = moviesDetails;

  return (
    <>
      <Navbar />
      <div className={isHamburgerMenuOpen ? "full-movie--open" : "full-movie"}>
        <div className="full-movie__cont">
          <div className="full-movie__poster">
            <img className="full-movie__img" src={Poster} alt="" />
          </div>
          <div className="full-movie__elements">
            <h2 className="full-movie__title">{Title}</h2>
            <div className="full-movie__content">
              <h3 className="full-movie__date">Release date:{Released}</h3>

              <h3 className="full-movie__director">Director:{Director}</h3>
              <h3 className="full-movie__production">
                Production:{Production}
              </h3>
              <p className="full-movie__desc">{Plot}</p>
              <h3 className="full-movie__actors">Actors:{Actors}</h3>
              <h3 className="full-movie__rate">Rate:{imdbRating}</h3>
            </div>
            <div className="full-movie__btn-cont">
              <Link to="/movies">
                <button className="full-movie__button">Back to movies</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FullMovie;
