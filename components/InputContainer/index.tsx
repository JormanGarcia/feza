import React from "react";
import { styled } from "~/stitches.config";
import Input from "../Input";
import NumberFormat from "../NumberFormat";

const InputContainer = styled("div", {
  borderRadius: 4,
  border: "1px solid $blackAlpha100",
  py: 0,
  px: 0,
  transition: "outline 0.1s",
  outlineColor: "$main200",
  outlineWidth: 0,
  outlineStyle: "solid",
  cursor: "text",
  display: "flex",
  alignItems: "center",

  "&:hover": {
    borderColor: "$blackAlpha200",
  },

  "&:focus-within": {
    borderColor: "$main200",
    outlineWidth: 3,
  },

  [`& ${Input}`]: {
    p: 12,
    border: "none !important",
    outline: "none !important",
    width: "100% ",
    transform: "translateY(1px)",
  },

  [`& > ${NumberFormat}`]: {
    p: 12,
    border: "none",
    outline: "none",
    width: "100%",
    transform: "translateY(1px)",
  },

  variants: {
    error: {
      true: {
        borderColor: "$red500",

        "&:focus-within": {
          borderColor: "$red500",
          outlineColor: "$red200",
        },

        "&:hover": {
          borderColor: "$red500",
        },
      },
    },
  },

  defaultVariants: {
    error: false,
  },
});

export default InputContainer;
