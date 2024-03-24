import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const dataSource: DataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_DATABASE || "cinema_booking",
    synchronize: true,
    logging: true,
    entities: [
        "src/**/*.entity{.ts,.js}",
        "src/../../modules/**/*.view-entity{.ts,.js}",
    ],
    migrations: ["src/../../database/migrations/*{.ts,.js}"],
    subscribers: [
        __dirname + "dist/subscriber/**/*.js"
    ],
})
