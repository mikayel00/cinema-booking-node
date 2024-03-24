import { Entity, Column, OneToMany } from "typeorm"
import { MovieSessionEntity } from "./movie-session.entity";
import { AbstractEntity } from "../common/abstract.entity";

@Entity({ name: 'halls' })
export class HallEntity extends AbstractEntity {
    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "int" })
    rows_count: number;

    @Column({ type: "int" })
    seats_per_row: number;

    @OneToMany(
        () => MovieSessionEntity,
        (movieSessionEntity) => movieSessionEntity.hall,
    )
    sessions?: MovieSessionEntity[];
}
