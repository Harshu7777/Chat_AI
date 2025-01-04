// Card.js
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Navbar from '../components/Navbar';
import { makePayment } from '../services/apiService';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51QQ4RNHU864JrHStp0fhIgq0SI6isIkHe8wLmh5ObV6Z957z12zU5v4ppMLaZ4KzIZdGAI84htnIlHdKDuPAIARl00LDYI5BRI'
);

const PricingCard = ({ title, price, features, buttonText, highlighted = false, onPurchase }) => (
  <Card
    className={`flex flex-col justify-between h-full ${
      highlighted ? 'border-2 border-blue-500 shadow-lg' : 'border border-gray-200'
    }`}
  >
    <CardContent className="flex-grow">
      <Typography
        variant="h5"
        component="h2"
        className={`font-bold mb-2 ${highlighted ? 'text-blue-500' : 'text-gray-900'}`}
      >
        {title}
      </Typography>
      <Typography variant="h4" component="p" className="font-extrabold mb-4">
        {price === 0 ? 'Free' : `$${price}`}
        {price !== 0 && <span className="text-xl font-normal">/month</span>}
      </Typography>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            {feature.included ? (
              <CheckIcon className="text-green-500 mr-2" fontSize="small" />
            ) : (
              <CloseIcon className="text-red-500 mr-2" fontSize="small" />
            )}
            <Typography variant="body2" className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
              {feature.text}
            </Typography>
          </li>
        ))}
      </ul>
    </CardContent>
    <CardContent>
      <Button
        variant="contained"
        fullWidth
        className={`py-2 ${highlighted ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-800 hover:bg-gray-900'}`}
        onClick={onPurchase}
      >
        {buttonText}
      </Button>
    </CardContent>
  </Card>
);

const PricingCards = () => {
  const handlePurchase = async (priceId) => {
    try {
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error('Stripe initialization failed');
      }

      const response = await makePayment({ priceId });

      const session = response.data;

      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error('Stripe Checkout Error:', result.error.message);
      }
    } catch (err) {
      console.error('Error during purchase:', err);
    }
  };

  const plans = [
    {
      title: "Free",
      price: 0,
      features: [
        { text: "Access to GPT-3.5", included: true },
        { text: "Standard response speed", included: true },
        { text: "Regular model updates", included: true },
        { text: "Access to GPT-4", included: false },
        { text: "Faster response speed", included: false },
        { text: "Priority access to new features", included: false },
      ],
      buttonText: "Get Started",
      onPurchase: () => alert('Free plan selected!'),
    },
    {
      title: "ChatGPT Plus",
      price: 20,
      features: [
        { text: "Access to GPT-3.5", included: true },
        { text: "Access to GPT-4", included: true },
        { text: "Faster response speed", included: true },
        { text: "Priority access to new features", included: true },
        { text: "Available even when demand is high", included: true },
        { text: "Early access to new features", included: true },
      ],
      buttonText: "Upgrade to Plus",
      highlighted: true,
      onPurchase: () => handlePurchase('price_12345'),
    },
    {
      title: "Team",
      price: 30,
      features: [
        { text: "All Plus features", included: true },
        { text: "Shared team workspace", included: true },
        { text: "Advanced admin controls", included: true },
        { text: "Usage insights and analytics", included: true },
        { text: "Custom model fine-tuning", included: true },
        { text: "Dedicated support", included: true },
      ],
      buttonText: "Contact Sales",
      onPurchase: () => handlePurchase('price_67890'),
    },
  ];

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-4/5 grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PricingCards;
