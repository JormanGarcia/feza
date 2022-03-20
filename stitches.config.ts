import { createStitches } from "@stitches/react";

export const { getCssText, css, styled, theme, globalCss } = createStitches({
  theme: {
    colors: {
      // Main
      main700: "#36385C",
      main600: "#333670",
      main500: "#3434C2",
      main400: "#B3B3E3",
      main300: "#D3D3F5",
      main200: "#E1E1FA",
      main100: "#F5F5FA",

      // Red
      red700: "#5C3636",
      red600: "#B26969",
      red500: "#C23434",
      red400: "#E3B3B3",
      red300: "#F5D3D3",
      red200: "#FBEBEB",
      red100: "#FAF2F2",

      // Green
      green700: "#395C36",
      green600: "#34C27B",
      green500: "#6FB269",
      green400: "#B3E3CB",
      green300: "#D3F5E4",
      green200: "#DAEEE4",
      green100: "#F2FAF6",

      // Black
      blackAlpha100: "rgba(0,0,0,0.1)",
      blackAlpha200: "rgba(0,0,0,0.2)",
      blackAlpha300: "rgba(0,0,0,0.3)",

      background: "white",
    },

    sizes: {
      full: "100%",
    },
  },

  media: {
    sm: "(min-width: 480px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
  },

  utils: {
    // Margin
    m: (v: number | string) => ({ margin: v }),
    mt: (v: number | string) => ({ marginTop: v }),
    mb: (v: number | string) => ({ marginBottom: v }),
    ml: (v: number | string) => ({ marginLeft: v }),
    mr: (v: number | string) => ({ marginRight: v }),
    my: (v: number | string) => ({ marginTop: v, marginBottom: v }),
    mx: (v: number | string) => ({ marginLeft: v, marginRight: v }),

    // Padding
    p: (v: number | string) => ({ padding: v }),
    pt: (v: number | string) => ({ paddingTop: v }),
    pb: (v: number | string) => ({ paddingBottom: v }),
    pl: (v: number | string) => ({ paddingLeft: v }),
    pr: (v: number | string) => ({ paddingRight: v }),
    py: (v: number | string) => ({ paddingTop: v, paddingBottom: v }),
    px: (v: number | string) => ({ paddingLeft: v, paddingRight: v }),

    // Size
    size: (v: number | string) => ({ width: v, height: v }),
  },
});
