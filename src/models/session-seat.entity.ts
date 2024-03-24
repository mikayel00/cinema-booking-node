 import { Entity, Column, ManyToOne, JoinColumn, Unique } from "typeorm"
import { AbstractEntity } from "../common/abstract.entity";
import { MovieSessionEntity } from "./movie-session.entity";

@Unique(['session_id', 'row', 'seat'])
@Entity({ name: 'session_seats' })
export class SessionSeatEntity extends AbstractEntity{
    @Column({ type: "int" })
    session_id: number;

    @Column({ type: "int" })
    row: number;

    @Column({ type: "int" })
    seat: number;

    @Column({ type: "boolean" })
    is_available: boolean;

    @ManyToOne(
        () => MovieSessionEntity,
        (movieSessionEntity) => movieSessionEntity.seats,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    )
    @JoinColumn({ name: 'session_id' })
    session?: MovieSessionEntity;
}
