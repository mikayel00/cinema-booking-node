import express from 'express';
import { moviesSessionRoute } from "./movies-sessions.route";
import { sessionSeatRoute } from "./session-seat.route";
import { hallRoute } from "./halls.route";
import { moviesRoute } from "./movies.route";

export const routes = express.Router();

routes.use('/movies-sessions', moviesSessionRoute);
routes.use('/session-seats', sessionSeatRoute);
routes.use('/halls', hallRoute);
routes.use('/movies', moviesRoute);

export default routes;
