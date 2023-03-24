import { Request, Response } from "express";
import listAllClientsFromAUserService from "../../services/clients/listAllClientsFromAUser.service";

const listAllClientsFromAUserController = async (
  req: Request,
  res: Response
) => {
  const userId = req.user.id;
  const clients = await listAllClientsFromAUserService(userId);
  return res.status(200).json(clients);
};

export default listAllClientsFromAUserController;
