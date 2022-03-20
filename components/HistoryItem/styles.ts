import { styled } from "~/stitches.config";

export const ItemContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  py: 24,
  color: "$main700",
});

export const ItemStack = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 42,
});

export const ItemIcon = styled("svg", {
  fontSize: 24,
});

export const ItemInfo = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

export const ItemDate = styled("span", {
  fontSize: 12,
});

export const ItemFrom = styled("div", {
  fontSize: 20,
  fontWeight: 600,
});

export const ItemAmount = styled("span", {
  fontWeight: 600,

  variants: {
    variant: {
      plus: {
        color: "$green600",
        "&::before": {
          content: "+",
        },
      },
      minus: {
        color: "$red500",
        "&::before": {
          content: "-",
        },
      },
    },
  },
});
