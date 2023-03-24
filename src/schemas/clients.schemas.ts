import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IClientRequest,
  IClientResponse,
  IClientUpdateRequest,
} from "../interfaces/clients";

const clientSerializer: SchemaOf<IClientRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber: yup.string().required(),
});

const clientReturnedSerializer: SchemaOf<IClientResponse> = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  isActive: yup.boolean().notRequired(),
  phoneNumber: yup.string().notRequired(),
  registryDate: yup.date().notRequired(),
  deletedAt: yup.date().nullable().notRequired(),
  userWhoAdd: yup.object().shape({
    id: yup.string().notRequired(),
    name: yup.string().notRequired(),
    email: yup.string().notRequired(),
  }),
});

const clientUpdateSerializer: SchemaOf<IClientUpdateRequest> = yup
  .object()
  .shape({
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    phoneNumber: yup.string().notRequired(),
  });

const getAllClientsFromAUserSerializer: SchemaOf<IClientResponse[]> = yup
  .array()
  .of(clientReturnedSerializer);

export {
  clientSerializer,
  clientReturnedSerializer,
  clientUpdateSerializer,
  getAllClientsFromAUserSerializer,
};
