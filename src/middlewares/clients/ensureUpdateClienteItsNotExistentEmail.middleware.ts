import AppError from "../../errors/AppError";
import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import { NextFunction, Request, Response } from "express";

export const ensureUpdateClientItsNotExistentEmailMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientRepository = AppDataSource.getRepository(Client);
  const clients = await clientRepository.find({ withDeleted: true });

  const clientsAlreadyExists = clients.find(
    (client) => client.email === req.body.email
  );

  if (clientsAlreadyExists) {
    throw new AppError("Client already exists!", 409);
  }
  return next();
};
