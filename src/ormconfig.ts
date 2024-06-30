import { DataSource } from "typeorm";
import dotenv from 'dotenv';

dotenv.config();

export const dataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_DATABASE || 'shopnow',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  logging: false,
  synchronize: false,
  migrations: [__dirname + "/migrations/**/*{.js,.ts}"],
  migrationsRun: false,
  entities: [__dirname + "/entities/**/*{.js,.ts}"],
});