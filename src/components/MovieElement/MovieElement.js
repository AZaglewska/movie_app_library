import React, { useContext } from "react";
import MoviesContext from "../../context/context";
import { Link } from "react-router-dom";
import "./MovieElement.scss";

const MovieElement = (props) => {
  const context = useContext(MoviesContext);
  const { addMovieToFavorite, getMoviesDetails } = context;
  const { id, title, year, poster } = props;
  return (
    <div className="movie">
      <div className="movie__container">
        <h2 className="movie__title">
          {title.length < 20 ? title : `${title.substring(0, 17)}...`}
        </h2>
        <h3 className="movie__date">Release date: {year}</h3>
        <div
          className="movie__poster-cont"
          onClick={() => getMoviesDetails(id)}
        >
          <Link to="/fullMovie" className="movie__link">
            <img src={poster} alt={title} className="movie__poster" />
          </Link>
        </div>

        <div className="movie__btn-cont">
          <button
            className="movie__btn-fav"
            onClick={() => addMovieToFavorite(title)}
          >
            Add to Favorite
          </button>
          <Link to="/fullMovie">
            <button
              className="movie__btn-desc"
              onClick={() => getMoviesDetails(id)}
            >
              See Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieElement;
