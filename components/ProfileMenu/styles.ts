import { BiChevronDown } from "react-icons/bi";
import { styled } from "~/stitches.config";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { keyframes } from "@stitches/react";

export const AvatarContainer = styled("button", {
  all: "unset",
  display: "flex",
  alignItems: "center",
  gap: 12,
  cursor: "pointer",
});

export const ChevronIcon = styled(BiChevronDown, {
  fontSize: 20,
});

export const MenuPopover = styled(PopoverPrimitive.Root, {});

const OnOpen = keyframes({
  "0%": {
    opacity: 0,
    height: 0,
  },
  "1%": {
    opacity: 1,
  },
  "100%": {
    opacity: 1,
    height: 146,
  },
});

const OnClose = keyframes({
  "100%": {
    opacity: 0,
    height: 0,
  },
  "99%": {
    opacity: 1,
  },
  "0%": {
    opacity: 1,
    height: 146,
  },
});

export const PopoverContent = styled(PopoverPrimitive.Content, {
  background: "white",
  border: "1px solid $main100",
  minWidth: "220px",
  px: 12,
  py: 16,
  borderRadius: 4,
  overflow: "hidden",

  '&[data-state="open"]': {
    animation: OnOpen + " 0.2s ease-in-out",
  },

  '&[data-state="closed"]': {
    animation: OnClose + " 0.2s ease-in-out",
  },
});

export const PopoverAnchor = styled(PopoverPrimitive.Anchor, {});

export const PopoverTrigger = PopoverPrimitive.PopoverTrigger;

export const PopoverItemList = styled("ul", {
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

export const PopoverItem = styled("li", {
  display: "flex",
  color: "$main700",
  padding: 16,
  justifyContent: "space-between",
  borderRadius: "4px",
  alignItems: "center",
  cursor: "pointer",
  "&:hover": {
    background: "$main100",
  },
});

export const PopoverItemTitle = styled("span", {
  fontWeight: 600,
});

export const PopoverItemIcon = styled("svg", {
  fontSize: 20,
});
