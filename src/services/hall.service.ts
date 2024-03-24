import { dataSource } from "../../ormconfig";
import { HallEntity } from "../models/hall.entity";

const hallRepository = dataSource.getRepository(HallEntity);

export async function getHallById(id: number): Promise<HallEntity> {
    const hallEntity = await hallRepository
        .createQueryBuilder('hall')
        .where('hall.id = :id', { id })
        .getOne();

    if (!hallEntity) {
        throw new Error('Hall not found');
    }

    return hallEntity;
}

export async function createHall(req, res) {
    const hallEntity = hallRepository.create({
        name: req.body.name,
        rows_count: req.body.rowsCount,
        seats_per_row: req.body.seatsPerRow,
    })

    await hallRepository.save(hallEntity);

    res.status(200).json(
        hallEntity,
    );
}

export async function getHalls(req, res) {
    const movieEntities = await hallRepository
        .createQueryBuilder('hall')
        .getMany();

    res.status(200).json(
        movieEntities,
    );
}

export async function updateHall(req, res) {
    const hallEntity = await hallRepository
        .createQueryBuilder('halls')
        .where('halls.id = :id', {id: req.params.id})
        .getOneOrFail();

    hallRepository.merge(hallEntity, {
        name: req.body.name || hallEntity.name,
        rows_count: req.body.rowsCount || hallEntity.rows_count,
        seats_per_row: req.body.seatsPerRow || hallEntity.seats_per_row,
    });

    await hallRepository.save(hallEntity);

    res.status(204).send();
}

export async function deleteHall(req, res) {
    await hallRepository
        .createQueryBuilder()
        .where('id = :id', {id: req.params.id})
        .delete()
        .execute();

    res.status(204).send();
}
