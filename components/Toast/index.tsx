import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { BiInfoCircle, BiX } from "react-icons/bi";
import { styled } from "~/stitches.config";
import { useToast } from "~/stores/toastStore";

const ToastContainer = styled(motion.div, {
  display: "flex",
  alignItems: "center",
  px: 22,
  py: 20,
  justifyContent: "space-between",
  position: "fixed",
  bottom: 28,
  right: 28,
  width: 400,
  variants: {
    type: {
      success: {
        color: "$green700",
        background: "$green100",
        border: "1px solid $green200",
      },
      error: {
        color: "$red700",
        background: "$red100",
        border: "1px solid $red200",
      },
      default: {
        color: "$main700",
        background: "$main100",
        border: "1px solid $main200",
      },
    },
  },

  defaultVariants: {
    type: "default",
  },
});

const ToastTitle = styled("p", {
  fontWeight: 600,
});

const ToastDescription = styled("span", {
  fontSize: 12,
});

const CloseIcon = styled(BiX, {
  fontSize: 24,
  cursor: "pointer",
  p: 1,
  borderRadius: 4,

  "&:hover": {
    background: "$green200",
  },
});

const ToastLeft = styled("div", {
  display: "flex",
  gap: 32,
  alignItems: "center",
});

const ToastInfo = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

const ToastIcon = styled("svg", {
  fontSize: 30,
});

const Toast = () => {
  const { close, toast } = useToast();

  return (
    <AnimatePresence>
      {toast && (
        <ToastContainer type={toast.type}>
          <ToastLeft>
            <ToastIcon as={BiInfoCircle} />

            <ToastInfo>
              <ToastTitle>{toast.title}</ToastTitle>
              <ToastDescription>{toast.description}</ToastDescription>
            </ToastInfo>
          </ToastLeft>

          <CloseIcon onClick={close} />
        </ToastContainer>
      )}
    </AnimatePresence>
  );
};

export default Toast;
