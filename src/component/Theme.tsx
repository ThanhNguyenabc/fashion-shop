import { DefaultTheme } from "@react-navigation/native";
import { createText, createTheme } from "@shopify/restyle";

const palette = {
  primary: "#0ECD9D",
  light: "",
  dark: "",
  blacklight: "rgba(12,13,52,0.05)",
};

const theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: palette.primary,
    blacklight: palette.blacklight,
    greyF4: "#F4F0EF",
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadius: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
};

export default theme;
