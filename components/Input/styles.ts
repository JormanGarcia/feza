import { styled } from "../../stitches.config";

export const Input = styled("input", {
  all: "unset",
  borderRadius: 4,
  border: "1px solid $blackAlpha100",
  py: 12,
  px: 12,
  transition: "outline 0.1s",
  outlineColor: "$main200",
  outlineWidth: 0,
  outlineStyle: "solid",

  "&:hover": {
    borderColor: "$blackAlpha200",
  },

  "&:focus": {
    borderColor: "$main200",
    outlineWidth: 3,
  },

  variants: {
    error: {
      true: {
        borderColor: "$red500",

        "&:focus": {
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
