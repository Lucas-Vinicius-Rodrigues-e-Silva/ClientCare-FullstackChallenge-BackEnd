import { IUserRequest, IUserResponse } from "../users";

export interface IClientRequest {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface IClientResponse {
  id?: string;
  name?: string;
  email?: string;
  isActive?: boolean;
  phoneNumber?: string;
  registryDate?: Date;
  deletedAt?: Date | null;
  userWhoAdd?: {
    id?: string;
    name?: string;
    email?: string;
  };
}

export interface IClientUpdateRequest {
  name?: string;
  email?: string;
  phoneNumber?: string;
}
