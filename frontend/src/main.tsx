import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import AnimateScroll from "./animations/animateScroll.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AnimateScroll />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
