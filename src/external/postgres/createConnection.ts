import pg from "pg";
import { Sequelize } from "sequelize";

export const createConnection = async () => {
  return new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      dialectModule: pg,
      dialectOptions: {
        ssl: {
          require: true,
        },
      },
      dialect: "postgres",
    }
  );
};
