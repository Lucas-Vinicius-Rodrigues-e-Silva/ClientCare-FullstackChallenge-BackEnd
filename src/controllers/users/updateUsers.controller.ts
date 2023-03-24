import { Request, Response } from "express";
import { IUserUpdateRequest } from "../../interfaces/users";
import updateUserService from "../../services/users/updateUsers.service";

const updateUserController = async (req: Request, res: Response) => {
  const userData: IUserUpdateRequest = req.body;
  const userId: string = req.params.id;
  const updateUser = await updateUserService(userData, userId);
  return res.json(updateUser);
};

export default updateUserController;
