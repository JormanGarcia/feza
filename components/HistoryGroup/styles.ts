import { styled } from "~/stitches.config";

export const GroupContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 24,
  mb: 40,
});

export const GroupDate = styled("h6", {
  fontWeight: 500,
  fontSize: 16,
  color: "$main700",
});
