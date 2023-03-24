import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IContactRequest,
  IContactResponse,
  IContactUpdateRequest,
} from "../interfaces/contacts";

const contactSerializer: SchemaOf<IContactRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber: yup.string().required(),
});

const contactReturnedSerializer: SchemaOf<IContactResponse> = yup
  .object()
  .shape({
    id: yup.string().notRequired(),
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    isActive: yup.boolean().notRequired(),
    phoneNumber: yup.string().notRequired(),
    registryDate: yup.date().notRequired(),
    deletedAt: yup.date().nullable().notRequired(),
    clientWhoBelongs: yup.object().shape({
      id: yup.string().notRequired(),
      name: yup.string().notRequired(),
      email: yup.string().notRequired(),
    }),
  });

const contactUpdateSerializer: SchemaOf<IContactUpdateRequest> = yup
  .object()
  .shape({
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    phoneNumber: yup.string().notRequired(),
  });

const getAllContactsFromAClientSerializer: SchemaOf<IContactResponse[]> = yup
  .array()
  .of(contactReturnedSerializer);

export {
  contactSerializer,
  contactReturnedSerializer,
  contactUpdateSerializer,
  getAllContactsFromAClientSerializer,
};
