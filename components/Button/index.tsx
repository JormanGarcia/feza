import { StyledComponent } from "@stitches/react/types/styled-component";
import React, { DetailedHTMLProps } from "react";
import { styled } from "~/stitches.config";
import { DotLoader, MoonLoader } from "react-spinners";
import Loader from "react-spinners/HashLoader";
import { keyframes } from "@stitches/react";

const LoadingSpinner = keyframes({
  "0%": {
    rotate: "0deg",
    scale: 1,
  },
  "50%": {
    scale: 0.85,
  },
  "100%": {
    rotate: "360deg",
    scale: 1,
  },
});

export default styled("button", {
  all: "unset",
  borderRadius: 4,
  fontWeight: 600,
  textAlign: "center",
  transition: "background 0.1s",
  cursor: "pointer",
  position: "relative",

  outlineColor: "$main200 !important",
  outlineWidth: 0,
  outlineStyle: "solid !important",
  "&:focus-visible": {
    outlineWidth: 3,
  },

  variants: {
    variant: {
      solid: {
        background: "$main700",
        color: "$main100",

        "&:hover": {
          background: "$main600",
        },
      },
      ghost: {
        color: "$main700",
        "&:hover": {
          background: "$main100",
        },
      },

      warning: {
        background: "$red100",
        color: "$red700",
        "&:hover": {
          background: "$red200",
        },
      },
    },

    loading: {
      true: {
        cursor: "not-allowed",
        color: "transparent",
        "&::after": {
          content: '""',
          size: 16,
          borderRadius: "100%",
          border: "3px solid $main100",
          borderRightColor: "rgba(365,365,365,0.4)",
          position: "absolute",
          right: 0,
          left: 0,
          top: 0,
          bottom: 0,
          m: "auto",

          animation: `${LoadingSpinner} 3s linear infinite`,
        },
      },
    },

    size: {
      md: {
        py: 14,
        px: 24,
      },
    },

    block: {
      true: {
        width: "$full",
        px: 0,
      },
      false: {},
    },
  },

  defaultVariants: {
    variant: "solid",
    size: "md",
    block: false,
  },
});
