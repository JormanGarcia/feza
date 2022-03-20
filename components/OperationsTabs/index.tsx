import { styled } from "~/stitches.config";
import * as TasbPrimivitives from "@radix-ui/react-tabs";
import { motion } from "framer-motion";

export const TabsList = styled(TasbPrimivitives.List, {
  display: "inline-flex",
  gap: 10,
  background: "$main100",
  p: 16,
  borderRadius: 8,
  position: "relative",
  zIndex: 0,
  marginBottom: 80,
});
export const TabsRoot = TasbPrimivitives.Root;
export const TabsTrigger = styled(TasbPrimivitives.TabsTrigger, {
  all: "unset",
  px: 36,
  py: 16,
  fontWeight: 600,
  color: "$main700",
  cursor: "pointer",
  lineHeight: "88%",
  transition: "0.2s",
  position: "relative",
  zIndex: 10,

  '&[data-state="active"]': {
    color: "$main100",
  },
});

export const TabSelector = styled(motion.div, {
  position: "absolute",
  top: 0,
  left: 0,
  size: "100%",
  background: "$main700",
  borderRadius: 4,
  zIndex: -10,
});
export const TabsContent = TasbPrimivitives.Content;
