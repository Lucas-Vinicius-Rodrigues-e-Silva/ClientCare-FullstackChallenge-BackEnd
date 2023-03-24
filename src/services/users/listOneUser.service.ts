import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserResponse } from "../../interfaces/users";
import { userReturnedSerializer } from "../../schemas/users.schemas";

const listOneUserService = async (userId: string): Promise<IUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id: userId,
  });

  const userReturnedData = await userReturnedSerializer.validate(findUser, {
    stripUnknown: true,
  });

  return userReturnedData!;
};

export default listOneUserService;
