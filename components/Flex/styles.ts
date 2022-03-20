import { styled } from "../../stitches.config";

export const Flex = styled("div", {
  display: "flex",
  variants: {
    direction: {
      column: {
        flexDirection: "column",
      },
      row: {
        flexDirection: "row",
      },
    },

    justify: {
      between: {
        justifyContent: "space-between",
      },
      start: {
        justifyContent: "flex-start",
      },
      end: {
        justifyContent: "flex-end",
      },
      center: {
        justifyContent: "center",
      },
      initial: {
        justifyContent: "initial",
      },
    },

    align: {
      start: {
        alignItems: "flex-start",
      },
      center: {
        alignItems: "center",
      },
      initial: {
        alignItems: "initial",
      },
    },
  },

  defaultVariants: {
    direction: "row",
    justify: "inital",
    align: "inital",
  },
});
