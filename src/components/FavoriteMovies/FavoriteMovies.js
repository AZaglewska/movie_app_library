import React, { useContext } from "react";
import MoviesContext from "../../context/context";
import Navbar from "../navigation/Navbar/Navbar";
import { Link } from "react-router-dom";
import "./FavoriteMovies.scss";

const FavoriteMovies = () => {
  const context = useContext(MoviesContext);

  const {
    favoriteMovies,
    deleteMovieFromFavorite,
    getMoviesDetails,
    isHamburgerMenuOpen,
  } = context;

  return (
    <div>
      <Navbar />
      <div className={isHamburgerMenuOpen ? "fav-movie--open" : "fav-movie"}>
        <h1 className="fav-movie__title">Your favorite movies</h1>
        {favoriteMovies.length === 0 ? (
          <h1 className="fav-movie__title">
            You dont have your favorite movies yet! Please add some!
          </h1>
        ) : (
          <ul className="fav-movie__list">
            {favoriteMovies.map((movie) => {
              const { imdbID, Title, Year, Poster } = movie;
              return (
                <li key={imdbID}>
                  <div className="fav-movie__list-cont">
                    <div>
                      <h2 className="fav-movie__list-title">
                        {Title.length < 17
                          ? Title
                          : `${Title.substring(0, 17)}...`}
                      </h2>
                      <div>
                        <h3 className="fav-movie__list-date">Date:{Year}</h3>
                      </div>

                      <div
                        className="fav-movie__list-poster"
                        onClick={() => getMoviesDetails(imdbID)}
                      >
                        <Link to="/fullMovie" className="fav-movie__list-link">
                          <img
                            src={Poster}
                            alt={Title}
                            className="fav-movie__list-img"
                          />
                        </Link>
                      </div>
                      <div className="fav-movie__list-btn">
                        <button
                          className="fav-movie__list-delete"
                          onClick={() => deleteMovieFromFavorite(Title)}
                        >
                          Delete from favorite
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FavoriteMovies;
