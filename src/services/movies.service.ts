import { dataSource } from "../../ormconfig";
import { MovieEntity } from "../models/movie.entity";

const moviesRepository = dataSource.getRepository(MovieEntity);

export async function createMovie(req, res) {
    const movieEntity = moviesRepository.create({
        name: req.body.name,
        poster_url: req.body.posterUrl,
    })

    await moviesRepository.save(movieEntity);

    res.status(200).json(
        movieEntity,
    );
}

export async function getMovies(req, res) {
    const movieEntities = await moviesRepository
        .createQueryBuilder('movies')
        .getMany();

    res.status(200).json(
        movieEntities,
    );
}

export async function updateMovie(req, res) {
    const movieEntity = await moviesRepository
        .createQueryBuilder('movies')
        .where('movies.id = :id', {id: req.params.id})
        .getOneOrFail();

    moviesRepository.merge(movieEntity, {
        name: req.body.name || movieEntity.name,
        poster_url: req.body.posterUrl || movieEntity.poster_url,
    });

    await moviesRepository.save(movieEntity);

    res.status(204).send();
}

export async function deleteMovie(req, res) {
    await moviesRepository
        .createQueryBuilder()
        .where('id = :id', {id: req.params.id})
        .delete()
        .execute();

    res.status(204).send();
}
