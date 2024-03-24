import dotenv from 'dotenv';
import { app } from './app'
import { dataSource } from "../ormconfig";

dotenv.config();

dataSource
  .initialize()
  .then(() => {
    console.log("Database has been connected")
  })
  .catch((err) => {
    console.error("Error during Database initialization:", err)
  })

app.get('/', (req, res) => {
  res.send("Hello from the other side");
});

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is running on http://${host}:${port}...`)
})
