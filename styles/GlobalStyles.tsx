import React from "react";
import { globalCss } from "../stitches.config";

const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    fontFamily: "Inter",
    color: "$font",
    boxSizing: "border-box",
  },
});

const GlobalStyles: React.FC = ({ children }) => {
  globalStyles();
  return <>{children}</>;
};

export default GlobalStyles;
