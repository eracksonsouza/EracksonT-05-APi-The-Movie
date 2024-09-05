import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Movie from "./pages/Movie.jsx";
import Category from "./pages/Category.jsx";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="movie/:id" element={<Movie />} />
          <Route path="search" element={<Search />} />
          {/* agora vou add as rotas das categorias */}
          <Route path="category/popular" element={<Category/>}/>
          <Route path="category/top_rated" element={<Category/>}/>
          <Route path="category/now_playing" element={<Category/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
