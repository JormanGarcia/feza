import { User } from "./user.type";

export interface Operation {
  id: string;
  type: string;
  creationDate: Date;
  amount: number;
  status: string;
  from: string;
  to: string;
  users: User[];
  issuer: string;
}
