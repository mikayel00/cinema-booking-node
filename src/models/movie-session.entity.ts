 import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { HallEntity } from "./hall.entity";
import { MovieEntity } from "./movie.entity";
import { AbstractEntity } from "../common/abstract.entity";
import { SessionSeatEntity } from "./session-seat.entity";

@Entity({ name: 'movie_sessions' })
export class MovieSessionEntity extends AbstractEntity {
    @Column({ type: "int" })
    hall_id: number;

    @Column({ type: "int" })
    movie_id: number;

    @Column({ type: "timestamp" })
    start_time: Date;

    @ManyToOne(
        () => HallEntity,
        (hallEntity) => hallEntity.sessions,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    )
    @JoinColumn({ name: 'hall_id' })
    hall?: HallEntity;

    @ManyToOne(
        () => MovieEntity,
        (movieEntity) => movieEntity.sessions,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    )
    @JoinColumn({ name: 'movie_id' })
    movie?: MovieEntity;

    @OneToMany(
        () => SessionSeatEntity,
        (hallSeatEntity) => hallSeatEntity.session,
    )
    seats?: SessionSeatEntity[];
}
