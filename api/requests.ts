import { Request } from "~/types/requests.type";
import { instance } from "./instance";

export const handleRequest = async (id: string, action: "pay" | "reject") => {
  return instance.put<Request>("/requests/" + action + "/" + id);
};
