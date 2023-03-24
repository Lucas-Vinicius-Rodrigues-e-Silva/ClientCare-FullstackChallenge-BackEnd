import { Request, Response } from "express";
import { IClientUpdateRequest } from "../../interfaces/clients";
import updateClientsService from "../../services/clients/updateClients.service";

const updateClientController = async (req: Request, res: Response) => {
  const clientData: IClientUpdateRequest = req.body;
  const clientId: string = req.params.id;
  const updateClient = await updateClientsService(clientData, clientId);
  return res.json(updateClient);
};

export default updateClientController;
