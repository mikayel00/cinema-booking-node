import express from 'express';
import { getAvailableMoviesForHall } from '../services/movie-session.service';
import { createHall, deleteHall, getHalls, updateHall } from "../services/hall.service";

export const hallRoute = express.Router();

hallRoute
    .get('/:hallId/get-available-movies', getAvailableMoviesForHall)
    .get('/', getHalls)
    .post('/create', createHall)
    .patch('/:id/update', updateHall)
    .delete('/:id', deleteHall)

