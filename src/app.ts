import "reflect-metadata";
import cors from "cors";
import "express-async-errors";
import express from "express";
import handleError from "./errors/handleError";
import userRoutes from "./routes/users/user.routes";
import clientRoutes from "./routes/clients/clients.routes";
import sessionRoutes from "./routes/session/session.routes";
import contactRoutes from "./routes/contacts/contacts.routes";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/login", sessionRoutes);
app.use("/users", userRoutes);
app.use("/clients", clientRoutes);
app.use("/contacts", contactRoutes);

app.use(handleError);
export default app;
