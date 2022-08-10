import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./users/entities/user.entity";

export const connectDB = async () => {
  let source = {};
  if (process.env.NODE_ENV === "production") {
    source = {
      url: process.env.DATABASE_URL,
      ssl: true,
    };
  } else if (process.env.NODE_ENV === "development") {
    source = {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    };
  }

  try {
    await createConnection({
      type: "postgres",
      ...source,
      logging: false,
      entities: [User],
      migrations: ["src/migrations/*.ts"],
      subscribers: [],
    });
    console.log("Database successfully initialized");
  } catch (error) {
    console.log(`Database failed to connect ${error.message}`);
  }
};
