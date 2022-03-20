import { keyframes } from "@stitches/react";
import { styled } from "~/stitches.config";

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

export default styled("div", {
  size: 20,
  borderRadius: "100%",
  border: "3px solid $main500",
  borderLeftColor: "$main300",

  animation: `${LoadingSpinner} 2s linear infinite`,
  mr: 12,
});
