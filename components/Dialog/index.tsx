import * as DialogPrimitives from "@radix-ui/react-dialog";
import { keyframes } from "@stitches/react";
import { BiX } from "react-icons/bi";
import { styled } from "~/stitches.config";

export const Dialog = DialogPrimitives.Root;
export const Trigger = DialogPrimitives.Trigger;
export const Close = DialogPrimitives.Close;

const OpenDialog = keyframes({
  "0%": {
    opacity: 0,
    scale: 0.96,
    transform: "translateY(5px)",
  },

  "100%": {
    opacity: 1,
    scale: 1,
    transform: "translateY(0px)",
  },
});

const CloseDialog = keyframes({
  from: {
    opacity: 1,
    scale: 1,
    transform: "translateY(0px)",
  },
  to: {
    opacity: 0,
    scale: 0.96,
    transform: "translateY(5px)",
  },
});

const OpenOverlay = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

const CloseOverlay = keyframes({
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0,
  },
});

const StyledContent = styled(DialogPrimitives.Content, {
  position: "fixed",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  margin: "auto",

  width: "95vw",
  maxWidth: "590px",
  height: "fit-content",
  background: "$background",
  padding: 20,
  borderRadius: 4,
  zIndex: 2000,

  "&[data-state='open']": {
    animation: `${OpenDialog} 0.1s `,
  },

  "&[data-state='closed']": {
    animation: `${CloseDialog} 0.1s`,
  },
});

const StyledOverlay = styled(DialogPrimitives.Overlay, {
  background: "rgba(24,24,30,0.6)",
  width: "100vw",
  height: "100vh",
  position: "fixed",
  left: 0,
  top: 0,
  zIndex: 1999,

  "&[data-state='open']": {
    animation: `${OpenOverlay} 0.1s`,
  },

  "&[data-state='closed']": {
    animation: `${CloseOverlay} 0.1s`,
  },
});

export const DialogTitle = styled("h3", {
  fontSize: 20,
  fontWeight: 600,
  color: "$main700",
  marginBottom: 60,
});

export const DialogFooter = styled("div", {
  display: "flex",
  justifyContent: "flex-end",
  gap: 16,
  marginTop: 60,
});

export const DialogX = styled(BiX, {
  position: "absolute",
  top: 20,
  right: 20,
  fontSize: 32,
  color: "$main700",
  cursor: "pointer",
  borderRadius: "100%",
  p: 5,
  transition: "0.2s",

  "&:hover": {
    background: "$main100",
  },
});

export const DialogDescription = styled(DialogPrimitives.Description, {
  textAlign: "center",
  "& > b": {
    fontWeight: 600,
  },
});

export const DialogContent = ({
  children,
  afterClose,
  ...rest
}: DialogPrimitives.DialogContentProps & {
  css?: any;
  afterClose?: () => void;
}) => (
  <DialogPrimitives.Portal>
    <StyledOverlay />
    <StyledContent {...rest}>
      <DialogPrimitives.DialogClose asChild onClick={afterClose}>
        <DialogX />
      </DialogPrimitives.DialogClose>
      {children}
    </StyledContent>
  </DialogPrimitives.Portal>
);
