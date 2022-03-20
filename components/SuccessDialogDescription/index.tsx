import React from "react";
import { BiCheck } from "react-icons/bi";
import { styled } from "~/stitches.config";

import { DialogDescription } from "../Dialog";

const SuccessDialogContent = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 32,
});

const CheckIconContainer = styled("div", {
  color: "$green400",
  background: "$green100",
  size: 88,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "100%",
});

const CheckIcon = styled(BiCheck, {
  fontSize: 60,
});

const SuccessDialogDescription: React.FC = ({ children }) => {
  return (
    <SuccessDialogContent>
      <CheckIconContainer>
        <CheckIcon />
      </CheckIconContainer>

      <DialogDescription>{children}</DialogDescription>
    </SuccessDialogContent>
  );
};

export default SuccessDialogDescription;
