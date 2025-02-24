import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-vtrt4gocfr8yr70q.us.auth0.com"
      clientId="Q2XWfWjSEkawWDnW8n6dOVgpxOMhg4d5"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
