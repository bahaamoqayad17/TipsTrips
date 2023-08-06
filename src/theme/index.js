const { createTheme } = require("@mui/material");

const theme = createTheme({
  direction: "ltr",
  palette: {
    black: {
      main: "#2C2C2C",
    },
    primary: {
      main: "#44A44C",
      200: "#ADEDB1",
    },
    secondary: {
      main: "#757575",
      contrastText: "#ffffff",
    },
    gray: {
      main: "#F6F6F6",
      contrastText: "#6D6D6D",
    },
  },
  shape: {
    borderRadius: 8,
  },
  MuiCssBaseline: {
    styleOverrides: {
      "*": {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
      },
      html: {
        MozOsxFontSmoothing: "grayscale",
        WebkitFontSmoothing: "antialiased",
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        width: "100%",
      },
      body: {
        display: "flex",
        flex: "1 1 auto",
        flexDirection: "column",
        minHeight: "100%",
        width: "100%",
      },
      "#__next": {
        display: "flex",
        flex: "1 1 auto",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        fontFamily: "Source Sans 3, sans-serif",
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      notchedOutline: {
        borderColor: "#E6E8F0",
      },
    },
  },
  typography: {
    button: {
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.57,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.57,
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 600,
      letterSpacing: "0.5px",
      lineHeight: 2.5,
      textTransform: "uppercase",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.66,
    },
    h1: {
      fontWeight: 700,
      fontSize: "3.5rem",
      lineHeight: 1.375,
    },
    h2: {
      fontWeight: 700,
      fontSize: "3rem",
      lineHeight: 1.375,
    },
    h3: {
      fontWeight: 700,
      fontSize: "2.25rem",
      lineHeight: 1.375,
    },
    h4: {
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: 1.375,
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.375,
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: 1.375,
    },
  },
});

export default theme;
