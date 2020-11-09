import React, { useContext } from "react";
import MoviesContext from "../../context/context";
import Navbar from "../navigation/Navbar/Navbar";
import "./MovieForm.scss";
import MoviesList from "../MoviesList/MoviesList";

const MovieForm = () => {
  const context = useContext(MoviesContext);

  const {
    getMoviesTitle,
    error,
    errorContent,
    handleSetCurrentMovieTitle,
    handleFormSubmit,
    isHamburgerMenuOpen,
  } = context;
  return (
    <>
      <Navbar />

      <div className={isHamburgerMenuOpen ? "form__open" : "form"}>
        <form
          onSubmit={(e) => {
            getMoviesTitle();
            handleFormSubmit(e);
          }}
        >
          <input
            type="text"
            name="movieTitle"
            placeholder="e.g. Star Wars"
            className="form__input"
            onChange={handleSetCurrentMovieTitle}
          />
          <div className="form__btn-container">
            <button type="submit" className="form__button">
              Search
            </button>
          </div>

          {error ? <h1 className="form__error">{errorContent}</h1> : null}
        </form>
      </div>
      <MoviesList />
    </>
  );
};

export default MovieForm;
