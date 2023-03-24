import { Request, Response } from "express";
import { IClientRequest } from "../../interfaces/clients";
import createClientService from "../../services/clients/createClients.service";

const createClientController = async (req: Request, res: Response) => {
  const clientData: IClientRequest = req.body;
  const userThatMakesTheRequestId = req.user.id;
  const newClient = await createClientService(
    clientData,
    userThatMakesTheRequestId
  );
  return res.status(201).json(newClient);
};

export default createClientController;
