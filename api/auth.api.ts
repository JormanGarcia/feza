import axios from "axios";
import { User } from "~/types/user.type";
import { instance } from "./instance";

export const login = (props: { email: string; password: string }) => {
  return instance.post("/auth/login", props);
};

export const signup = (props: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}) => {
  return instance.post("/auth/signup", props);
};
