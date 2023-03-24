import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { Client } from "./entities/client.entity";
import { Contact } from "./entities/contacts.entity";
import { alterUser1679505317643 } from "./migrations/1679505317643-alterUser";
import { initialMigration1679428883584 } from "./migrations/1679428883584-initialMigration";
import { createClientAndContact1679517734768 } from "./migrations/1679517734768-createClientAndContact";
import { initialMigration1679578485699 } from "./migrations/1679578485699-initialMigration";

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
        migrations: [
          initialMigration1679428883584,
          alterUser1679505317643,
          createClientAndContact1679517734768,
          initialMigration1679578485699,
        ],
      }
);

export default AppDataSource;
