import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    primary: {
      fontFamily: "'Lato', sans-serif",
    },
  },
  palette: {
    primary: {
      main: "#0F172A",
    },
    secondary: {
      main: "#FED533",
    },
    background: {
      default: "#fcfcfc",
      dark: "#f6f6f6",
    },
    text: {
      primary: "#fff",
      dark: "#001231",
      light: "#868686",
    },
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        borderRadius: "2px",
      },
    },
  },
});

export default theme;
