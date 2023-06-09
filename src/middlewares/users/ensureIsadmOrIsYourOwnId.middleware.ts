import AppError from "../../errors/AppError";
import { Request, Response, NextFunction } from "express";

export const ensureUserIsAdmOrIsYourOwnIdMiddlware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isAdm = req.user.isAdm;

  const userToBeDeleteOrEditId = req.params.id;

  const userThatMakesTheRequestId = req.user.id;

  if (!isAdm && userThatMakesTheRequestId !== userToBeDeleteOrEditId) {
    throw new AppError("Missing Admin authorization", 403);
  }

  return next();
};

export default ensureUserIsAdmOrIsYourOwnIdMiddlware;
