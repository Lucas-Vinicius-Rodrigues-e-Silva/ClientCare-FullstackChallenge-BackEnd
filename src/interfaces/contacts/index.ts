export interface IContactRequest {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface IContactResponse {
  id?: string;
  name?: string;
  email?: string;
  isActive?: boolean;
  phoneNumber?: string;
  registryDate?: Date;
  deletedAt?: Date | null;
  clientWhoBelongs?: {
    id?: string;
    name?: string;
    email?: string;
  };
}

export interface IContactUpdateRequest {
  name?: string;
  email?: string;
  phoneNumber?: string;
}
