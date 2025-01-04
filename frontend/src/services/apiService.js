import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const API_BASE_URL = 'http://localhost:3000/api/v1'; 
const stripePromise = loadStripe("pk_test_51QQ4RNHU864JrHStp0fhIgq0SI6isIkHe8wLmh5ObV6Z957z12zU5v4ppMLaZ4KzIZdGAI84htnIlHdKDuPAIARl00LDYI5BRI");

// Function to generate summary
export const generateSummary = async (text) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/summary`, { text });
    if (response.data.success) {
      return response.data.summary;
    } else {
      throw new Error('Error generating summary');
    }
  } catch (error) {
    console.error('Error in generateSummary:', error);
    throw error;
  }
};

// Function to generate paragraph
export const generateParagraph = async (text) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate`, { text });
    if (response.data.success) {
      return response.data.paragraph;
    } else {
      throw new Error('Error generating paragraph');
    }
  } catch (error) {
    console.error('Error in generateParagraph:', error);
    throw error;
  }
};

// Function to make payment
export const makePayment = async (product) => {
  try {
    const stripe = await stripePromise;

    if (!stripe) {
      throw new Error('Stripe initialization failed');
    }

    const response = await axios.post(`${API_BASE_URL}/payment`, { product });

    if (response.status === 200 && response.data.id) {
      const result = await stripe.redirectToCheckout({ sessionId: response.data.id });

      if (result.error) {
        console.error('Stripe Checkout Error:', result.error.message);
      }
    } else {
      throw new Error('Failed to create payment session');
    }
  } catch (err) {
    console.error('Error during payment:', err.message || err);
    throw err;
  }
};
