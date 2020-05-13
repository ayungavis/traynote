import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#5843BD",
      light: "#8A7BD1",
      dark: "#3E2F84",
    },
    secondary: {
      main: "#FCE762",
      light: "#FDEE91",
      dark: "#B0A245",
    },
  },
});

export default theme = responsiveFontSizes(theme);
