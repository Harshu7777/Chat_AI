// App.js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Auth0Provider } from "@auth0/auth0-react";

// Import your components/pages
import Home from "./pages/Home";
import Paragraph from "./pages/Paragraph";
import Summary from "./pages/Summary";
import PricingCards from "./pages/Card";

const stripePromise = loadStripe("pk_test_51QQ4RNHU864JrHStp0fhIgq0SI6isIkHe8wLmh5ObV6Z957z12zU5v4ppMLaZ4KzIZdGAI84htnIlHdKDuPAIARl00LDYI5BRI");

function App() {
  return (
    <>
      <Auth0Provider
        domain="dev-vtrt4gocfr8yr70q.us.auth0.com"
        clientId="Q2XWfWjSEkawWDnW8n6dOVgpxOMhg4d5"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/generate" element={<Paragraph />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/features"
              element={
                <Elements stripe={stripePromise}>
                  <PricingCards />
                </Elements>
              }
            />
          </Routes>
        </BrowserRouter>
      </Auth0Provider>
    </>
  );
}

export default App;