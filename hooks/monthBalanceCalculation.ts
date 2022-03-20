import { Operation } from "~/types/operation.type";
import { User } from "../types/user.type";

export function useBalanceCalculation(history: Operation[], email: string) {
  if (!history || !email)
    return {
      income: 0,
      spends: 0,
    };

  const incomeHistory = history.filter((item) => item.issuer !== email);
  const spendsHistory = history.filter((item) => item.issuer === email);

  function calculateTotal(data: Operation[]) {
    return data.reduce((prev, { amount }) => prev + amount, 0);
  }

  return {
    income: calculateTotal(incomeHistory),
    spends: calculateTotal(spendsHistory),
  };
}
