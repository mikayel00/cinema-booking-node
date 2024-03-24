import express from 'express';
import { createMovie, updateMovie, deleteMovie, getMovies } from "../services/movies.service";

export const moviesRoute = express.Router();

moviesRoute
    .get('/', getMovies)
    .post('/create', createMovie)
    .patch('/:id/update', updateMovie)
    .delete('/:id', deleteMovie)

