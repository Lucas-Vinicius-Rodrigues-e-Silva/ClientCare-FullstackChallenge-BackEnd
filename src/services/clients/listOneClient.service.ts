import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import { IClientResponse } from "../../interfaces/clients";
import { clientReturnedSerializer } from "../../schemas/clients.schemas";

const listOneClientService = async (
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

  const clientReturnedData = await clientReturnedSerializer.validate(
    findClient,
    {
      stripUnknown: true,
    }
  );

  return clientReturnedData!;
};

export default listOneClientService;
