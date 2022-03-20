import axios from "axios";
import { User } from "~/types/user.type";
import { instance } from "./instance";

export const getUsers = async () => {
  return await instance.get("/users");
};

export const getUserByEmail = async (email: string) => {
  return await instance.get("/users/email/" + email);
};

export const getUserById = async (id: string) => {
  return await instance.get<User>("/users/id/" + id);
};

export const matchUserByEmail = async (email: string) => {
  return await instance.get("/users/match/email/" + email);
};
