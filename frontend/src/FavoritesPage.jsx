import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Container, Row, Col, Form } from "react-bootstrap";
import MovieCard from "./components/MovieCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8000/favorites").then((res) => setFavorites(res.data));
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=pt-BR`)
            .then((res) => setGenres(res.data.genres));
    }, []);

    const handleRemove = async (movie) => {
        await axios.delete(`http://localhost:8000/favorites/${movie.tmdb_id}`);
        setFavorites((prev) => prev.filter((f) => f.tmdb_id !== movie.tmdb_id));
        toast.success("Removido dos favoritos!");
    };

    const filtered = selectedGenre
        ? favorites.filter((fav) => (JSON.parse(fav.genre_ids || "[]") || []).includes(Number(selectedGenre)))
        : favorites;

    return (
        <Container className="mt-4">
            <h1 className="text-center">🎞️ Meus Favoritos</h1>
            <Row className="mb-3 justify-content-between">
                <Col>
                    <a href="/" className="btn btn-secondary link">🔙 Voltar</a>
                </Col>
                <Col md="auto">
                    <Form.Select
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                        <option value="">Todos os gêneros</option>
                        {genres.map((g) => (
                            <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>

            {/* Lista de favoritos */}
            <Row className="g-3">
                {filtered.length === 0 ? (
                    <p className="text-center text-muted">Nenhum favorito encontrado.</p>
                ) : (
                    filtered.map((movie) => (
                        <Col md={4} key={movie.id}>
                            <MovieCard
                                title={movie.title}
                                poster_path={movie.poster_path}
                                onAction={() => handleRemove(movie)}
                                actionLabel="🗑️ Remover"
                            />
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
};

export default FavoritesPage;
