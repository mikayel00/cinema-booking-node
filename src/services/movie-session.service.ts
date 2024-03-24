import { dataSource } from "../../ormconfig";
import { MovieSessionEntity } from "../models/movie-session.entity";
import { createHallSeats } from "./hall-seat.service";

const movieSessionRepository = dataSource.getRepository(MovieSessionEntity);
export async function getAvailableMoviesForHall(req, res) {
    const dateNow = new Date();

    const movieSessions =  await movieSessionRepository
        .createQueryBuilder('movieSession')
        .leftJoinAndSelect('movieSession.movie', 'movie')
        .leftJoinAndSelect('movieSession.seats', 'seats')
        .where('movieSession.hall_id = :hallId', { hallId: req.params.hallId })
        .andWhere('movieSession.start_time > :dateNow', { dateNow })
        .orderBy('movieSession.start_time', 'ASC')
        .addOrderBy('seats.row', 'ASC')
        .addOrderBy('seats.seat', 'ASC')
        .getMany();

    res.status(200).json(
        { data: movieSessions }
    );
}

export async function createMovieSession(req, res) {
    const movieSession = new MovieSessionEntity();
    movieSession.hall_id = req.body.hallId;
    movieSession.movie_id = req.body.movieId;
    movieSession.start_time = req.body.startTime;
    await movieSessionRepository.save(movieSession);

    await createHallSeats(movieSession.id, req.body.hallId);

    res.status(200).json(
        movieSession,
    );
}
