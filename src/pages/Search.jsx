import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
useSearchParams;
import MovieCard from "../components/MovieCard";

const searchURL = "https://api.themoviedb.org/3/search/movie";
const apiKey = import.meta.env.VITE_API_KEY;

import "./MoviesGrid.css";
import axios from "axios";

//FUNÇÃO QUE TRATA DO SEARCH, OU SEJA, VAI EXIBIR A LISTA DE FILMES DE ACORDO COM O QUE É PESQUISADO
const Search = () => {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q");

  const getSearchedMovies = async (url) => {
    const response = await axios.get(url);
    console.log("response", response);
    const dataSearchMovies = await response.data.results;

    setMovies(dataSearchMovies);
  };

  useEffect(() => {
    const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`;

    getSearchedMovies(searchWithQueryURL);
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">
        Resultado para: <span className="query-text">{query}</span>{" "}
      </h2>
      <div className="movies-container">
        {movies.length === 0 && <p>Carregando...</p>}
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Search;
