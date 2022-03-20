import { styled } from "~/stitches.config";
import Input from "../Input";
import InputContainer from "../InputContainer";

export const StyledInput = styled("input", {
  all: "unset",
  p: 12,
});

export const StyledContainer = styled(InputContainer, {
  transition: "height 0.2s ease-in-out",
  height: 45,
  flexDirection: "column",
  [`& > ${StyledInput}`]: {
    p: 12,
    border: "none !important",
    outline: "none !important",
    width: "100%",
    transform: "translateY(1px)",
  },
  alignItems: "flex-start",
});

export const ContentContainer = styled("div", {
  background: "white",
  size: "$full",
  overflow: "hidden",
});

export const LoaderContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  size: "$full",
});

export const ItemContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 20,

  px: 20,
  py: 24,
  color: "$main700",
  cursor: "pointer",

  "&:hover": {
    background: "$main100",
  },
});

export const ItemName = styled("p", {
  fontSize: 20,
  fontWeight: 600,
  mb: 4,
});

export const ItemEmail = styled("span", {
  fontSize: 12,
});
