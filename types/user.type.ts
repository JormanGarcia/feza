import { Operation } from "./operation.type";
import { Request } from "./requests.type";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  creationDate: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
  balance: number;
  operationHistory: Operation[];
  requests: Request[];
}
