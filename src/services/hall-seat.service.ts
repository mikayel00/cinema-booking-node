import { getHallById } from "./hall.service";
import { dataSource } from "../../ormconfig";
import { SessionSeatEntity } from "../models/session-seat.entity";

const sessionSeatRepository = dataSource.getRepository(SessionSeatEntity);

export async function createHallSeats(sessionId: number, hallId: number): Promise<void> {
    const hall = await getHallById(hallId);
    const hallSeats: SessionSeatEntity[] = [];

    for (let row = 1; row <= hall.rows_count; ++row) {
        for (let seat = 1; seat <= hall.seats_per_row; ++seat) {
            hallSeats.push(sessionSeatRepository.create({
                session_id: sessionId,
                row,
                seat,
                is_available: true,
            }))
        }
    }
    await sessionSeatRepository.save(hallSeats);
}
