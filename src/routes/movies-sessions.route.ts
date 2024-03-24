import express from 'express';
import { createMovieSession } from '../services/movie-session.service';

export const moviesSessionRoute = express.Router();

moviesSessionRoute
    .post('/create', createMovieSession)

