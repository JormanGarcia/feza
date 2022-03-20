import { motion } from "framer-motion";
import { BiBell } from "react-icons/bi";
import { styled } from "~/stitches.config";

export const TopbarContainer = styled("header", {
  height: 92,
  width: "100vw",
  px: 32,

  background: "$background",
  borderBottom: "1px solid $main100",

  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  alignItems: "center",

  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 50,
});

export const Navigation = styled("nav", {
  display: "flex",
  gap: 52,
  justifyContent: "center",
});

export const NavigationIconContainer = styled("div", {
  position: "relative",
});

export const NavigationIcon = styled("svg", {
  fontSize: 24,
  cursor: "pointer",

  variants: {
    active: {
      true: {
        fill: "$main700",
      },
      false: {
        fill: "black",
      },
    },
  },

  defaultVariants: {
    active: "false",
  },
});

export const NavigationDot = styled(motion.span, {
  width: "5px",
  height: "5px",
  background: "$main700",
  position: "absolute",
  right: 0,
  left: 0,
  margin: "auto",
  borderRadius: "100%",
  bottom: -6,
});

export const ProfileContainer = styled("div", {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 20,
});

export const BellIcon = styled(BiBell, {
  fontSize: 20,
  color: "$main700",
  cursor: "pointer",
});
