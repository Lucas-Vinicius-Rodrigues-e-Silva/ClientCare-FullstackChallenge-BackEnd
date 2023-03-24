import AppError from "../../errors/AppError";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { Client } from "../../entities/client.entity";
import { clientReturnedSerializer } from "../../schemas/clients.schemas";
import { IClientRequest, IClientResponse } from "../../interfaces/clients";

const createClientService = async (
  clientData: IClientRequest,
  userId: string
): Promise<IClientResponse> => {
  const clientRepository = AppDataSource.getRepository(Client);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id: userId,
  });

  const clients = await clientRepository.find({ withDeleted: true });

  const clientsAlreadyExists = clients.find(
    (client) => client.email === clientData.email
  );

  if (clientsAlreadyExists) {
    throw new AppError("Client already exists!", 409);
  }

  const createClient = clientRepository.create(clientData);
  createClient.userWhoAdd = user!;
  await clientRepository.save(createClient);

  const clientCorrectReturn = await clientReturnedSerializer.validate(
    createClient,
    {
      stripUnknown: true,
    }
  );

  return clientCorrectReturn;
};

export default createClientService;
