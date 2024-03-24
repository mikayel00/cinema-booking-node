import { dataSource } from "../../ormconfig";
import { SessionSeatEntity } from "../models/session-seat.entity";

const sessionSeatRepository = dataSource.getRepository(SessionSeatEntity);

export async function bookSeat(req, res): Promise<void> {
    const sessionSeat = await sessionSeatRepository
        .createQueryBuilder('sessionSeat')
        .where('sessionSeat.session_id = :sessionId', {sessionId: req.body.sessionId})
        .andWhere('sessionSeat.id = :seatId', { seatId: req.params.seatId})
        .getOneOrFail();

    if (!sessionSeat.is_available) {
        throw new Error('Seat is not available')
    }

    sessionSeatRepository.merge(sessionSeat, {
        is_available: false,
    })

    await sessionSeatRepository.save(sessionSeat);

    res.status(204).send();
}
