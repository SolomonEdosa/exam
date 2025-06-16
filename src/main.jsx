import React from "react";
import ReactDOM from "react-dom/client";
// import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App";
import { BrowserRouter } from  "react-router-dom";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>
);
