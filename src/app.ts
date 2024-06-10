import dotenv from 'dotenv';
import express from 'express';
import { dataSource } from './ormconfig'
import router from './routes';
import morgan from 'morgan';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(morgan(':date[clf] ":method :url HTTP/:http-version" :status :res[content-length]'));

dataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

app.use('', router);
router.get('/', (req, res) => {
  res.send('Welcome to the homepage');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});