import express from 'express';
import { bookSeat } from "../services/session-seat.service";

export const sessionSeatRoute = express.Router();

sessionSeatRoute
    .patch('/:seatId/book', bookSeat)

