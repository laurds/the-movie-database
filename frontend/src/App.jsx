import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Componentes internos
import MovieCard from "./components/MovieCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const App = () => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/favorites")
            .then((res) => setResults(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleSearch = async () => {
        try {
            const { data } = await axios.get("https://api.themoviedb.org/3/search/movie", {
                params: { api_key: API_KEY, query: search },
            });
            setResults(data.results);
        } catch (err) {
            console.error(err);
        }
    };

    const handleFavorite = async (movie) => {
        await axios.post("http://localhost:8000/favorites", {
            tmdb_id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            genre_ids: movie.genre_ids,
        });
        toast.success("Filme adicionado aos favoritos!");
        setResults((prev) => [...prev, movie]);
    };

    return (
        <Container className="mt-4">
            <h1 className="text-center title-page">🎬 Catálogo de Filmes</h1>

            {/* Barra de busca */}
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Control
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar filme..."
                    />
                </Col>
                <Col md={2}>
                    <Button variant="info" className="w-100" onClick={handleSearch}>
                        Buscar
                    </Button>
                </Col>
                <Col md={4}>
                    <Link className="link" to="/favoritos">
                        <Button variant="info" className="w-100">
                           ⭐ Favoritos
                        </Button>
                    </Link>
                </Col>
            </Row>

            {/* Lista de resultados */}
            <Row className="g-4">
                {results.length === 0 ? (
                    <p className="text-center text-muted">Nenhum resultado encontrado.</p>
                ) : (
                    results.map((movie) => (
                        <Col md={4} key={movie.id}>
                            <MovieCard
                                title={movie.title}
                                poster_path={movie.poster_path}
                                onAction={() => handleFavorite(movie)}
                                actionLabel="Favoritar"
                            />
                        </Col>
                    ))
                )}
            </Row>

            <ToastContainer />
        </Container>
    );
};

export default App;
