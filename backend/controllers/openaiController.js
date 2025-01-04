const { CohereClient } = require('cohere-ai');
require('dotenv').config();

// Initialize Cohere client with the API key
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

// Summary Controller
exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Text is required to generate a summary.",
      });
    }

    // Call the generate method for summarization
    const response = await cohere.generate({
      model: 'command',
      prompt: `Summarize this for a second grader:\n${text}`,
      max_tokens: 300,
    });

    if (response && response.generations && response.generations[0]) {
      return res.status(200).json({
        success: true,
        summary: response.generations[0].text.trim(),
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "No response from Cohere.",
      });
    }
  } catch (error) {
    console.error("Error in summaryController:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while generating the summary.",
      error: error.message,
    });
  }
};

// Paragraph Controller
exports.paragraphController = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Text is required to generate a paragraph.",
      });
    }

    // Call the generate method for paragraph generation
    const response = await cohere.generate({
      model: 'command', // Using 'command' as it's a more recent model
      prompt: `Write a detailed paragraph about:\n${text}`,
      max_tokens: 200,
    });

    if (response && response.generations && response.generations[0]) {
      return res.status(200).json({
        success: true,
        paragraph: response.generations[0].text.trim(),
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Failed to generate a paragraph.",
      });
    }
  } catch (error) {
    console.error("Error in paragraphController:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while generating the paragraph.",
      error: error.message,
    });
  }
};

