import { IClientResponse } from "../clients";

export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  isAdm?: boolean;
}

export interface IUserResponse {
  id?: string;
  name?: string;
  email?: string;
  isAdm?: boolean;
  isActive?: boolean;
  phoneNumber?: string;
  registryDate?: Date;
  deletedAt?: Date | null;
  clients: Array<IClientResponse> | null;
}

export interface IUserUpdateRequest {
  name?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
}
