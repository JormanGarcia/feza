import { Operation } from "~/types/operation.type";
import { Request } from "~/types/requests.type";

export const getIssuer = (operation: Operation | Request) => {
  return operation.users.filter((item) => item.email === operation.issuer)[0];
};
