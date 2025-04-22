import React from "react";
import { Card, Button } from "react-bootstrap";

const MovieCard = ({ title, poster_path, onAction, actionLabel }) => (
    <Card className="bg-dark text-white movie-card">
        {poster_path && (
            <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w200${poster_path}`}
                alt={title}
                loading="lazy"
                className="rounded"
            />
        )}
        <Card.Body className="d-flex flex-column align-items-center">
            <Card.Title className="text-center">{title}</Card.Title>
            {onAction && (
                <Button variant="light" onClick={onAction} className="mt-2">
                    {actionLabel}
                </Button>
            )}
        </Card.Body>
    </Card>
);

export default MovieCard;
