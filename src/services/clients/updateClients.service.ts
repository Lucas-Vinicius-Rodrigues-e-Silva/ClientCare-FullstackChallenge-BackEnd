import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import { clientUpdateSerializer } from "../../schemas/clients.schemas";
import {
  IClientUpdateRequest,
  IClientResponse,
} from "../../interfaces/clients";

const updateClientsService = async (
  clientData: IClientUpdateRequest,
  clientId: string
): Promise<IClientResponse> => {
  const clientRepository = AppDataSource.getRepository(Client);
  const findClient = await clientRepository.findOneBy({ id: clientId });
  const updateClient = clientRepository.create({
    ...findClient,
    ...clientData,
  });
  await clientRepository.save(updateClient);

  const correctClient = await clientUpdateSerializer.validate(updateClient, {
    stripUnknown: true,
  });

  return correctClient!;
};

export default updateClientsService;
