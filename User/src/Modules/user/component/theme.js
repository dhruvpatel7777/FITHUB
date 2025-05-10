import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF5722", // deepOrange
    },
    secondary: {
      main: "#ffffff", // white
    },
    text: {
      primary: "#000000", // black
      secondary: "#333333", // slightly darker grey for better contrast
    },
    background: {
      default: "#ffffff", // white
      paper: "#f5f5f5", // light grey for sections
    },
  },
  typography: {
    h2: {
      color: "#000000", // black
      fontWeight: 700,
      fontSize: "2.5rem", // Larger size
    },
    h3: {
      color: "#FF5722", // deepOrange
      fontWeight: 700,
      fontSize: "2rem", // Larger size
    },
    h5: {
      color: "#000000", // black
      fontWeight: 500, // Slightly increased weight
    },
    body2: {
      color: "#333333", // Darker text color
      fontSize: "1rem", // Larger text
    },
  },
});

export default theme;
