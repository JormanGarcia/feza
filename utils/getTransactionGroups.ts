import moment from "moment";
import { Operation } from "~/types/operation.type";

interface OperationGroup {
  date: Date;
  Operations: Operation[];
}

export const getOperationGroups = (Operations: Operation[]) => {
  let result: OperationGroup[] = [];

  Operations.filter((i) => i.type === "TRANSFER").forEach((operation) => {
    if (
      result.filter(
        (x) =>
          moment(x.date).format("DD-MM-YYYY") ===
          moment(operation.creationDate).format("DD-MM-YYYY")
      ).length === 0
    ) {
      result = [
        ...result,
        {
          date: operation.creationDate,
          Operations: [],
        },
      ];
    }
  });

  result.forEach((group, index) => {
    result[index].Operations = Operations.filter(
      (item) =>
        moment(item.creationDate).format("DD-MM-YYYY") ===
        moment(group.date).format("DD-MM-YYYY")
    );
  });
  /*

    const TransactionDate = moment(operation.date).format("DD-MM");

    result.forEach((group, key) => {
      const GroupDate = moment(group.date).format("DD-MM");
      const transactionFitOnGroup = TransactionDate === GroupDate;

      console.log(
        transactionFitOnGroup,
        "Group: " + GroupDate,
        "Transaction: " + TransactionDate
      );

      if (transactionFitOnGroup) {
        console.log(
          "PUSH EN TRANSACTION PROQUE EXISTE UN GRUPO " +
            moment(operation.date).format("hh:mm")
        );

        result[key].Operations.push(operation);
      } else {
        console.log(
          "CREA GRUPO PORQUE NO EXISTE GRUPO " +
            moment(operation.date).format("hh:mm")
        );

        result.push({
          date: operation.date,
          Operations: [operation],
        });
      }
    });
    */

  return result;
};
