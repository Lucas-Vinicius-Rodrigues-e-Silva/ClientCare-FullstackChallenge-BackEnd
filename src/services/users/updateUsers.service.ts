import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { userUpdateSerializer } from "../../schemas/users.schemas";
import { userReturnedSerializer } from "../../schemas/users.schemas";
import { IUserUpdateRequest, IUserResponse } from "../../interfaces/users";

const updateUserService = async (
  userData: IUserUpdateRequest,
  userId: string
): Promise<IUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({ id: userId });
  const updateUser = userRepository.create({
    ...findUser,
    ...userData,
  });
  await userRepository.save(updateUser);

  const correctUser = await userReturnedSerializer.validate(updateUser, {
    stripUnknown: true,
  });

  return correctUser;
};

export default updateUserService;
