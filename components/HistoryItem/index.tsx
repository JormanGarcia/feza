import React from "react";
import { BiTransfer } from "react-icons/bi";
import {
  ItemAmount,
  ItemContainer,
  ItemDate,
  ItemFrom,
  ItemIcon,
  ItemInfo,
  ItemStack,
} from "./styles";

interface IProps {
  date: string;
  from: string;
  amount: number;
  amountType: "plus" | "minus";
}

const HistoryItem = ({ amount, date, from, amountType }: IProps) => {
  return (
    <ItemContainer>
      <ItemStack>
        <ItemIcon as={BiTransfer} />
        <ItemInfo>
          <ItemFrom>{from}</ItemFrom>
          <ItemDate>{date}</ItemDate>
        </ItemInfo>
      </ItemStack>

      <ItemAmount variant={amountType}>{amount}</ItemAmount>
    </ItemContainer>
  );
};

export default HistoryItem;
