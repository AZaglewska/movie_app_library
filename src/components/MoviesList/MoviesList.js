import React, { useContext } from "react";
import MoviesContext from "../../context/context";
import MovieElement from "../MovieElement/MovieElement";
import "./MoviesList.scss";

const MoviesList = () => {
  const context = useContext(MoviesContext);

  const { movies, pageLimit, incresePage, getLessMovies } = context;

  return (
    <>
      {
        <>
          <ul className="movie-list">
            {movies.map((movie) => {
              const { Title, Poster, Type, Year, imdbID } = movie;

              return (
                <li key={imdbID}>
                  <MovieElement
                    title={Title}
                    poster={Poster}
                    type={Type}
                    year={Year}
                    id={imdbID}
                  />
                </li>
              );
            })}
          </ul>
          <div className="buttonContainer">
            {pageLimit > 1 ? (
              <button onClick={incresePage} className="buttonStyles">
                load more
              </button>
            ) : (
              ""
            )}
            {movies.length > 10 ? (
              <button className="buttonStyles" onClick={getLessMovies}>
                load less
              </button>
            ) : (
              ""
            )}
          </div>
        </>
      }
    </>
  );
};

export default MoviesList;
