import moment from "moment";
import React from "react";
import { styled } from "~/stitches.config";
import { usdFormatter } from "~/utils/usdFormatter";
import Avatar from "../Avatar";

const Container = styled("div", {
  py: 20,
  px: 20,
  pr: 24,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: 4,
  background: "$main100",
  color: "$main700",
});

const Name = styled("p", {
  fontSize: 20,
  fontWeight: 600,
});

const FromNowDate = styled("span", {
  fontSize: 12,
});

const Amount = styled("span", {
  fontWeight: 700,
});

const RequestLeft = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 20,
});

interface IProps {
  firstName: string;
  lastName: string;
  onSelect: () => void;
  date: Date;
  amount: number;
}

function PaymentRequest({
  amount,
  date,
  firstName,
  lastName,
  onSelect,
}: IProps) {
  return (
    <Container onClick={onSelect}>
      <RequestLeft>
        <Avatar
          firstName={firstName}
          lastName={lastName}
          css={{ borderRadius: "100%", size: 52 }}
        />
        <div>
          <Name>
            {firstName} {lastName}
          </Name>
          <FromNowDate>{moment(date).fromNow()}</FromNowDate>
        </div>
      </RequestLeft>
      <Amount>{usdFormatter.format(amount)}</Amount>
    </Container>
  );
}

export default PaymentRequest;
