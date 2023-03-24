import { Request, Response } from "express";
import deleteClientService from "../../services/clients/deleteClients.service";
("../../services/users/deleteUsers.service");

const deleteClientsController = async (req: Request, res: Response) => {
  const deleteClientId: string = req.params.id;
  const deleteClient = await deleteClientService(deleteClientId);
  return res.status(204).json({ message: "deleted with sucessfull!" });
};

export default deleteClientsController;
