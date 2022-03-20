import { styled } from "../../stitches.config";

export const Grid = styled("div", {
  display: "grid",

  variants: {
    columns: {
      initial: {
        gridTemplateColumns: "initial",
      },
      2: {
        gridTemplateColumns: "1fr 1fr",
      },
    },
  },

  defaultVariants: {
    columns: "initial",
  },
});
