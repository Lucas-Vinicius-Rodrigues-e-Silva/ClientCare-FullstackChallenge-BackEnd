import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";

const deleteClientService = async (clientToDeleteId: string) => {
  const clientRepository = AppDataSource.getRepository(Client);
  const findClient = await clientRepository.findOneBy({ id: clientToDeleteId });
  findClient!.isActive = false;
  await clientRepository.update(clientToDeleteId, findClient!);
  await clientRepository.softRemove(findClient!);
};

export default deleteClientService;
