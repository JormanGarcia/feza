import { styled } from "~/stitches.config";

export const WithoutRequestsContainer = styled("div", {
  borderRadius: 4,
  background: "$main100",
  color: "$main700",
  py: 32,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const WithoutRequestIcon = styled("span", {
  fontSize: 30,
  mb: 12,
});

export const WithoutRequestText = styled("p", {
  fontWeight: 600,
  fontSize: 16,

  "@lg": {
    fontSize: 20,
  },
});
