import React from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import { styled } from "~/stitches.config";

const Container = styled("div", {
  py: 80,
  background: "$main100",
  color: "$main700",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 8,
  width: "100%",
  gap: 24,
});

const InfoIcon = styled(BsInfoCircleFill, {
  fontSize: 60,
});

const Text = styled("p", {
  fontSize: 24,
  fontWeight: 600,
  textAlign: "center",
  maxWidth: 500,
});

const NoOperationsState = () => {
  return (
    <Container>
      <InfoIcon />
      <Text>Parece que aun no has realizado ninguna operación</Text>
    </Container>
  );
};

export default NoOperationsState;
