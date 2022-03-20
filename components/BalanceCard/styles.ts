import { styled } from "~/stitches.config";

export const CardContainer = styled("div", {
  width: "$full",
  padding: 24,
  borderRadius: 4,

  variants: {
    color: {
      main: {
        background: "$main100",
        color: "$main700",
      },

      red: {
        background: "$red100",
        color: "$red600",
      },

      green: {
        background: "$green100",
        color: "$green700",
      },
    },
  },

  defaultVariants: {
    color: "main",
  },
});

export const CardTop = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 18,
});

export const CardIcon = styled("svg", {
  fontSize: 24,
});

export const CardTitle = styled("p", {
  fontWeight: 500,
  fontSize: 12,

  "@lg": {
    fontSize: 14,
  },
});

export const CardBalance = styled("p", {
  fontSize: 24,
  fontWeight: 600,

  "@lg": {
    fontSize: 36,
  },
});
