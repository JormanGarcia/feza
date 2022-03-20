import { styled } from "~/stitches.config";

export default styled("button", {
  all: "unset",
  color: "$main700",
  fontSize: 20,
  cursor: "pointer",
  borderRadius: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  size: 32,
  transition: "0.3s",
  position: "relative",
  zIndex: 0,

  "&::before": {
    content: '""',
    background: "transparent",
    size: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    m: "auto",
    zIndex: -1,
    scale: 0.5,
    opacity: 0,
    transition: "0.3s",
  },

  "&:hover::before": {
    background: "$main100",
    scale: 1,
    opacity: 1,
  },

  "&:active::before": {
    background: "$main100",
    scale: 1.1,
    opacity: 1,
    transition: "0s",
  },
});
