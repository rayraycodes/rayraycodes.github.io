  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import "./styles/globals.css"; // Import custom global styles including mobile padding fix
  import "./utils/navHeight"; // Initialize nav height immediately

  createRoot(document.getElementById("root")!).render(<App />);
  