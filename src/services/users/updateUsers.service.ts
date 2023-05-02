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
  const infosToUpdate = {
    email: userData.email ? userData.email : findUser?.email,
    name: userData.name ? userData.name : findUser?.name,
    password: userData.password ? userData.password : findUser?.password,
    phoneNumber: userData.phoneNumber
      ? userData.phoneNumber
      : findUser?.phoneNumber,
  };

  const updateUser = userRepository.create({
    ...findUser,
    ...infosToUpdate,
  });
  await userRepository.save(updateUser);

  const correctUser = await userReturnedSerializer.validate(updateUser, {
    stripUnknown: true,
  });

  return correctUser;
};

export default updateUserService;
// $2a$10$hvJwoUPJNssw3URdKaN57.ptq5abXnDT5KrfPuMftXa.i2WahAsUC
// $2a$10$hvJwoUPJNssw3URdKaN57.ptq5abXnDT5KrfPuMftXa.i2WahAsUC
