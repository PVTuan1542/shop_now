import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: false,
  synchronize: false,
  migrations: ["../migration/**/*.ts"],
  migrationsRun: true,
  entities: ["./src/entities"],
});