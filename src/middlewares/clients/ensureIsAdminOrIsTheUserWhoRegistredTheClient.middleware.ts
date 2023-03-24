import AppError from "../../errors/AppError";
import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import { Request, Response, NextFunction } from "express";

const ensureIsAdminOrIsTheUserWhoRegistredTheClientMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userThatMakesTheRequest = req.user.id;
  const userIsAdmin = req.user.isAdm;
  const clientId = req.params.id;

  const clientRepository = AppDataSource.getRepository(Client);

  const findTheClient = await clientRepository
    .createQueryBuilder("clients")
    .where("clients.id = :id", { id: clientId })
    .innerJoinAndSelect("clients.userWhoAdd", "users")
    .where("users.id = clients.userWhoAdd ")
    .getOne();

  if (
    !userIsAdmin &&
    findTheClient?.userWhoAdd.id !== userThatMakesTheRequest
  ) {
    throw new AppError(
      "You can only update, delete or list you own clients/contacts!",
      403
    );
  }

  return next();
};

export default ensureIsAdminOrIsTheUserWhoRegistredTheClientMiddleware;
