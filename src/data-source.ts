import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./users/entities/user.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "asg123asg",
  database: "apollo-server-boilerplate",
  logging: false,
  entities: [User],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
