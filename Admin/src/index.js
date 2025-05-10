import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import "./index.css";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
    <ToastContainer
        autoClose={1000} // Duration in milliseconds
        draggable={true} // Allow drag to dismiss
        position="top-right" // Position of the toast
        pauseOnHover={true} // Pause on hover
        hideProgressBar={false} // Show progress bar
        closeOnClick={true} // Close on click
        pauseOnFocusLoss={true} // Pause when focus is lost
      />
  </ThemeProvider>,
  document.getElementById("root")
);
