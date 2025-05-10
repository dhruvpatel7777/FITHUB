import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Main color for your theme
    },
    secondary: {
      main: "#dc004e", // Secondary color for your theme
    },
    background: {
      default: "#f5f5f5", // Default background color
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h1: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 700, // Bold
    },
    h2: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600, // Semi-Bold
    },
    h3: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 500, // Medium
    },
    h4: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 500, // Medium
    },
    h5: { 
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 400, // Regular
    },
    h6: {
      fontFamily: 'Poppins, sans-serif',
    },
    subtitle1: {
      fontFamily: 'Poppins, sans-serif',
    },
    subtitle2: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 300, // Light
    },
    body: {
      fontFamily: 'Poppins, sans-serif',
    },
    body2: {
      fontFamily: 'Poppins, sans-serif',
    },
    button: {
      fontFamily: 'Poppins, sans-serif',
    },
    caption: {
      fontFamily: 'Poppins, sans-serif',
    },
    overline: {
      fontFamily: 'Poppins, sans-serif',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
