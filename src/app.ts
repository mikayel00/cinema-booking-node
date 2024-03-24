import express, { Application } from "express";
import { routes } from "./routes";
import bodyParser from "body-parser";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./../swagger_output.json";

export const app: Application = express();

const jsonParser = bodyParser.json()
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.use('/api/v1', jsonParser, routes);
app.use(morgan('combined'));


