import React from "react";
import { IconType } from "react-icons/lib";
import {
  CardBalance,
  CardContainer,
  CardIcon,
  CardTitle,
  CardTop,
} from "./styles";

interface IProps {
  title: string;
  balance: string;
  icon: IconType;
  color?: "main" | "red" | "green";
}

const BalanceCard: React.FC<IProps> = ({ balance, icon, title, color }) => {
  return (
    <CardContainer color={color}>
      <CardTop>
        <CardTitle>{title}</CardTitle>
        <CardIcon as={icon} />
      </CardTop>
      <CardBalance>{balance}USD</CardBalance>
    </CardContainer>
  );
};

export default BalanceCard;
