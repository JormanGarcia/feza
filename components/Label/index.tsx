import { styled } from "~/stitches.config";
import * as LabelPrimitive from "@radix-ui/react-label";

export default styled(LabelPrimitive.Label, {
  variants: {
    required: {
      true: {
        "&::after": {
          content: "'*'",
        },
      },
      false: {},
    },
  },
});
