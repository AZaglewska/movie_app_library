import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MoviesContext from "./context/context";
import axios from "axios";
import Home from "./components/Home/Home";
import MovieForm from "./components/MovieForm/MovieForm";
import FavoriteMovies from "./components/FavoriteMovies/FavoriteMovies";
import FullMovie from "./components/FullMovie/FullMovie";

const Root = () => {
  const [movies, setMovies] = useState([]);
  const [moviesDetails, setMoviesDetails] = useState({});
  const [favoriteMovies, setFavoriteMovies] = useState([...new Set([])]);
  const [error, setError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [results, setResults] = useState([]);
  const [currentMovieTitle, setCurrentMovieTitle] = useState("");
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);
  const [nextPageMovies, setNextPageMovies] = useState([]);
  const [isHamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);

  const toggleHamburgerMenuOpen = () => {
    setHamburgerMenuOpen(!isHamburgerMenuOpen);
  };

  const handleSetCurrentMovieTitle = (e) => {
    const movieTitleInputValue = e.target.value;
    setPage(1);
    setCurrentMovieTitle(movieTitleInputValue);
    setMovies([]);
  };

  const incresePage = () => {
    setPage(page + 1);
  };

  const getLessMovies = () => {
    const lessMovies = movies.slice(0, movies.length - 10);
    setMovies([...new Set([...lessMovies])]);
    setPage(page - 1);
  };

  useEffect(() => {
    getMoviesTitle();
  }, [page]);

  useEffect(() => {
    setMovies([...new Set([...nextPageMovies])]);
    if (movies.length > 0) {
      if (
        nextPageMovies[nextPageMovies.length - 1].Title !==
        movies[movies.length - 1].Title
      ) {
        setMovies([...new Set([...movies, ...nextPageMovies])]);
      } else {
        const lessMovies = movies.slice(0, movies.length - 10);
        setMovies([...new Set([...lessMovies, ...nextPageMovies])]);
      }
    }
  }, [nextPageMovies]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
  };

  const getMoviesTitle = () => {
    if (currentMovieTitle !== "") {
      const movieTitleObject = {
        method: "GET",
        url: "https://rapidapi.p.rapidapi.com/",
        params: {
          r: "json",
          s: `${currentMovieTitle}`,
          y: "",
          page: `${page}`,
          t: "",
        },
        headers: {
          "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
          "x-rapidapi-key": `${process.env.REACT_APP_RAPID_API_KEY}`,
        },
      };

      axios
        .request(movieTitleObject)
        .then((response) => {
          const movieTitleData = response.data.Search;
          const limit = response.data.totalResults / 10;
          setNextPageMovies([...movieTitleData]);
          setPageLimit(limit);
          setError(false);
          setErrorContent("");
          setResults([]);
        })

        .catch((error) => {
          setError(true);
          setErrorContent("Movie not found!");
          setMovies([]);
        });
    }
  };

  const getMoviesDetails = (movieId) => {
    const movieDetailsObject = {
      method: "GET",
      url: "https://rapidapi.p.rapidapi.com/",
      params: { i: `${movieId}`, r: "json", plot: "full" },
      headers: {
        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
        "x-rapidapi-key": `${process.env.REACT_APP_RAPID_API_KEY}`,
      },
    };

    axios
      .request(movieDetailsObject)
      .then((response) => {
        setMoviesDetails(response.data);
      })
      .catch((error) => {});
  };

  const addMovieToFavorite = (movieTitle) => {
    const filteredFavoriteMovies = movies.filter(
      (movie) => movie.Title === movieTitle
    );

    setFavoriteMovies([
      ...new Set([...favoriteMovies, ...filteredFavoriteMovies]),
    ]);
  };

  const deleteMovieFromFavorite = (movieTitle) => {
    const filteredFavoriteMovies = favoriteMovies.filter(
      (favoriteMovie) => favoriteMovie.Title !== movieTitle
    );

    setFavoriteMovies(...new Set([filteredFavoriteMovies]));
  };

  return (
    <BrowserRouter>
      <MoviesContext.Provider
        value={{
          movies,
          moviesDetails,
          getMoviesTitle,
          getMoviesDetails,
          favoriteMovies,
          addMovieToFavorite,
          deleteMovieFromFavorite,
          error,
          errorContent,
          pageLimit,
          handleSetCurrentMovieTitle,
          incresePage,
          handleFormSubmit,
          getLessMovies,
          isHamburgerMenuOpen,
          toggleHamburgerMenuOpen,
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/movies" component={MovieForm} />
          <Route path="/favorite_movies" component={FavoriteMovies} />
          <Route path="/fullMovie" component={FullMovie} />
        </Switch>
      </MoviesContext.Provider>
    </BrowserRouter>
  );
};

export default Root;
