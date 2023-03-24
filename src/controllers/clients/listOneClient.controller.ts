import { Request, Response } from "express";
import listOneClientService from "../../services/clients/listOneClient.service";

const listOneClientController = async (req: Request, res: Response) => {
  const clientId: string = req.params.id;
  const clientReturned = await listOneClientService(clientId);
  return res.status(200).json(clientReturned);
};

export default listOneClientController;
