import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { FaHourglassHalf } from "react-icons/fa";
import "./MoviesGrid.css";
import axios from "axios";

const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

//FUNÇÃO QUE VAI MOSTRAR OS TOPS FILMES NA HOME
const Home = () => {
  const [topMovies, setTopMovies] = useState([]);

  const categories = ["Top Movies", "Action", "Comedy", "Drama"];

  const getTopRatedMovies = async (url) => {
    try {
      const response = await axios.get(url);
      const topMovies = await response.data.results;
      console.log(topMovies);
      setTopMovies(topMovies);
    } catch (error) {
      console.error("Erro ao buscar filmes: ", error);
    }
  };

  useEffect(() => {
    const topRatedUrl = `${moviesUrl}top_rated?${apiKey}`;

    getTopRatedMovies(topRatedUrl);
  }, []);

  return (
    <div className="container">
      <div>
        <h1>Filtrar por categorias: </h1>
        <div className="categories-list">
          {categories.map((category) => (
            <Link key={category} to={`/category/${category.toLowerCase()}`} className="category-button">
              {category}
            </Link>
          ))}
        </div>
      </div>
      <h2 className="title">Top Filmes do Século </h2>
      <div className="movies-container">
        {topMovies.length === 0 && (
          <p>
            Carregando... <FaHourglassHalf />
          </p>
        )}
        {topMovies.length > 0 &&
          topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Home;
