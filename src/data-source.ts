import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { Client } from "./entities/client.entity";
import { Contact } from "./entities/contacts.entity";
import { alterUsersAndClientsReturn1679850208793 } from "./migrations/1679850208793-alterUsersAndClientsReturn";

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entities/*.ts"],
      }
    : {
        type: "postgres",
        host: process.env.PGHOST,
        port: parseInt(process.env.PGPORT!),
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        logging: true,
        synchronize: false,
        entities: [User, Client, Contact],
        migrations: [alterUsersAndClientsReturn1679850208793],
      }
);

export default AppDataSource;
