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
  const findClient = await clientRepository.findOneBy({
    email: req.body.email,
  });

  if (findClient) {
    throw new AppError("Client already exists!", 404);
  }
  return next();
};
