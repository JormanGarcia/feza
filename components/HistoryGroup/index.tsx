import moment from "moment";
import React from "react";
import { useAuth } from "~/hooks/authHook";
import { Operation } from "~/types/operation.type";
import HistoryItem from "../HistoryItem";
import { GroupContainer, GroupDate } from "./styles";

interface IProps {
  items: Operation[];
  date: string;
}

const HistoryGroup: React.FC<IProps> = ({ date, items }) => {
  const { user } = useAuth();

  return (
    <GroupContainer>
      <GroupDate>{date}</GroupDate>

      <div>
        {items.map((item) => {
          const UserIndex = user?.id === item.users![0].id ? 1 : 0;
          return (
            <HistoryItem
              key={item.id}
              amount={item.amount}
              date={moment(item.creationDate).format("hh:mma")}
              from={`${item.users![UserIndex].firstName} ${
                item.users![UserIndex].lastName
              }`}
              amountType={user!.email === item.issuer ? "minus" : "plus"}
            />
          );
        })}
      </div>
    </GroupContainer>
  );
};

export default HistoryGroup;
