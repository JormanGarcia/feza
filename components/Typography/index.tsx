import { styled } from "~/stitches.config";

export default styled("p", {
  variants: {
    size: {
      title: {
        fontSize: 20,
        color: "$main700",
        fontWeight: 600,
      },
      paragraph: {},
      h1: {
        fontSize: 40,
        fontWeight: 700,
        color: "$main700",
      },
    },
  },

  defaultVariants: {
    size: "paragraph",
  },
});
