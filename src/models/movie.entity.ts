import { Entity, Column, OneToMany } from "typeorm"
import { MovieSessionEntity } from "./movie-session.entity";
import { AbstractEntity } from "../common/abstract.entity";

@Entity({ name: 'movies' })
export class MovieEntity extends AbstractEntity {
    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "varchar", nullable: true })
    poster_url: string;

    @OneToMany(
        () => MovieSessionEntity,
        (movieSessionEntity) => movieSessionEntity.movie,
    )
    sessions?: MovieSessionEntity[];
}
