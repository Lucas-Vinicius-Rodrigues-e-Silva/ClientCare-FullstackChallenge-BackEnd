import AppError from "../../errors/AppError";
import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import { NextFunction, Request, Response } from "express";

export const ensureClientExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientRepository = AppDataSource.getRepository(Client);
  const clientUser = await clientRepository.findOneBy({ id: req.params.id });

  if (!clientUser) {
    throw new AppError("Client not found", 404);
  }
  return next();
};
