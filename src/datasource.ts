import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_DATABASE || "cinema_booking",
  synchronize: false,
  logging: true,
  entities: [
    "dist/entity/**/*.js"
  ],
  migrations: [
    "dist/migration/**/*.js"
  ],
  subscribers: [
    "dist/subscriber/**/*.js"
  ],
})
