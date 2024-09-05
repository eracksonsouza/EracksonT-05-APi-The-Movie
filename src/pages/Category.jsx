import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { FaHourglassHalf } from "react-icons/fa";
import "./MoviesGrid.css";

const moviesUrl = 'https://api.themoviedb.org/3/movie/';
const apiKey = import.meta.env.VITE_API_KEY;

const Category = () => {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);

  // Função para gerar a URL da categoria
  const generateCategoryUrl = (category) => {
    switch (category) {
      case "popular":
        return `${moviesUrl}popular?api_key=${apiKey}`;
      case "top_rated":
        return `${moviesUrl}top_rated?api_key=${apiKey}`;
      case "now_playing":
        return `${moviesUrl}now_playing?api_key=${apiKey}`;
      default:
        console.error("Categoria não encontrada meu parceiro, vai desistir não?");
    }
  };

  const getMoviesByCategory = async (url) => {
    try {
      const response = await axios.get(url);
      const movies = response.data.results;      
      setMovies(movies);
    } catch (error) {
      console.error("Erro ao buscar filmes: ", error);
    }
  };

  useEffect(() => {
    const categoryUrl = generateCategoryUrl(category);

    if (categoryUrl) {
      getMoviesByCategory(categoryUrl);
    }
  }, [category]);

  return (
    <div className="container">
      <h2 className="title">{category ? category.replace('_', ' ') : 'Filmes'}</h2>
      <div className="movies-container">
        {movies.length === 0 && (
          <p>
            Carregando... <FaHourglassHalf />
          </p>
        )}
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Category;
