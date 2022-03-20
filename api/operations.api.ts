import { Operation } from "~/types/operation.type";
import { instance } from "./instance";

export const transfer = async (props: {
  fromUser: string;
  toUser: string;
  amount: number;
}) => await instance.post<Operation>("/operations/transfer", props);

export const request = async (props: {
  fromUser: string;
  toUser: string;
  amount: number;
}) => await instance.post("/requests", props);
