import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IUserRequest,
  IUserResponse,
  IUserUpdateRequest,
} from "../interfaces/users";

const userSerializer: SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  phoneNumber: yup.string().required(),
  isAdm: yup.boolean().notRequired(),
});

const userReturnedSerializer: SchemaOf<IUserResponse> = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  isAdm: yup.boolean().notRequired(),
  isActive: yup.boolean().notRequired(),
  phoneNumber: yup.string().notRequired(),
  registryDate: yup.date().notRequired(),
  deletedAt: yup.date().nullable().notRequired(),
});

const userUpdateSerializer: SchemaOf<IUserUpdateRequest> = yup.object().shape({
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  password: yup.string().notRequired(),
  phoneNumber: yup.string().notRequired(),
});

const getManyUsersSerializer: SchemaOf<IUserResponse[]> = yup
  .array()
  .of(userReturnedSerializer);

export {
  userSerializer,
  userReturnedSerializer,
  userUpdateSerializer,
  getManyUsersSerializer,
};
