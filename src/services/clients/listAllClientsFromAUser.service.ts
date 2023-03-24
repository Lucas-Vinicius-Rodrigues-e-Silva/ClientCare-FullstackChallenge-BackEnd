import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import { IClientResponse } from "../../interfaces/clients";
import { getAllClientsFromAUserSerializer } from "../../schemas/clients.schemas";

const listAllClientsFromAUserService = async (
  userId: string
): Promise<IClientResponse[]> => {
  const clientRepository = AppDataSource.getRepository(Client);

  const getAllClientsFromAUserQueryBuilder =
    clientRepository.createQueryBuilder("clients");

  const findAllClients = await getAllClientsFromAUserQueryBuilder
    .leftJoinAndSelect("clients.userWhoAdd", "users")
    .orderBy()
    .where("users.id = :id", { id: userId })
    .getMany();

  const correctClientsReturn = await getAllClientsFromAUserSerializer.validate(
    findAllClients,
    {
      stripUnknown: true,
    }
  );

  return correctClientsReturn!;
};

export default listAllClientsFromAUserService;
