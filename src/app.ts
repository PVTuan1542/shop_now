import dotenv from 'dotenv';
import express from 'express';
import { dataSource } from './ormconfig'

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

console.log(dataSource)

console.log(process.env.DB_DATABASE);

dataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });


  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });