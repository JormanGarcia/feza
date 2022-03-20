import { User } from "./user.type";

export interface Request {
  id: string;
  amount: number;
  creationDate: Date;
  status: string;
  issuer: string;
  users: User[];
}
