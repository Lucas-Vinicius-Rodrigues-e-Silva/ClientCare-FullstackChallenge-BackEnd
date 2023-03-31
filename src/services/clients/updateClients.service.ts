import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import {
  clientReturnedSerializer,
  clientUpdateSerializer,
} from "../../schemas/clients.schemas";
import {
  IClientUpdateRequest,
  IClientResponse,
} from "../../interfaces/clients";

const updateClientsService = async (
  clientData: IClientUpdateRequest,
  clientId: string
): Promise<IClientResponse> => {
  const clientRepository = AppDataSource.getRepository(Client);
  const getClientDataQueryBuilder =
    clientRepository.createQueryBuilder("clients");
  const findClient = await getClientDataQueryBuilder
    .leftJoinAndSelect("clients.userWhoAdd", "users")
    .orderBy()
    .where("clients.id = :id", { id: clientId })
    .getOne();
  const updateClient = clientRepository.create({
    ...findClient,
    ...clientData,
  });
  await clientRepository.save(updateClient);

  const correctClient = await clientReturnedSerializer.validate(updateClient, {
    stripUnknown: true,
  });

  return correctClient!;
};

export default updateClientsService;
