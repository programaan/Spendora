import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { HelmetProvider } from "react-helmet-async";

import "./index.css";
import App from "./App.jsx";

import ThemeProvider from "./components/theme/ThemeProvider";

import { UserProvider } from "./context/UserContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <UserProvider>
          <BrowserRouter>         
            <App />
            <Toaster position="top-right" richColors closeButton />
          </BrowserRouter>
        </UserProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);