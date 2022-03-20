import React from "react";
import {
  WithoutRequestIcon,
  WithoutRequestsContainer,
  WithoutRequestText,
} from "./style";

const WithoutRequests = () => {
  return (
    <WithoutRequestsContainer>
      <WithoutRequestIcon>🎉</WithoutRequestIcon>
      <WithoutRequestText>Sin deudas pendientes</WithoutRequestText>
    </WithoutRequestsContainer>
  );
};

export default WithoutRequests;
